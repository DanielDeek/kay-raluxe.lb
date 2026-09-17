@extends('layouts.admin', ['title' => 'Edit '.$product->name, 'heading' => 'Edit product'])
@section('content')
<div class="page-intro"><div><span class="eyebrow">Catalogue / {{ $product->category }}</span><h2>{{ $product->name }}.</h2><p>Update the live storefront details for this piece.</p></div><form class="inline-form" method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Remove this product?')">@csrf @method('DELETE')<button type="submit" class="button button-danger">Remove product</button></form></div>
<form class="form-panel" method="POST" action="{{ route('admin.products.update', $product) }}" enctype="multipart/form-data">@csrf @method('PUT') @include('products.form')</form>
@endsection
