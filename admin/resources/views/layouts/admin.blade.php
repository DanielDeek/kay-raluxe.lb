<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'Admin' }} · Luxe Avenue</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    <link rel="stylesheet" href="{{ asset('css/sidebar-fix.css') }}">
    <link rel="stylesheet" href="{{ asset('css/content.css') }}">
</head>
<body>
    <div class="admin-shell">
        @include('layouts.sidebar')
        <main class="admin-main">
            @include('layouts.topbar')
            <div class="admin-content">
                @if (session('success'))
                    <div class="flash flash-success" role="status">{{ session('success') }} <button type="button" data-dismiss>×</button></div>
                @endif
                @if ($errors->any())
                    <div class="flash flash-error" role="alert"><strong>Please check the form.</strong><ul>@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>
                @endif
                @yield('content')
            </div>
        </main>
    </div>
    <script src="{{ asset('js/admin.js') }}" defer></script>
</body>
</html>
