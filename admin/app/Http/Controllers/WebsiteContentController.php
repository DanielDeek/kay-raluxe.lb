<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class WebsiteContentController extends Controller
{
    public const DEFAULTS = [
        'home_hero_eyebrow' => 'The new season', 'home_hero_title' => 'Dress for the way you feel.',
        'home_hero_description' => 'Curated silhouettes for days that become nights, and the version of you that owns the room.', 'home_hero_image' => '',
        'home_hero_primary_label' => 'Shop New Collection', 'home_hero_primary_link' => '/collections/new-arrivals',
        'home_hero_secondary_label' => 'Explore Best Sellers', 'home_hero_secondary_link' => '/collections/best-sellers',
        'home_featured_eyebrow' => 'The evening edit', 'home_featured_title' => 'The room changes when you arrive.',
        'home_featured_description' => 'Fluid dresses, confident tailoring, and the finishing details for plans that start late and stay out longer.', 'home_featured_image' => '',
        'home_promo_eyebrow' => 'A new season, softly', 'home_promo_title' => 'Pieces for the plans ahead.',
        'home_promo_description' => 'Light layers and occasion-ready silhouettes, selected for the warmer days in between.', 'home_promo_image' => '',
        'home_promo_label' => 'Shop the seasonal edit', 'home_promo_link' => '/collections/summer-collection',
        'home_look_eyebrow' => 'Styled together', 'home_look_title' => 'Shop the look',
        'home_look_description' => 'One outfit, three pieces, plenty of ways to make it yours.', 'home_look_image' => '',
        'page_shop_eyebrow' => 'The Shop', 'page_shop_title' => 'Every piece, one place.', 'page_shop_description' => 'Explore the full edit by category, size, color, price, and collection.', 'page_shop_image' => '',
        'page_collections_eyebrow' => 'Discover', 'page_collections_title' => 'Collections, curated.', 'page_collections_description' => 'Find the edit that fits the moment, from new arrivals to easy summer layers.', 'page_collections_image' => '',
        'page_about_eyebrow' => 'Our Story', 'page_about_title' => 'Fashion, made personal.', 'page_about_description' => '', 'page_about_image' => '',
        'page_contact_eyebrow' => 'Get in Touch', 'page_contact_title' => "We'd love to hear from you.", 'page_contact_description' => 'For styling questions, delivery details, or help choosing your size, our fastest reply is on WhatsApp.', 'page_contact_image' => '',
        'page_delivery_eyebrow' => 'Good to know', 'page_delivery_title' => 'Delivery & Returns', 'page_delivery_description' => 'Delivery all over Lebanon, with size swaps available subject to stock.', 'page_delivery_image' => '',
    ];

    public function edit(): View
    {
        $saved = Setting::query()->whereIn('key', array_keys(self::DEFAULTS))->pluck('value', 'key')->all();
        $content = array_replace(self::DEFAULTS, $saved);

        return view('content.edit', compact('content'));
    }

    public function update(Request $request): RedirectResponse
    {
        $rules = [];
        foreach (self::DEFAULTS as $key => $default) {
            if (str_ends_with($key, '_image')) {
                $rules["{$key}_upload"] = ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,avif', 'max:5120'];
                $rules["{$key}_clear"] = ['nullable', 'boolean'];
            } else {
                $rules[$key] = ['nullable', 'string', 'max:1000'];
            }
        }
        $data = $request->validate($rules);

        foreach (self::DEFAULTS as $key => $default) {
            if (str_ends_with($key, '_image')) {
                $value = Setting::query()->where('key', $key)->value('value') ?? $default;
                if ($request->boolean("{$key}_clear")) {
                    $value = '';
                } elseif ($request->hasFile("{$key}_upload")) {
                    $path = $request->file("{$key}_upload")->store('website-content', 'public');
                    $value = asset("storage/{$path}");
                }
            } else {
                $value = $data[$key] ?? '';
            }
            Setting::updateOrCreate(['key' => $key], ['value' => $value ?? '', 'type' => 'content']);
        }

        return back()->with('success', 'Website content saved.');
    }
}
