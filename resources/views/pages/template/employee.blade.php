<div id="CI00000003">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>직원목록</strong>
	</div>
	<!-- searchWrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="eNm">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="45px">
			<col width="130px">
			<col width="60px">
			<col width="80px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 검색어</th>
					<td>
						<div class="inputTextCleanDiv"><input class="w98p schColumBorderTextDefault" name="schValue" type="text" placeholder="" style="height:28px !important" autocomplete="false"><div class="inputTextClean"><span>×</span></div></div>
					</td>
				
					<th class="ar">· 재직구분</th>
					<td>
						<select name="eOutYn" class="schColumBorderColorDefault"><option value="A">전체</option><option value="N">재직중</option><option value="Y">퇴직자</option></select>
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
							<!-- a href="#" class="btnSearch btnCreate" title="신규 수주건을 등록 할 수 있습니다."><i class="fa-regular fa-square-plus"></i>&nbsp;&nbsp;신규</a -->
							<a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
							<!-- a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다."><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;삭제</a -->
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
				<col width="150px"> <!-- 이름 -->
				<col width="100px"><!-- 직급 -->
				<!-- col width="150px" --><!-- 전화번호 -->
				<col width="60px"><!-- 관리등급 -->
				<col width="80px"><!-- 접속권한 -->
				<col width="170px"><!-- 아이디 -->
				<col width="80px"><!-- 재직상태 -->
				<col width="250px"><!-- 담당역활 -->
				<col width="auto"><!-- 비고-->
				<col width="150px"><!-- 등록일시 -->
				<col width="50px"><!-- 권한설정 -->
				<col width="50px"><!-- 상세보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="eNm">이름 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="eRank">직급 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<!-- th >전화번호</th -->
					<th >관리여부</th>
					<th >접속권한</th>
					<th >아이디 </th>
					<th>재직상태</th>
					<th>담당분야</th>
					<th >비고 </th>
					<th >등록일시</th>
					<th>권한</th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px">
					<col width="150px"> <!-- 이름 -->
					<col width="100px"><!-- 직급 -->
					<!-- col width="150px" --><!-- 전화번호 -->
					<col width="60px"><!-- 관리등급 -->
					<col width="80px"><!-- 접속권한 -->
					<col width="170px"><!-- 아이디 -->
					<col width="80px"><!-- 재직상태 -->
					<col width="250px"><!-- 담당역활 -->
					<col width="auto"><!-- 비고-->
					<col width="150px"><!-- 등록일시 -->
					<col width="50px"><!-- 권한설정 -->
					<col width="50px"><!-- 상세보기 -->
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
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="eqChoiceDiv">
	<div class="mw_defalut" style="width:500px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">장비선택</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div class="bottonWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
						<caption></caption>
						<colgroup>
							<col width="50%">
							<col width="50%">
						</colgroup>
						<tbody>
							<tr>
								<th>
									<div class="al passwordChange"></div>
								</th>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch employeeApply">적용</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:315px;overflow-y:auto;padding:2px;">
					<div class="searchWrap pt10">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType07 tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="40px">
								<col width="auto">
								<col width="100px">
								<col width="100px">
							</colgroup>
							<thead>
								<tr>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;border-left:0px;">선택</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">장비명</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;">공정</th>
									<th style="background-color:#9ac7e1a3;border:1px solid #9ac7e1;color:#000;border-right:0px !important;">담당자</th>
								</tr>
							</thead>
							<tbody class="eqList">
							</tbody>
						</table>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>			