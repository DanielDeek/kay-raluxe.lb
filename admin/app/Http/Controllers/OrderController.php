<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class OrderController extends Controller
{
    public function index(Request $request): View
    {
        $orders = Order::with('customer')
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
            ->when($request->filled('q'), fn ($query) => $query->where(fn ($query) => $query->where('order_number', 'like', '%'.$request->string('q').'%')->orWhere('customer_name', 'like', '%'.$request->string('q').'%')))
            ->latest()->paginate(15)->withQueryString();

        return view('orders.index', ['orders' => $orders, 'statuses' => ['new', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']]);
    }

    public function show(Order $order): View
    {
        return view('orders.show', compact('order'));
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:new,confirmed,processing,shipped,delivered,cancelled'],
            'payment_status' => ['required', 'in:pending,paid,refunded'],
        ]);
        $order->update($data);

        return back()->with('success', 'Order status updated.');
    }
}
