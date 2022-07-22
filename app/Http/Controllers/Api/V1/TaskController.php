<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Task\TaskStoreRequest;
use App\Http\Responses\JsonResponse;
use App\Http\Resources\TaskCollection;
use App\Models\Task;

class TaskController extends Controller
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
     * Display a listing of the resource.
     *
     * @return \App\Http\Responses\JsonResponse
     */
    public function index(Request $request)
    {
        $tasks = Task::whereHas('project', function($query) {
                            $query->whereJsonContains('peoples', auth()->id());
                        })
                        ->with('project' , function($query) {
                            return $query->select('id','name');
                        })
                        ->with('user' , function($query) {
                            return $query->select('id','name');
                        })
                        ->where('status', $request->type)
                        ->get();
        return new TaskCollection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\TaskStoreRequest $request
     * @return \App\Http\Responses\JsonResponse
     */
    public function create(TaskStoreRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        $task = Task::create($validated);

        return JsonResponse::success($task, "Task created successfully");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Responses\JsonResponse
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @return \App\Http\Responses\JsonResponse
     */
    public function destroy(Request $request)
    {
        //
    }
}
