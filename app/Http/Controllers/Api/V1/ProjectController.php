<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Project\ProjectStoreRequest;
use App\Http\Requests\Project\ProjectAddTeamRequest;
use App\Http\Responses\JsonResponse;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\UserCollection;
use App\Models\Project;
use App\Models\User;

class ProjectController extends Controller
{
    /**
     * Create a new controller instance.
     * @return void
     */

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of projects by filter.
     * @param Request $request
     * @return App\Http\Resources\ProjectCollection
     */

    public function index(Request $request)
    {

        $projects = array();

        // Chceck if filter by date
        if($request->from_date && $request->to_date && !$request->search) {
            $projects[] = Project::whereBetween('created_at', [$request->from_date, $request->to_date])
                        ->with('user', function($user) {
                            return $user->select('id','email');
                        })
                        ->paginate(10,['*'],'page',$request->page);
        }

        // Check if filter by search
        else if($request->search) {
            $projects[] = Project::whereHas('user', function($query) use ($request) {
                                        $query->where('email', '=', $request->search)
                                            ->orWhere('name', 'like', '%'.$request->search.'%');
                                    })
                                    ->with('user', function($query) {
                                        return $query->select('id','email');
                                    })->paginate(10,['*'],'page',$request->page);
        } else {
            $projects[] = Project::whereJsonContains('peoples', auth()->id())->with('user', function($user) {
                                        return $user->select('id','email');
                                    })->paginate(10,['*'],'page',$request->page);
        }

        return new ProjectCollection($projects[0]);
    }

    /**
     * Get all teams by project id.
     * @param $id
     * @return App\Http\Resources\UserCollection
     */
    public function team($id)
    {
        $project = Project::find($id);

        if(!$project) return JsonResponse::error("Project not found");

        $users = User::whereIn('id', json_decode($project->peoples))->get();
        $suggestion = User::inRandomOrder()->whereNotIn('id', json_decode($project->peoples))->take(5)->get();

        return new UserCollection(['team' => $users, 'suggestion' => $suggestion]);
    }

    /**
     * Add team to project.
     * @param ProjectAddTeamRequest $request
     * @return App\Http\Responses\JsonResponse
     */
    public function addTeam(ProjectAddTeamRequest $request)
    {
        $validated = $request->validated();

        $project = Project::find($validated['project_id']);
        $user = User::where('email', $validated['email'])->first();

        if(in_array($user->id,json_decode($project->peoples))) return JsonResponse::error("You are already in this project");

        $project->peoples = json_encode(array_merge(json_decode($project->peoples), [$user->id]));
        $project->save();

        return JsonResponse::success($project, "Project team updated successfully");
    }

    /**
     * Create new project
     * @param ProjectStoreRequest $request
     * @return App\Http\Responses\JsonResponse
     */
    public function create(ProjectStoreRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $validated['peoples'] = json_encode([auth()->id()]);

        $project = Project::create($validated);

        return JsonResponse::success($project, "Project created successfully");
    }

    /**
     * Update a project
     * @param ProjectUpdateRequest $request
     * @return App\Http\Responses\JsonResponse
     */
    public function update(ProjectUpdateRequest $request)
    {
        $validated = $request->validated();

        $project = Project::find($request->id)->update($request->except('id'));

        return JsonResponse::success($project, "Project updated successfully");
    }

    /**
     * Delete project
     * @param Request $request
     * @return App\Http\Responses\JsonResponse
     */
    public function destroy(Request $request)
    {
        $project = Project::find($request->id)->delete();

        if($project) return JsonResponse::success([], "Project deleted successfully");

        return JsonResponse::error("Project not found");
    }
}
