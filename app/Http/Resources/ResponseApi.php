<?php

namespace App\Http\Resources;

class ResponseApi
{
    public static function success($data = null, string $message = 'Success', int $code = 200)
    {
        return response()->json([
            'status' => true,
            'code' => $code,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public static function error($message = 'Error', int $code = 400, $errors = null)
    {
        return response()->json([
            'status' => false,
            'code' => $code,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }
}