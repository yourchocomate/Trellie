<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('unauthenticated', function () {
    return "Unauthenticated";
})->name('unauthenticated');


Route::get('/people', 'HomeController@index')->middleware('cacheResponse:300');

/**
 * Authentication routes
 */
Route::prefix('auth')->group(function () {
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LoginController@logout');
    Route::get('verify', 'Auth\LoginController@verify')->middleware('auth:api');
});


/**
 * Workspace routes
 */
Route::prefix('workspace')->group(function () {
    Route::get('/', 'WorkspaceController@index');
    Route::get('/{id}', 'WorkspaceController@projects');
    Route::post('create', 'WorkspaceController@create');
    Route::post('update', 'WorkspaceController@update');
    Route::post('delete', 'WorkspaceController@destroy');
});

/**
 * Project routes
 */
Route::prefix('project')->group(function () {
    Route::post('/all', 'ProjectController@index');
    Route::get('team-suggestion/{id}', 'ProjectController@team');
    Route::post('team', 'ProjectController@addTeam');
    Route::post('create', 'ProjectController@create');
    Route::post('update', 'ProjectController@update');
    Route::post('delete', 'ProjectController@destroy');
});

/**
 * Task routes
 */
Route::prefix('task')->group(function () {
    Route::post('/all', 'TaskController@index');
    Route::post('create', 'TaskController@create');
    Route::post('update', 'TaskController@update');
    Route::post('delete', 'TaskController@destroy');
});

// Route::get('/user', 'UserController@index');
