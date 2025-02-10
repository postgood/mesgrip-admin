@extends('layouts.workReportIndex', [])

@section('content')

<div class="mobileContainer">
	<!-- logBox -->
	<div class="logBox ac" style="background: #181420;top:50%; left: 0%; margin-left: 0px;">

		<div class="logBoxWrap" style="background: #181420;">
			<div class="logLogo"><img src="/images/logo.png" alt=""></div>
			<div  style="font-size:15px; margin-bottom:10px;"><storing> 작업지시서 작업관리 </strong></div>
			<div id="login-form" class="logForm">
				<form action="{{ route('workreport.auth.check') }}" method="POST">
				@if(Session::get('fail'))
				<div class="alert alert-danger">
						{{ Session::get('fail') }}
				</div>
				@endif
				{{ csrf_field() }}
				<!-- input type="hidden" name="host" value="{{ Request::getHost() }}"/ -->
				<input type="text" class="logInput" name="userid" placeholder="사용자 아이디를 입력하세요." requiremsg="아이디" >
				<input type="password" class="logInput" name="encpwd" placeholder="비밀번호를 입력하세요," requiremsg="비밀번호">
				<input type="hidden" name="p" value="{{$p}}">
				</form>
				<button class="logBtn" id="btnSingin">로그인</button>
			</div>
		</div>
		
		<p class="copy"></p>
		<p class="widthSize"></p>
	</div>
	<!-- //logBox -->
</div>

<div id="spinnerWrap" class="loading_div" style="display:none">
	<span class="ico_load"></span>
</div>
@endsection