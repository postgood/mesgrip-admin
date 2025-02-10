@extends('layouts.index', [])

@section('content')
<div class="wrap">
	<div class="alert alert-danger">
		{{ Session::get('fail') }}
	</div>
</div>
@endsection