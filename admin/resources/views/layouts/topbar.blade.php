<header class="admin-topbar">
    <button type="button" class="mobile-menu-button" data-sidebar-toggle aria-label="Toggle navigation">☰</button>
    <div><span class="topbar-kicker">{{ now()->format('l, d F Y') }}</span><h1>{{ $heading ?? 'Overview' }}</h1></div>
    <div class="topbar-actions"><a href="{{ config('app.frontend_url', 'http://localhost:3000') }}" target="_blank" rel="noopener" class="topbar-storefront">Open storefront ↗</a><div class="admin-avatar">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</div></div>
</header>
