<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class CollectionController extends Controller
{
    public function index(): View
    {
        return view('collections.index', ['collections' => Collection::withCount('products')->orderBy('sort_order')->paginate(12)]);
    }

    public function create(): View
    {
        return view('collections.create', ['collection' => new Collection]);
    }

    public function store(Request $request): RedirectResponse
    {
        $collection = Collection::create($this->payload($request));

        return redirect()->route('admin.collections.edit', $collection)->with('success', 'Collection created successfully.');
    }

    public function edit(Collection $collection): View
    {
        return view('collections.edit', compact('collection'));
    }

    public function update(Request $request, Collection $collection): RedirectResponse
    {
        $collection->update($this->payload($request, $collection));

        return back()->with('success', 'Collection changes saved.');
    }

    public function destroy(Collection $collection): RedirectResponse
    {
        $collection->delete();

        return redirect()->route('admin.collections.index')->with('success', 'Collection removed.');
    }

    private function payload(Request $request, ?Collection $collection = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:120'],
            'slug' => ['nullable', 'string', 'max:160', Rule::unique('collections', 'slug')->ignore($collection?->id)],
            'subtitle' => ['required', 'string', 'max:220'],
            'description' => ['nullable', 'string'],
            'image_upload' => ['nullable', 'image', 'mimes:jpeg,jpg,png,webp,avif', 'max:5120'],
            'image_clear' => ['nullable', 'boolean'],
            'category' => ['nullable', 'string', 'max:80'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
        $data['slug'] = Str::slug($data['slug'] ?: $data['title']);
        $data['active'] = $request->boolean('active');
        if ($request->hasFile('image_upload')) {
            $data['image'] = asset('storage/'.$request->file('image_upload')->store('collections', 'public'));
        } elseif ($request->boolean('image_clear')) {
            $data['image'] = '';
        } elseif ($collection) {
            unset($data['image']);
        }
        unset($data['image_upload'], $data['image_clear']);

        return $data;
    }
}
