@extends('layouts.admin', ['title' => 'Store settings', 'heading' => 'Store settings'])
@section('content')
<div class="page-intro">
    <div>
        <span class="eyebrow">Configuration</span>
        <h2>The details behind the edit.</h2>
        <p>Keep your Luxe Avenue customer-facing contact, delivery and announcement details current.</p>
    </div>
</div>
<form class="form-panel" method="POST" action="{{ route('admin.settings.update') }}">
    @csrf
    @method('PUT')
    <div class="form-grid">
        <div class="field"><label for="store_name">Store name</label><input id="store_name" name="store_name" value="{{ old('store_name', $settings['store_name'] ?? 'Luxe Avenue') }}" required></div>
        <div class="field"><label for="whatsapp_number">WhatsApp number</label><input id="whatsapp_number" name="whatsapp_number" value="{{ old('whatsapp_number', $settings['whatsapp_number'] ?? '') }}" required><span class="field-hint">International digits only</span></div>
        <div class="field"><label for="contact_email">Contact email</label><input id="contact_email" name="contact_email" type="email" value="{{ old('contact_email', $settings['contact_email'] ?? 'info@luxe.com') }}"></div>
        <div class="field"><label for="instagram_url">Instagram URL</label><input id="instagram_url" name="instagram_url" type="url" value="{{ old('instagram_url', $settings['instagram_url'] ?? '') }}"></div>
        <div class="field"><label for="store_address">Store address</label><input id="store_address" name="store_address" value="{{ old('store_address', $settings['store_address'] ?? '') }}"></div>
        <div class="field full"><label for="delivery_note">Delivery note</label><input id="delivery_note" name="delivery_note" value="{{ old('delivery_note', $settings['delivery_note'] ?? '') }}"></div>
        <div class="field full"><label for="announcement">Announcement bar</label><input id="announcement" name="announcement" value="{{ old('announcement', $settings['announcement'] ?? '') }}"></div>
    </div>
    <div class="form-actions"><button class="button button-dark" type="submit">Save settings <span>-&gt;</span></button></div>
</form>
@endsection
