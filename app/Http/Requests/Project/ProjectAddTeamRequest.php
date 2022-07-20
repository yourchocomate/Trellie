<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class ProjectAddTeamRequest extends FormRequest
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
            'project_id' => 'required|integer|exists:projects,id',
            'email' => 'required|string|email|max:255|exists:users,email',
        ];
    }

    public function messages()
    {
        return [
            'project_id.required' => 'Project id is required',
            'email.required' => 'Email is required',
            'email.exists' => 'User with this email does not exist',
        ];
    }
}
