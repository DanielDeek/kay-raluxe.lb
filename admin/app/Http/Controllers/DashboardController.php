<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        $completedStatuses = ['confirmed', 'processing', 'shipped', 'delivered'];
        $revenue = Order::whereIn('status', $completedStatuses)->sum('total');
        $monthRevenue = Order::whereIn('status', $completedStatuses)
            ->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->sum('total');

        $dailySales = collect(range(6, 0))->map(function (int $days) use ($completedStatuses): array {
            $date = now()->subDays($days);

            return [
                'label' => $date->format('D'),
                'value' => (float) Order::whereIn('status', $completedStatuses)->whereDate('created_at', $date)->sum('total'),
            ];
        });

        return view('dashboard.index', [
            'revenue' => $revenue,
            'monthRevenue' => $monthRevenue,
            'ordersCount' => Order::count(),
            'customersCount' => Customer::count(),
            'productsCount' => Product::count(),
            'lowStock' => Product::where('stock_quantity', '<=', 2)->orderBy('stock_quantity')->take(5)->get(),
            'recentOrders' => Order::latest()->with('customer')->take(7)->get(),
            'dailySales' => $dailySales,
        ]);
    }
}
