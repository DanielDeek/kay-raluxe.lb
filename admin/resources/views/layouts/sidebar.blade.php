<aside class="admin-sidebar" data-sidebar>
    <div class="brand-lockup"><span class="brand-mark">LA</span><div><strong>LUXE AVENUE</strong><small>Admin studio</small></div></div>
    <nav class="sidebar-nav" aria-label="Admin navigation">
        <p class="nav-label">Workspace</p>
        <a href="{{ route('admin.dashboard') }}" class="nav-link {{ request()->routeIs('admin.dashboard') ? 'is-active' : '' }}"><span class="nav-icon">⌂</span>Overview</a>
        <a href="{{ route('admin.products.index') }}" class="nav-link {{ request()->routeIs('admin.products.*') ? 'is-active' : '' }}"><span class="nav-icon">□</span>Products</a>
        <a href="{{ route('admin.collections.index') }}" class="nav-link {{ request()->routeIs('admin.collections.*') ? 'is-active' : '' }}"><span class="nav-icon">◫</span>Collections</a>
        <a href="{{ route('admin.orders.index') }}" class="nav-link {{ request()->routeIs('admin.orders.*') ? 'is-active' : '' }}"><span class="nav-icon">↗</span>Orders</a>
        <a href="{{ route('admin.customers.index') }}" class="nav-link {{ request()->routeIs('admin.customers.*') ? 'is-active' : '' }}"><span class="nav-icon">◎</span>Customers</a>
        <p class="nav-label nav-label-spaced">Configuration</p>
        <a href="{{ route('admin.settings.edit') }}" class="nav-link {{ request()->routeIs('admin.settings.*') ? 'is-active' : '' }}"><span class="nav-icon">⚙</span>Store settings</a>
        <a href="{{ route('admin.content.edit') }}" class="nav-link {{ request()->routeIs('admin.content.*') ? 'is-active' : '' }}"><span class="nav-icon">*</span>Website content</a>
    </nav>
    <div class="sidebar-footer"><a href="{{ config('app.frontend_url', 'http://localhost:3000') }}" target="_blank" rel="noopener">View storefront ↗</a><form method="POST" action="{{ route('logout') }}">@csrf<button type="submit">Sign out</button></form></div>
</aside>
