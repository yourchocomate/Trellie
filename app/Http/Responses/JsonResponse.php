<?php

namespace App\Http\Responses;

class JsonResponse {
    public static function success($data, $message = null)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ],200);
    }

    public static function error($message)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
        ],422);
    }

}