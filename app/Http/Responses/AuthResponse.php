<?php 

namespace App\Http\Responses;

class AuthResponse {
    public static function success($data, $token, $message = null) {
        return response()->json([
            'success' => true,
            'message' => $message,
            'user' => $data,
            "token" => $token,
            "token_type" => "bearer",
        ], 200);
    }
    
    public static function error($message) {
        return response()->json([
            'success' => false,
            'message' => $message
        ], 422);
    }

    public static function unauthorized($message) {
        return response()->json([
            'success' => false,
            'message' => $message
        ], 401);
    }

    public static function authorized($data) {
        return response()->json([
            'success' => true,
            'user' => $data
        ], 200);
    }
}