<div class="headerWrap" id="headerWrap">
	<div class="logo" style="background-color:#ffffff">
		<img src="/images/logo.png" alt="KPRINTFACTORY">
	</div>
	<div class="ctrTabMenu" id="ctrTabWrap">
		<ul class="tabMenuUl">
			<li class="ctrTabMore" style="background: none !important; display: none;">
				<img src="/images/btn/btn_tabMore.png" alt="">
				<div class="topMenuSubLayer2" style="width:150px;top:40px;left:0;display:none;" id="moreTapList">
					<div class="arrTip" style="background:url('/images/bul/bul_layerTop.png') no-repeat 7% 0;"></div>
					<div class="border_div">
						<h2>
							<strong>탭 더보기</strong>
							<a href="javascript:void(0);" class="close_this"><img src="/images/btn/btn_closethis.png" alt=""
									onclick="document.getElementById('setupLayer').style.display='none'"></a>
						</h2>
						<div class="myMenuList" id="tabMenuHiddenList"></div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<!-- //탭 제어 -->
	<div class="ctrTopMenuWrap">
		<ul class="topMenuUl">
			<li class="topMyObj">
				<a href="javascript:void(0);" class="topMyBtn" id="topMenu00"><strong id="topUserName"></strong> <span>님</span></a>
				<div class="topMenuSubLayer" style="width: 220px; top: 61px; right: 1%; display: none;" id="popMenu00">
					<div class="arrTip" style="background:url('/images/bul/bul_layerTop.png') no-repeat 72.5% 0;"></div>
					<div class="border_div">
						<h2>
							<strong>내정보 설정</strong>
							<a href="javascript:void(0);" class="close_this btnInfoClose"><img src="/images/btn/btn_closethis.png" alt=""></a>
						</h2>
						<div class="myMenuList">
							<a href="javascript:void(0);" class="userInfo btnMyInfo">내 정보 수정</a>
							<a href="{{ $sessionInfo->OutPath }}" class="btnLogout">로그아웃</a>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="clear"></div>
	</div>
	<div class="clear"></div>
</div>