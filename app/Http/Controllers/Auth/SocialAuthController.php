<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the provider authentication page.
     */
    public function redirect(string $provider): RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from the provider.
     */
    public function callback(string $provider): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Unable to login using ' . $provider . '. Please try again.');
        }

        $avatarUrl = $socialUser->getAvatar();
        $avatarPath = 'avatars/' . $socialUser->getId() . '.jpg';

        if (!\Illuminate\Support\Facades\Storage::disk('public')->exists($avatarPath)) {
            $contents = file_get_contents($avatarUrl);
            \Illuminate\Support\Facades\Storage::disk('public')->put($avatarPath, $contents);
        }

        $user = User::updateOrCreate([
            'email' => $socialUser->getEmail(),
        ], [
            'name' => $socialUser->getName(),
            'google_id' => $socialUser->getId(),
            'avatar' => \Illuminate\Support\Facades\Storage::url($avatarPath),
            'password' => $user->password ?? null, // Keep existing password if any
            'email_verified_at' => now(), // Auto-verify email from Google
        ]);

        Auth::login($user);

        return redirect()->intended(route('gifts.index', absolute: false));
    }
}
