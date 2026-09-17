@extends('layouts.admin', ['title' => 'Website content', 'heading' => 'Website content'])
@section('content')
<div class="page-intro"><div><span class="eyebrow">Content studio</span><h2>Shape the storefront.</h2><p>Update homepage campaigns and page hero sections without touching the code.</p></div></div>
<form class="form-panel" method="POST" action="{{ route('admin.content.update') }}" enctype="multipart/form-data">@csrf @method('PUT')
    <div class="content-group"><div class="content-group-heading"><span class="eyebrow">Homepage hero</span><p>The first story customers see.</p></div><div class="form-grid">
        @include('content.field', ['key' => 'home_hero_eyebrow', 'label' => 'Eyebrow', 'content' => $content])
        @include('content.field', ['key' => 'home_hero_title', 'label' => 'Title', 'content' => $content])
        @include('content.field', ['key' => 'home_hero_description', 'label' => 'Description', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_hero_image', 'label' => 'Hero image', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_hero_primary_label', 'label' => 'Primary button', 'content' => $content])
        @include('content.field', ['key' => 'home_hero_primary_link', 'label' => 'Primary link', 'content' => $content])
        @include('content.field', ['key' => 'home_hero_secondary_label', 'label' => 'Secondary button', 'content' => $content])
        @include('content.field', ['key' => 'home_hero_secondary_link', 'label' => 'Secondary link', 'content' => $content])
    </div></div>
    <div class="content-group"><div class="content-group-heading"><span class="eyebrow">Homepage campaigns</span><p>Featured, seasonal, and shop-the-look sections.</p></div><div class="form-grid">
        @include('content.field', ['key' => 'home_featured_eyebrow', 'label' => 'Featured eyebrow', 'content' => $content])
        @include('content.field', ['key' => 'home_featured_title', 'label' => 'Featured title', 'content' => $content])
        @include('content.field', ['key' => 'home_featured_description', 'label' => 'Featured description', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_featured_image', 'label' => 'Featured image', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_promo_eyebrow', 'label' => 'Seasonal eyebrow', 'content' => $content])
        @include('content.field', ['key' => 'home_promo_title', 'label' => 'Seasonal title', 'content' => $content])
        @include('content.field', ['key' => 'home_promo_description', 'label' => 'Seasonal description', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_promo_image', 'label' => 'Seasonal image', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_promo_label', 'label' => 'Seasonal button', 'content' => $content])
        @include('content.field', ['key' => 'home_promo_link', 'label' => 'Seasonal link', 'content' => $content])
        @include('content.field', ['key' => 'home_look_eyebrow', 'label' => 'Shop-the-look eyebrow', 'content' => $content])
        @include('content.field', ['key' => 'home_look_title', 'label' => 'Shop-the-look title', 'content' => $content])
        @include('content.field', ['key' => 'home_look_description', 'label' => 'Shop-the-look description', 'content' => $content, 'full' => true])
        @include('content.field', ['key' => 'home_look_image', 'label' => 'Shop-the-look image', 'content' => $content, 'full' => true])
    </div></div>
    <div class="content-group"><div class="content-group-heading"><span class="eyebrow">Page hero sections</span><p>Change each page title, description, and banner image.</p></div><div class="form-grid">
        @foreach (['shop' => 'Shop', 'collections' => 'Collections', 'about' => 'About', 'contact' => 'Contact', 'delivery' => 'Delivery & Returns'] as $slug => $label)
            <div class="content-page-label full"><strong>{{ $label }}</strong></div>
            @include('content.field', ['key' => "page_{$slug}_eyebrow", 'label' => 'Eyebrow', 'content' => $content])
            @include('content.field', ['key' => "page_{$slug}_title", 'label' => 'Title', 'content' => $content])
            @include('content.field', ['key' => "page_{$slug}_description", 'label' => 'Description', 'content' => $content, 'full' => true])
            @include('content.field', ['key' => "page_{$slug}_image", 'label' => 'Banner image', 'content' => $content, 'full' => true])
        @endforeach
    </div></div>
    <div class="form-actions"><button class="button button-dark" type="submit">Save website content <span>→</span></button></div>
</form>
@endsection
