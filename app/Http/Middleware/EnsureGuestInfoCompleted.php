<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureGuestInfoCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (
            $request->user() &&
            !$request->user()->userRelationship &&
            !$request->routeIs('guest.info.*') &&
            !$request->routeIs('logout')
        ) {
            return redirect()->route('guest.info.create');
        }

        return $next($request);
    }
}
