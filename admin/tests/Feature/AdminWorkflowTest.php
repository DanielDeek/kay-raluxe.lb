<?php

namespace Tests\Feature;

use App\Models\Collection;
use App\Models\Product;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminWorkflowTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_open_login_but_not_the_dashboard(): void
    {
        $this->get('/login')->assertOk()->assertSee('Welcome back.');
        $this->get('/admin')->assertRedirect('/login');
    }

    public function test_admin_can_sign_in_and_open_dashboard(): void
    {
        $user = User::factory()->create(['email' => 'owner@example.com', 'password' => Hash::make('password'), 'is_admin' => true]);

        $this->post('/login', ['email' => 'owner@example.com', 'password' => 'password'])
            ->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
        $this->get('/admin')->assertOk()->assertSee('Overview');
    }

    public function test_admin_can_update_website_content(): void
    {
        $user = User::factory()->create(['is_admin' => true]);

        $this->actingAs($user)->get('/admin/content')->assertOk()->assertSee('Shape the storefront.');
        $this->actingAs($user)->put('/admin/content', ['home_hero_title' => 'A new Luxe Avenue story'])
            ->assertRedirect('/admin/content');

        $this->assertDatabaseHas('settings', ['key' => 'home_hero_title', 'value' => 'A new Luxe Avenue story', 'type' => 'content']);
        $this->getJson('/api/content')->assertOk()->assertJsonPath('data.home_hero_title', 'A new Luxe Avenue story');

        Storage::fake('public');
        $this->actingAs($user)->put('/admin/content', [
            'home_hero_image_upload' => UploadedFile::fake()->create('hero.jpg', 10, 'image/jpeg'),
        ])->assertRedirect('/admin/content');

        $imageUrl = Setting::query()->where('key', 'home_hero_image')->value('value');
        $this->assertStringContainsString('/storage/website-content/', $imageUrl);
        $this->assertCount(1, Storage::disk('public')->allFiles('website-content'));
    }

    public function test_storefront_api_is_publicly_readable(): void
    {
        $this->getJson('/api/products')->assertOk()->assertJsonStructure(['data']);
        $this->getJson('/api/collections')->assertOk()->assertJsonStructure(['data']);
        $this->getJson('/api/settings')->assertOk()->assertJsonStructure(['data']);
    }

    public function test_admin_can_create_catalogue_records_with_uploaded_images(): void
    {
        $user = User::factory()->create(['is_admin' => true]);
        Storage::fake('public');

        $this->actingAs($user)->post('/admin/collections', [
            'title' => 'Uploaded Edit',
            'slug' => 'uploaded-edit',
            'subtitle' => 'A fresh collection',
            'image_upload' => UploadedFile::fake()->create('collection.jpg', 10, 'image/jpeg'),
            'active' => '1',
        ])->assertRedirect();

        $collection = Collection::query()->where('slug', 'uploaded-edit')->firstOrFail();
        $this->assertStringContainsString('/storage/collections/', $collection->image);

        $this->actingAs($user)->post('/admin/products', [
            'name' => 'Uploaded Dress',
            'slug' => 'uploaded-dress',
            'category' => 'dresses',
            'collection_id' => $collection->id,
            'description' => 'A test product with uploaded images.',
            'price' => 65,
            'sizes' => 'S, M',
            'colors' => 'Black|#171717',
            'stock_quantity' => 4,
            'image_upload' => UploadedFile::fake()->create('primary.jpg', 10, 'image/jpeg'),
            'hover_image_upload' => UploadedFile::fake()->create('hover.jpg', 10, 'image/jpeg'),
            'gallery_uploads' => [
                UploadedFile::fake()->create('detail-one.jpg', 10, 'image/jpeg'),
                UploadedFile::fake()->create('detail-two.jpg', 10, 'image/jpeg'),
            ],
        ])->assertRedirect();

        $product = Product::query()->where('slug', 'uploaded-dress')->firstOrFail();
        $this->assertStringContainsString('/storage/products/', $product->image);
        $this->assertCount(2, $product->gallery);
        $this->assertCount(5, Storage::disk('public')->allFiles());
    }

    public function test_storefront_api_creates_a_valid_order_from_current_inventory(): void
    {
        $product = Product::create([
            'name' => 'Test Dress', 'slug' => 'test-dress', 'category' => 'dresses', 'description' => 'Test product',
            'price' => 50, 'sizes' => ['M'], 'colors' => [['name' => 'Black', 'hex' => '#171717']], 'image' => 'https://example.com/image.jpg',
            'gallery' => ['https://example.com/image.jpg'], 'in_stock' => true, 'stock_quantity' => 10,
        ]);

        $response = $this->postJson('/api/orders', [
            'customer' => ['name' => 'Test Customer', 'phone' => '+9613000000'],
            'delivery_area' => 'Saida',
            'items' => [['product_id' => $product->id, 'size' => 'M', 'color' => 'Black', 'quantity' => 2]],
        ]);

        $response->assertCreated()->assertJsonPath('data.status', 'new');
        $this->assertDatabaseHas('orders', ['customer_phone' => '+9613000000', 'total' => 100]);
    }

    public function test_customer_can_register_login_view_profile_and_logout(): void
    {
        $registration = $this->postJson('/api/auth/register', [
            'name' => 'New Customer', 'email' => 'new.customer@example.com', 'phone' => '+9613123456',
            'password' => 'password123', 'password_confirmation' => 'password123',
        ]);

        $registration->assertCreated()->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'phone']]);
        $token = $registration->json('token');
        $this->assertDatabaseHas('users', ['email' => 'new.customer@example.com', 'is_admin' => false]);
        $this->assertDatabaseHas('customers', ['email' => 'new.customer@example.com', 'phone' => '+9613123456']);

        $auth = $this->withHeader('Authorization', "Bearer {$token}");
        $auth->getJson('/api/auth/me')->assertOk()->assertJsonPath('user.email', 'new.customer@example.com');
        $auth->putJson('/api/auth/profile', ['name' => 'Updated Customer', 'email' => 'new.customer@example.com', 'phone' => '+9613987654'])->assertOk()->assertJsonPath('user.name', 'Updated Customer');
        $auth->putJson('/api/auth/password', ['current_password' => 'password123', 'password' => 'newpassword123', 'password_confirmation' => 'newpassword123'])->assertOk();

        $product = Product::create([
            'name' => 'Account Dress', 'slug' => 'account-dress', 'category' => 'dresses', 'description' => 'Test product',
            'price' => 50, 'sizes' => ['M'], 'colors' => [['name' => 'Black', 'hex' => '#171717']], 'image' => 'https://example.com/image.jpg',
            'gallery' => ['https://example.com/image.jpg'], 'in_stock' => true, 'stock_quantity' => 10,
        ]);
        $auth->postJson('/api/orders', ['customer' => ['name' => 'Updated Customer', 'phone' => '+9613987654'], 'items' => [['product_id' => $product->id, 'size' => 'M', 'color' => 'Black', 'quantity' => 1]]])->assertCreated();
        $auth->getJson('/api/auth/orders')->assertOk()->assertJsonCount(1, 'data');

        $this->postJson('/api/auth/login', ['email' => 'new.customer@example.com', 'password' => 'password123'])->assertStatus(422);
        $this->postJson('/api/auth/login', ['email' => 'new.customer@example.com', 'password' => 'newpassword123'])->assertOk()->assertJsonStructure(['token', 'user']);
        $auth->postJson('/api/auth/logout')->assertOk();
        $auth->getJson('/api/auth/me')->assertUnauthorized();
    }
}
