<?php

namespace App\Http\Middleware;

use App\Models\CustomerToken;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateCustomer
{
    public function handle(Request $request, Closure $next, string $mode = 'required'): Response
    {
        $plainToken = $request->bearerToken();
        if (! $plainToken && $mode === 'optional') {
            return $next($request);
        }
        $token = $plainToken
            ? CustomerToken::with('user')->where('token_hash', hash('sha256', $plainToken))->first()
            : null;

        if (! $token || ! $token->user || $token->user->is_admin || ($token->expires_at && $token->expires_at->isPast())) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $token->forceFill(['last_used_at' => now()])->save();
        Auth::setUser($token->user);
        $request->attributes->set('customer_token', $token);

        return $next($request);
    }
}
