@extends('layouts.admin', ['title' => 'Edit '.$collection->title, 'heading' => 'Edit collection'])
@section('content')
<div class="page-intro"><div><span class="eyebrow">Merchandising</span><h2>{{ $collection->title }}.</h2><p>Keep the collection story, hero image and publication status current.</p></div><form class="inline-form" method="POST" action="{{ route('admin.collections.destroy', $collection) }}" onsubmit="return confirm('Remove this collection? Products will remain in the catalogue.')">@csrf @method('DELETE')<button type="submit" class="button button-danger">Remove collection</button></form></div>
<form class="form-panel" method="POST" action="{{ route('admin.collections.update', $collection) }}" enctype="multipart/form-data">@csrf @method('PUT') @include('collections.form')</form>
@endsection
