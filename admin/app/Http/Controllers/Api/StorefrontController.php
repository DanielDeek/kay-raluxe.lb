<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\WebsiteContentController;
use App\Models\Collection;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StorefrontController extends Controller
{
    public function products(): JsonResponse
    {
        return response()->json(['data' => Product::with('collection')->where('in_stock', true)->orderBy('sort_order')->latest()->get()]);
    }

    public function collections(): JsonResponse
    {
        return response()->json(['data' => Collection::where('active', true)->withCount('products')->orderBy('sort_order')->get()]);
    }

    public function settings(): JsonResponse
    {
        return response()->json(['data' => Setting::pluck('value', 'key')]);
    }

    public function content(): JsonResponse
    {
        $saved = Setting::query()->where('type', 'content')->pluck('value', 'key')->all();
        $announcement = Setting::query()->where('key', 'announcement')->value('value');

        return response()->json(['data' => array_replace(WebsiteContentController::DEFAULTS, ['announcement' => $announcement], $saved)]);
    }

    public function orders(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer.name' => ['required', 'string', 'max:120'],
            'customer.phone' => ['required', 'string', 'max:30'],
            'customer.email' => ['nullable', 'email', 'max:160'],
            'customer.address' => ['nullable', 'string', 'max:500'],
            'delivery_area' => ['nullable', 'string', 'max:120'],
            'note' => ['nullable', 'string', 'max:1000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.size' => ['required', 'string', 'max:20'],
            'items.*.color' => ['required', 'string', 'max:80'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:10'],
        ]);

        $order = DB::transaction(function () use ($data): Order {
            $lineItems = [];
            $subtotal = 0;
            foreach ($data['items'] as $line) {
                $product = Product::findOrFail($line['product_id']);
                abort_unless($product->in_stock, 422, 'One or more products are unavailable.');
                abort_unless($product->stock_quantity >= $line['quantity'], 422, 'One or more products do not have enough stock.');
                abort_unless(in_array($line['size'], $product->sizes ?? [], true), 422, 'A selected size is no longer available.');
                abort_unless(collect($product->colors ?? [])->contains('name', $line['color']), 422, 'A selected color is no longer available.');
                $unitPrice = (float) ($product->sale_price ?? $product->price);
                $lineTotal = $unitPrice * $line['quantity'];
                $subtotal += $lineTotal;
                $lineItems[] = ['product_id' => $product->id, 'name' => $product->name, 'size' => $line['size'], 'color' => $line['color'], 'quantity' => $line['quantity'], 'unit_price' => $unitPrice, 'line_total' => $lineTotal];
            }

            $customer = request()->user()?->customer;
            if ($customer) {
                $customer->update([
                    'name' => $data['customer']['name'], 'email' => $data['customer']['email'] ?? $customer->email,
                    'phone' => $data['customer']['phone'], 'address' => $data['customer']['address'] ?? $customer->address,
                ]);
            } else {
                $customer = Customer::updateOrCreate(['phone' => $data['customer']['phone']], [
                    'name' => $data['customer']['name'], 'email' => $data['customer']['email'] ?? null, 'address' => $data['customer']['address'] ?? null,
                ]);
            }

            return Order::create([
                'customer_id' => $customer->id, 'order_number' => 'KR-'.now()->format('ymdHis').'-'.str()->upper(str()->random(4)),
                'status' => 'new', 'payment_status' => 'pending', 'subtotal' => $subtotal, 'delivery_fee' => 0, 'total' => $subtotal,
                'customer_name' => $data['customer']['name'], 'customer_phone' => $data['customer']['phone'], 'delivery_area' => $data['delivery_area'] ?? null,
                'address' => $data['customer']['address'] ?? null, 'note' => $data['note'] ?? null, 'items' => $lineItems,
            ]);
        });

        return response()->json(['message' => 'Order received.', 'data' => $order], 201);
    }
}
