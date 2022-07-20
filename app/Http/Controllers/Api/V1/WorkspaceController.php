<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\WorkSpace;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\Workspace\WorkSpaceStoreRequest;
use App\Http\Requests\Workspace\WorkSpaceUpdateRequest;
use App\Http\Responses\JsonResponse;
use App\Http\Resources\WorkspaceCollection;

class WorkspaceController extends Controller
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
     * Display a listing of workspaces.
     * @return App\Http\Resources\WorkspaceCollection
     */

    public function index()
    {
        $workspaces = WorkSpace::where('user_id', auth()->id())->get();
        return new WorkspaceCollection($workspaces);
    }

    /**
     * Get all projects by workspace.
     * @param $id
     * @return App\Http\Resources\WorkspaceCollection
     */
    public function projects($id)
    {
        $projects = Project::where('workspace_id', $id)->withCount('task')->get();
        
        if(!$projects) return JsonResponse::error("Projects not found");

        return new WorkSpaceCollection($projects ?? []);
    }

    /**
     * Create new workspace
     * @param WorkSpaceStoreRequest $request
     * @return App\Http\Responses\JsonResponse
     */
    public function create(WorkSpaceStoreRequest $request) 
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $workspace = WorkSpace::create($validated);

        return JsonResponse::success($workspace, "Workspace created successfully");
    }

    /**
     * Update workspace
     * @param WorkSpaceUpdateRequest $request
     * @return App\Http\Responses\JsonResponse
     */
    public function update(WorkSpaceUpdateRequest $request) 
    {
        $validated = $request->validated();

        $workspace = WorkSpace::find($request->id)->update($request->except('id'));

        return JsonResponse::success($workspace, "Workspace updated successfully");
    }

    /**
     * Delete workspace
     * @param Request $request
     * @return App\Http\Responses\JsonResponse
     */
    public function destroy(Request $request) 
    {
        $workspace = WorkSpace::find($request->id)->delete();

        if($workspace) return JsonResponse::success([], "Workspace deleted successfully");

        return JsonResponse::error("Workspace not found");
    }
}
