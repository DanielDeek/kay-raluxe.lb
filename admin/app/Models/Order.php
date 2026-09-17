<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', 'order_number', 'status', 'payment_status', 'subtotal', 'delivery_fee', 'total',
        'customer_name', 'customer_phone', 'delivery_area', 'address', 'note', 'items',
    ];

    protected function casts(): array
    {
        return ['subtotal' => 'decimal:2', 'delivery_fee' => 'decimal:2', 'total' => 'decimal:2', 'items' => 'array'];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
