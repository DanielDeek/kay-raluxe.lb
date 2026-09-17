<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = DB::transaction(function () use ($data): User {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'is_admin' => false,
            ]);

            $customer = ! empty($data['phone'])
                ? Customer::where('phone', $data['phone'])->whereNull('user_id')->first()
                : null;
            $customer ??= new Customer;
            $customer->fill([
                'user_id' => $user->id, 'name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone'] ?? null,
            ])->save();

            return $user;
        });

        return response()->json($this->authenticatedPayload($user), 201);
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);
        $user = User::with('customer')->where('email', $data['email'])->first();

        if (! $user || $user->is_admin || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'The email or password is incorrect.'], 422);
        }

        return response()->json($this->authenticatedPayload($user));
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $this->userPayload($request->user())]);
    }

    public function orders(Request $request): JsonResponse
    {
        $customer = $request->user()->customer;

        return response()->json(['data' => $customer?->orders()->latest()->get() ?? collect()]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        DB::transaction(function () use ($data, $user): void {
            $user->update(['name' => $data['name'], 'email' => $data['email']]);
            $user->customer()->updateOrCreate([], [
                'name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone'] ?? null,
            ]);
        });

        return response()->json(['user' => $this->userPayload($user->fresh('customer'))]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (! Hash::check($data['current_password'], $request->user()->password)) {
            return response()->json(['message' => 'Your current password is incorrect.'], 422);
        }

        $request->user()->update(['password' => $data['password']]);
        CustomerToken::where('user_id', $request->user()->id)
            ->whereKeyNot($request->attributes->get('customer_token')->id)
            ->delete();

        return response()->json(['message' => 'Your password has been updated.']);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->attributes->get('customer_token')?->delete();

        return response()->json(['message' => 'You have been signed out.']);
    }

    private function authenticatedPayload(User $user): array
    {
        $plainToken = Str::random(80);
        CustomerToken::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $plainToken),
            'last_used_at' => now(),
        ]);

        return ['token' => $plainToken, 'user' => $this->userPayload($user->loadMissing('customer'))];
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->customer?->phone,
        ];
    }
}
