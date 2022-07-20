<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Responses\AuthResponse;

class LoginController extends Controller
{
    /**
     * login user
     * @param UserLoginRequest $request
     * @return App\Http\Responses\AuthResponse
     */
    public function login(UserLoginRequest $request)
    {
        $credentials = $request->validated();
        
        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('Trellie')->accessToken;
            return AuthResponse::success(auth()->user(), $token, "Login Successful");
        }
        
        return AuthResponse::error('Invalid credentials');
    }

    /**
     * logout user
     * @return App\Http\Responses\AuthResponse
     */
    public function logout()
    {
        auth()->logout();
        return AuthResponse::success(null, null, "Logout Successful");
    }

    /**
     * verify token
     * @return App\Http\Responses\AuthResponse
     */
    public function verify()
    {
        if(auth()->user()) return AuthResponse::authorized(auth()->user());
        
        return AuthResponse::unauthorized("Unauthorized");
    }
}
