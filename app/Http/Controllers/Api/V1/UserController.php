<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    protected $user;
    
    /**
     * Create a new controller instance.
     * @return void
     */
    public function __construct(User $user)
    {
        $this->middleware('auth:api');
        $this->user = $user;
    }

    public function index()
    {
        return auth()->user();
    }
}
