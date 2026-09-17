@extends('layouts.admin', ['title' => 'New collection', 'heading' => 'Add collection'])
@section('content')
<div class="page-intro"><div><span class="eyebrow">Merchandising</span><h2>New collection.</h2><p>Give customers a clear reason to explore this edit.</p></div></div>
<form class="form-panel" method="POST" action="{{ route('admin.collections.store') }}" enctype="multipart/form-data">@csrf @include('collections.form')</form>
@endsection
