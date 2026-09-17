<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(['email' => 'admin@kayraluxe.lb'], [
            'name' => 'Luxe Avenue Admin',
            'password' => Hash::make('ChangeMe123!'),
            'is_admin' => true,
        ]);

        $collectionData = [
            ['slug' => 'new-arrivals', 'title' => 'New Arrivals', 'subtitle' => 'The latest additions, fresh from the studio.', 'category' => null, 'image' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80'],
            ['slug' => 'dresses', 'title' => 'Dresses', 'subtitle' => 'Silhouettes for every occasion.', 'category' => 'dresses', 'image' => 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80'],
            ['slug' => 'tops', 'title' => 'Tops', 'subtitle' => 'Layer, mix, and make it yours.', 'category' => 'tops', 'image' => 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'],
            ['slug' => 'sets', 'title' => 'Sets', 'subtitle' => 'Considered pairings, ready to wear.', 'category' => 'sets', 'image' => 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80'],
            ['slug' => 'bottoms', 'title' => 'Bottoms', 'subtitle' => 'From tailored to fluid.', 'category' => 'bottoms', 'image' => 'https://images.unsplash.com/photo-1506629905607-d9c297d75c15?auto=format&fit=crop&w=1200&q=80'],
            ['slug' => 'summer-collection', 'title' => 'Summer Collection', 'subtitle' => 'Light fabrics, longer days.', 'category' => 'summer', 'image' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'],
            ['slug' => 'sale', 'title' => 'Sale', 'subtitle' => 'Favorites, now for less.', 'category' => 'sale', 'image' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'],
        ];
        $collections = collect($collectionData)->mapWithKeys(fn (array $data, int $index) => [$data['slug'] => Collection::updateOrCreate(['slug' => $data['slug']], [...$data, 'active' => true, 'sort_order' => $index])]);

        $productData = [
            ['name' => 'Amara Wrap Dress', 'slug' => 'amara-wrap-dress', 'category' => 'dresses', 'collection' => 'dresses', 'price' => 74, 'sale_price' => null, 'image' => 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', 'is_new' => true, 'is_featured' => true],
            ['name' => 'Lune Satin Slip', 'slug' => 'lune-satin-slip', 'category' => 'dresses', 'collection' => 'new-arrivals', 'price' => 86, 'sale_price' => 68, 'image' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80', 'is_new' => true, 'is_featured' => true],
            ['name' => 'Soleil Linen Set', 'slug' => 'soleil-linen-set', 'category' => 'sets', 'collection' => 'sets', 'price' => 92, 'sale_price' => null, 'image' => 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80', 'is_new' => true, 'is_featured' => true],
            ['name' => 'Noor Tailored Blazer', 'slug' => 'noor-tailored-blazer', 'category' => 'tops', 'collection' => 'best-sellers', 'price' => 108, 'sale_price' => null, 'image' => 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80', 'is_new' => false, 'is_featured' => true],
            ['name' => 'Camille Silk Cami', 'slug' => 'camille-silk-cami', 'category' => 'tops', 'collection' => 'tops', 'price' => 48, 'sale_price' => null, 'image' => 'https://images.unsplash.com/photo-1564257577054-7d0e8d7e9f2d?auto=format&fit=crop&w=900&q=80', 'is_new' => false, 'is_featured' => false],
            ['name' => 'Isla Wide Trouser', 'slug' => 'isla-wide-trouser', 'category' => 'bottoms', 'collection' => 'bottoms', 'price' => 64, 'sale_price' => 52, 'image' => 'https://images.unsplash.com/photo-1506629905607-d9c297d75c15?auto=format&fit=crop&w=900&q=80', 'is_new' => false, 'is_featured' => false],
            ['name' => 'Everly Sundress', 'slug' => 'everly-sundress', 'category' => 'summer', 'collection' => 'summer-collection', 'price' => 58, 'sale_price' => null, 'image' => 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80', 'is_new' => true, 'is_featured' => false],
            ['name' => 'Mira Crochet Set', 'slug' => 'mira-crochet-set', 'category' => 'sets', 'collection' => 'sets', 'price' => 78, 'sale_price' => null, 'image' => 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=900&q=80', 'is_new' => false, 'is_featured' => false],
        ];
        foreach ($productData as $index => $data) {
            Product::updateOrCreate(['slug' => $data['slug']], [
                'collection_id' => $collections[$data['collection']]->id ?? null, 'name' => $data['name'], 'category' => $data['category'],
                'description' => 'A considered Luxe Avenue piece designed for easy styling and confident everyday wear.', 'care' => 'Follow the garment care label. Store folded or on a padded hanger.',
                'price' => $data['price'], 'sale_price' => $data['sale_price'], 'sizes' => ['XS', 'S', 'M', 'L', 'XL'], 'colors' => [['name' => 'Black', 'hex' => '#171717'], ['name' => 'Ivory', 'hex' => '#F7F3ED']],
                'image' => $data['image'], 'hover_image' => $data['image'], 'gallery' => [$data['image']], 'is_new' => $data['is_new'], 'is_featured' => $data['is_featured'], 'is_best_seller' => $data['is_featured'], 'in_stock' => $index !== 7, 'stock_quantity' => $index === 7 ? 0 : ($index === 6 ? 2 : 12), 'sort_order' => $index,
            ]);
        }

        $customer = Customer::updateOrCreate(['phone' => '+961 3 954 746'], ['name' => 'Demo Customer', 'email' => 'customer@example.com', 'address' => 'Saida, Lebanon']);
        if (! Order::where('order_number', 'KR-DEMO-001')->exists()) {
            Order::create(['customer_id' => $customer->id, 'order_number' => 'KR-DEMO-001', 'status' => 'new', 'payment_status' => 'pending', 'subtotal' => 74, 'delivery_fee' => 0, 'total' => 74, 'customer_name' => $customer->name, 'customer_phone' => $customer->phone, 'delivery_area' => 'Saida', 'address' => $customer->address, 'items' => [['name' => 'Amara Wrap Dress', 'quantity' => 1, 'size' => 'M', 'color' => 'Black', 'unit_price' => 74, 'line_total' => 74]]]);
        }

        foreach (['store_name' => 'Luxe Avenue', 'whatsapp_number' => '96176977149', 'contact_email' => 'info@luxe.com', 'instagram_url' => 'https://www.instagram.com/luxe_avenue_lb/', 'store_address' => 'Saida Highway, facing Spot Mall', 'delivery_note' => 'Delivery all over Lebanon | WhatsApp', 'announcement' => 'Delivery all over Lebanon · Size swap available'] as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value, 'type' => 'text']);
        }
    }
}
