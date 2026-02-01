<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class GuestInfoController extends Controller
{
    /**
     * Show the form for completing the guest profile.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/CompleteProfile', [
            'googleName' => request()->user()->name,
        ]);
    }

    /**
     * Store the guest's profile information.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'real_name' => 'required|string|max:255',
            'relationship' => 'required|string|max:255',
        ]);

        $request->user()->userRelationship()->create([
            'real_name' => $request->real_name,
            'relationship' => $request->relationship,
        ]);

        return redirect()->intended(route('gifts.index', absolute: false));
    }
}
