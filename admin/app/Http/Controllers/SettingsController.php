<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SettingsController extends Controller
{
    public function edit(): View
    {
        $settings = Setting::query()->pluck('value', 'key');

        return view('settings.edit', compact('settings'));
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'store_name' => ['required', 'string', 'max:120'],
            'whatsapp_number' => ['required', 'string', 'max:30'],
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'contact_email' => ['nullable', 'email', 'max:160'],
            'store_address' => ['nullable', 'string', 'max:240'],
            'delivery_note' => ['nullable', 'string', 'max:240'],
            'announcement' => ['nullable', 'string', 'max:240'],
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value, 'type' => 'text']);
        }

        return back()->with('success', 'Store settings saved.');
    }
}
