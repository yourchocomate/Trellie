<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class ProjectStoreRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'workspace_id' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Project name is required',
            'description.required' => 'Project description is required',
            'workspace_id.required' => 'Project workspace is required',
        ];
    }
}
