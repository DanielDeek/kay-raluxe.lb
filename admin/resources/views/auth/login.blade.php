<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Admin sign in · Luxe Avenue</title><link rel="stylesheet" href="{{ asset('css/admin.css') }}"></head>
<body class="auth-page">
    <main class="auth-card">
        <div class="auth-brand"><span class="brand-mark">LA</span><div><strong>LUXE AVENUE</strong><small>Admin studio</small></div></div>
        <div class="auth-heading"><span class="eyebrow">Private workspace</span><h1>Welcome back.</h1><p>Sign in to manage the Luxe Avenue storefront.</p></div>
        @if ($errors->any()) <div class="flash flash-error" role="alert">{{ $errors->first() }}</div> @endif
        <form method="POST" action="{{ route('login.store') }}" class="stack-form">
            @csrf
            <label>Email address<input type="email" name="email" value="{{ old('email') }}" autocomplete="email" required autofocus></label>
            <label>Password<input type="password" name="password" autocomplete="current-password" required></label>
            <label class="checkbox-label"><input type="checkbox" name="remember" value="1"> Keep me signed in</label>
            <button class="button button-dark button-wide" type="submit">Sign in <span>↗</span></button>
        </form>
        <p class="auth-note">Admin access only. Customer orders remain WhatsApp-first.</p>
    </main>
</body>
</html>
