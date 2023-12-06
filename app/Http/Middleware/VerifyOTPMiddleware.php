<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Crypt;

class VerifyOTPMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->payload;
        if (empty($token)) {
            return response()->json(['message' => "OTP Token Missing"], 401);
        }
        $user_data = Crypt::decrypt($token);
        if ($request->otp !== $user_data['otp']) {
            return response()->json(['message' => "Invalid OTP"], 401);
        }
        if ($user_data['otp_expired_at'] < time()) {
            return response()->json(['message' => "OTP Expired"], 401);
        }
        return $next($request);
    }
}
