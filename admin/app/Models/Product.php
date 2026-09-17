<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'collection_id', 'name', 'slug', 'category', 'description', 'care', 'price', 'sale_price',
        'sizes', 'colors', 'image', 'hover_image', 'gallery', 'is_new', 'is_featured',
        'is_best_seller', 'in_stock', 'stock_quantity', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'sizes' => 'array',
            'colors' => 'array',
            'gallery' => 'array',
            'is_new' => 'boolean',
            'is_featured' => 'boolean',
            'is_best_seller' => 'boolean',
            'in_stock' => 'boolean',
            'stock_quantity' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    public function getCurrentPriceAttribute(): string
    {
        return number_format((float) ($this->sale_price ?? $this->price), 2, '.', '');
    }
}
