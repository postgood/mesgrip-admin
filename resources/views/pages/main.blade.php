@extends('layouts.index', [])

@section('content')
<div class="wrap">
	<!-- logBox -->
	<div class="logBox">

		<div class="logBoxWrap">
			<div class="logLogoNew">
				<img class="logoImage f_lt" src="/images/logo.png" alt="">
				<img class="mesImage f_rt" src="/images/logo_y.png" alt="">
			</div>
			<div id="login-form" class="logForm">
				<form action="{{ route('auth.check') }}" method="POST">
				@if(Session::get('fail'))
				<div class="alert alert-danger">
						{{ Session::get('fail') }}
				</div>
				@endif
				{{ csrf_field() }}
				<!-- input type="hidden" name="host" value="{{ Request::getHost() }}"/ -->
				<input type="text" class="logInput" name="userid" placeholder="사용자 아이디를 입력하세요." requiremsg="아이디">
				<input type="password" class="logInput" name="encpwd" placeholder="비밀번호를 입력하세요," requiremsg="비밀번호">
				</form>
				<button class="logBtn" id="btnSingin">로그인</button>
			</div>
			<div class="logAside">
				<!-- 이미지 체크박스 -->
				<span class="imgChkBox f_lt">
					<input class="imgChkBoxInput" id="vatYn" type="checkbox">
					<label class="imgChkBoxLabel" for="vatYn">아이디 저장</label>
				</span>
				<!-- //이미지 체크박스 -->
				<span class="f_rt">
					<a href="javascript:void(0);" class="join">회원가입</a>
					<!-- span class="guideLine">|</span>
					<a href="javascript:void(0);" class="btnFind">아이디 · 비밀번호 찾기</a -->
				</span>
			</div>
		</div>
		
		<p class="copy"><!-- 서울 중구 퇴계로31길 10 304호 (필동1가 43-3) Tel. <a href="tel:01090890794">010 9089 0794</a>  Email. <a href="mailto:postgood@kakao.com">postgood@kakao.com</a><br>Copyright 2024 KOREANCULTURELOVE Co,. ltd All right reserved. --></p>
	</div>
	<!-- //logBox -->
</div>
<div id="spinnerWrap" class="loading_div" style="display:none">
	<span class="ico_load"></span>
</div>
@endsection