<div id="CI00000002">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>기업정보</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="cuNm">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="35px">
			<col width="90px">
			<col width="45px">
			<col width="150px">
			<col width="35px">
			<col width="80px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 분류</th>
					<td>
						<select class="w98p schColumBorderColorDefault" name="searchColumn">
							<option value="cuNm">업체명</option>
							<option value="cuOwnerNm">대표자명</option>
							<option value="cuTel">전화번호</option>
						</select>
					</td>
					
					<th class="ar">· 검색어</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="schColumBorderTextDefault" style="width:145px;height:28px !important" name="searchWord" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar">· 구분</th>
					<td>
						<select class="schColumBorderColorDefault" name="cuTypeCd">
							<option value="">전체</option>
							<option value="A">고객사</option>
							<option value="B">외주사</option>
							<option value="C">자재사</option>
						</select>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<!-- a href="#" class="btnSearch btnCreate" title="신규로 등록 할 수 있습니다."><i class="fa-regular fa-square-plus"></i>&nbsp;&nbsp;신규</a -->
							<a href="#" class="btnSearch btnCreate" title="신규 수주건을 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<!--a href="#" class="btnSearch2 btnTransDelete" title="선택된 건을 삭제 할 수 있습니다."><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;삭제</a -->
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<!-- 영역 Wrap -->
	<div class="mt20">
		<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
				<col width="25px">
				<col width="250px"><!-- 업체명 -->
				<col width="100px"><!-- 대표자 -->
				<!-- col width="50px" --><!-- 주요 -->
				<col width="120px"><!-- 사업자번호 -->
				<!-- col width="120px" --><!-- 전화번호 -->
				<col width="450px"><!-- 주소-->
				<col width="170px"><!-- 유형-->
				<col width="50px"><!-- 할인율 -->
				<col width="auto"><!-- 비고 -->
				<col width="150px"><!-- 등록일시 -->
				<col width="50px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="cuOwnerNm">대표자 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<!-- th >주요 </th -->
					<th >사업자번호(종)</th>
					<!-- th >전화번호 </th -->
					<th >주소 </th>
					<th >유형 </th>
					<th >직원 </th>
					<th >메모 </th>
					<th >등록일시</th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px">
				<col width="250px"><!-- 업체명 -->
				<col width="100px"><!-- 대표자 -->
				<!-- col width="50px" --><!-- 주요 -->
				<col width="120px"><!-- 사업자번호 -->
				<!-- col width="120px" --><!-- 전화번호 -->
				<col width="450px"><!-- 주소-->
				<col width="170px"><!-- 유형-->
				<col width="50px"><!-- 직원 -->
				<col width="auto"><!-- 비고 -->
				<col width="150px"><!-- 등록일시 -->
				<col width="50px"><!-- 보기 -->
				</colgroup>
				<tbody>
				</tbody>
			</table>
		</div>
		<div class="absWrap">
			<div class="pageInfoTfoot" style="position:relative;margin-top:10px;">
				<span style="position:absolute;top:0px;left:5px;">
					<select name="rowsPerPage" class="vm">
					<option value="20">20개씩 보기</option>
					<option value="30">30개씩 보기</option>
					<option value="40">40개씩 보기</option>
					<option value="50">50개씩 보기</option>
					<option value="100">100개씩 보기</option>
					</select>
				</span>
				<div class="pagenate">
					<a href="#">처음</a>
					<a href="#">이전</a>
					<a href="#" class="now">1</a>
					<a href="#">2</a>
					<a href="#">3</a>
					<a href="#">다음</a>
					<a href="#">마지막</a>
				</div>
				<span style="position:absolute;top:0px;right:5px;">
					<input type="hidden" name="page" style="width:40px;text-align:center;" inputType=comma>
					<a href="#" class="btnStyleMin03 btnExcelUpload" title="엑셀파일 등록"><i class="fa-solid fa-upload" style="color: #38a938;margin-top: 4px;"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="bankWrap">
	<!-- div class="mt3">
		<input class="w20p" type="text" name="caBankNm" placeholder="은행명" requiremsg="은행명">
		<input class="w20p" type="text" name="caOwnerNm" placeholder="예금주" requiremsg="예금주">
		<input class="w35p" type="text" name="caAccount" placeholder="계좌번호" requiremsg="계좌번호">
		<a href="javascript:void(0);" class="mt3 btnStyle05 btnRemoveBank">삭제</a>
	</div -->
</template>
<template id="popbillMemberDiv">
	<div class="mw_defalut" style="width:350px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">Popbill 가입정보</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th>
										<div class="al f_lt" style="width:49.5%;">이미 가입되어 있습니다. <br>Popbill 아이디를 입력하십시요</div>
										<div class="ar f_rt" style="width:49.5%;">
											<a href="javascript:void(0);" class="btnSearch popbillSave">저장</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 orderMaster">
							<caption></caption>
							<colgroup>
								<col width="25%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 아이디</th>
									<td><input type="hidden" name="idCheck"><input type="text" class="w98p" name="popbillId" requiremsg="아이디" placeholder="8자에서 20자 미만"></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="popbillJoinDiv">
	<div class="mw_defalut" style="width:650px;height:200px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">Popbill 연동 신청</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th>
										<div class="al f_lt" style="width:49.5%;"></div>
										<div class="ar f_rt" style="width:49.5%;">
											<a href="javascript:void(0);" class="btnSearch popbillJoin">연동신청</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 orderMaster">
							<caption></caption>
							<colgroup>
								<col width="12%">
								<col width="30%">
								<col width="15%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 아이디</th>
									<td><input type="hidden" name="idCheck"><input type="text" class="w98p" name="popbillId" requiremsg="아이디" placeholder="8자에서 50자 미만"></td>
									<th class="txt_r"><span style="color:red;">*</span> 비밀번호</th>
									<td>
										<input type="password" name="popbillPwd" class="w47p" placeholder="8~20자,영,숫자,특수 포함"> /
										<input type="password" name="popbillPwdRe" class="w47p" placeholder="비밀번호 확인">
									</td>
								</tr>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 담당자 성명</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactName" style="" placeholder="담당자 성명" >
									</td>
									<th class="txt_r"><span style="color:red;">*</span> 담당자 연락처</th>
									<td>
										<input class="w98p inputs" type="text" name="popbillContactTel" style="" placeholder="담당자 연락처">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="popbillQuitDiv">
	<div class="mw_defalut" style="width:650px;height:200px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">Popbill 연동 해지(탈퇴)</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th>
										<div class="al f_lt reFund" style="width:49.5%;"></div>
										<div class="ar f_rt" style="width:49.5%;">
											<a href="javascript:void(0);" class="btnSearch popbillQuit">해지신청</a>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10 orderMaster">
							<caption></caption>
							<colgroup>
								<col width="12%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="txt_r"><span style="color:red;">*</span> 해지사유</th>
									<td><textarea class="w99p" name="quitReason" rows="3"></textarea></td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>