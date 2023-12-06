<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\URL;

class CacheDataApi
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
        // return $next($request);
        $components = [str_replace(URL::to('/').'/api/',"",$request->fullUrl())];
        $cacheName = implode("-",$components);
        // return response($cacheName);
        $cachedHtml = Cache::remember($cacheName, null, function () use ($next,$request) {
            $response = $next($request);
            return $response->getContent();
        });
        return response($cachedHtml)->header('Content-Type','application/json');
    }
}
