<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Responses\AuthResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Validator;
use Hash;

class RegisterController extends Controller
{
    /**
     * store user
     * @param UserStoreRequest $request
     * @return App\Http\Responses\AuthResponse
     */
    public function register(UserStoreRequest $request)
    {
        $credentials = $request->validated();
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        $token = $user->createToken('Trellie')->accessToken;
        return AuthResponse::success($user, $token, "Registration Successful");
    }
}
