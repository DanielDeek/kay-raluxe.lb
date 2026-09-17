@extends('layouts.admin', ['title' => 'New product', 'heading' => 'Add product'])
@section('content')
<div class="page-intro"><div><span class="eyebrow">Catalogue</span><h2>New product.</h2><p>Give the piece a clear story and enough detail to sell confidently.</p></div></div>
<form class="form-panel" method="POST" action="{{ route('admin.products.store') }}" enctype="multipart/form-data">@csrf @include('products.form')</form>
@endsection
