<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class TaskStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'instruction' => 'required|string',
            'project_id' => 'required|integer'
        ];
    }

    public function messages()
    {
        return 
        [
            'name.required' => 'Task title is required',
            'description.required' => 'Task description is required',
            'instruction.required' => 'Task insctruction is required',
            'project_id.required' => 'Please try to create the task for a project nor it will go to blackhole :)'
        ];
    }
}
