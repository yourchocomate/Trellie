<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Responses\JsonResponse;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Http;

class HomeController extends Controller
{
    public function index() 
    {
        try{
            $response = Http::connectTimeout(2)->get('https://reqres.in/api/users');
            return response()->json($response->json());
        } catch (ConnectionException $e) {
            return response()->json($e->getMessage());
        } catch (RequestException $e) {
            return response()->json($e->getMessage());
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
}
