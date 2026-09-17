<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(Request $request): View
    {
        $products = Product::with('collection')
            ->when($request->filled('q'), fn ($query) => $query->where('name', 'like', '%'.$request->string('q').'%'))
            ->when($request->filled('category'), fn ($query) => $query->where('category', $request->string('category')))
            ->latest()->paginate(12)->withQueryString();

        return view('products.index', ['products' => $products, 'categories' => Product::query()->distinct()->orderBy('category')->pluck('category')]);
    }

    public function create(): View
    {
        return view('products.create', ['product' => new Product, 'collections' => Collection::where('active', true)->orderBy('title')->get()]);
    }

    public function store(Request $request): RedirectResponse
    {
        $product = Product::create($this->payload($request));

        return redirect()->route('admin.products.edit', $product)->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): View
    {
        return view('products.edit', ['product' => $product, 'collections' => Collection::where('active', true)->orderBy('title')->get()]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->payload($request, $product));

        return back()->with('success', 'Product changes saved.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product removed.');
    }

    private function payload(Request $request, ?Product $product = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:160'],
            'slug' => ['nullable', 'string', 'max:180', Rule::unique('products', 'slug')->ignore($product?->id)],
            'category' => ['required', 'string', 'max:80'],
            'collection_id' => ['nullable', 'exists:collections,id'],
            'description' => ['required', 'string'],
            'care' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0', 'lt:price'],
            'image_upload' => [$product ? 'nullable' : 'required', 'image', 'mimes:jpeg,jpg,png,webp,avif', 'max:5120'],
            'hover_image_upload' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,avif', 'max:5120'],
            'hover_image_clear' => ['nullable', 'boolean'],
            'sizes' => ['nullable', 'string'],
            'colors' => ['nullable', 'string'],
            'gallery_uploads' => ['nullable', 'array'],
            'gallery_uploads.*' => ['image', 'mimes:jpeg,jpg,png,webp,avif', 'max:5120'],
            'gallery_clear' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
        ]);

        $data['slug'] = Str::slug($data['slug'] ?: $data['name']);
        $data['sizes'] = $this->lines($data['sizes'] ?? '', ',');
        $data['colors'] = collect($this->lines($data['colors'] ?? '', "\n"))->map(function (string $line): array {
            [$name, $hex] = array_pad(array_map('trim', explode('|', $line, 2)), 2, '#171717');

            return ['name' => $name, 'hex' => $hex ?: '#171717'];
        })->filter(fn (array $color) => $color['name'] !== '')->values()->all();
        if ($request->hasFile('image_upload')) {
            $data['image'] = asset('storage/'.$request->file('image_upload')->store('products', 'public'));
        }
        if ($request->hasFile('hover_image_upload')) {
            $data['hover_image'] = asset('storage/'.$request->file('hover_image_upload')->store('products', 'public'));
        } elseif ($request->boolean('hover_image_clear')) {
            $data['hover_image'] = '';
        }
        if ($request->hasFile('gallery_uploads')) {
            $data['gallery'] = collect($request->file('gallery_uploads'))
                ->map(fn ($image) => asset('storage/'.$image->store('products/gallery', 'public')))
                ->all();
        } elseif ($request->boolean('gallery_clear')) {
            $data['gallery'] = [];
        } elseif (! $product) {
            $data['gallery'] = [];
        }
        unset($data['image_upload'], $data['hover_image_upload'], $data['hover_image_clear'], $data['gallery_uploads'], $data['gallery_clear']);
        foreach (['is_new', 'is_featured', 'is_best_seller', 'in_stock'] as $flag) {
            $data[$flag] = $request->boolean($flag);
        }
        $data['in_stock'] = $data['in_stock'] && $data['stock_quantity'] > 0;

        return $data;
    }

    private function lines(string $value, string $separator = "\n"): array
    {
        return collect(preg_split($separator === ',' ? '/,/' : '/\r?\n/', $value) ?: [])->map(fn ($item) => trim($item))->filter()->values()->all();
    }
}
