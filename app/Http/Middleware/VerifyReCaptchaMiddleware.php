<?php

namespace App\Http\Middleware;

use App\Helpers\RecaptchaHelper;
use Closure;

class VerifyReCaptchaMiddleware
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
        if (!config('services.recaptcha.secret',false)) {
            return $next($request);
        }
        $token = $request->reCaptchToken;
        if (empty($token)) {
            return response()->json(['message' => "reCaptcha Token Not Found"], 401);
        }
        $recaptchaResponse = RecaptchaHelper::verifyRecaptcha($token);
        if (empty($recaptchaResponse->success) || !$recaptchaResponse->success) {
            return response()->json(['message' => "reCaptcha Token Is Not Valid"], 401);
        }
        return $next($request);
    }
}
