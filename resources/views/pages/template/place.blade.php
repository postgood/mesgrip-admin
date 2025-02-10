<div id="CI00000005">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>장비관리</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="cpNm">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<!-- col width="40px">
			<col width="70px">
			<col width="45px">
			<col width="70px" -->
			<col width="50px">
			<col width="195px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 공장명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="searchColumn" type="hidden" value="cpNm">
							<input style="width:170px;height:28px !important;" class="schColumBorderTextDefault" name="searchWord" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
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
				<col width="auto">
				<col width="35%">
				<col width="20%">
				<col width="5%">
				<col width="10%">
				<col width="5%">
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="eqNm">공장명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th >주소 </th>
					<th >전화번호 </th>
					<th class="sortTd" column="useYn">사용여부 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
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
					<col width="auto">
					<col width="35%">
					<col width="20%">
					<col width="5%">
					<col width="10%">
					<col width="5%">
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


<template id="placeDiv">
	<div class="mw_defalut" style="width:520px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">공장 등록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div class="bottonWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
						<caption></caption>
						<colgroup>
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">저장</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="searchWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover mb10">
						<caption></caption>
						<colgroup>
							<col width="60px">
							<col width="auto">
							<col width="60px">
							<col width="50px">
							<col width="60px">
							<col width="70px">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac"><span style="color:red;">*</span> 공장명</th>
								<td colspan="5">
									<div class="inputTextCleanDiv">
										<input type="text" name="cpNm" style="width:390px;" requiremsg="공장명">
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
								
							</tr>
							<tr>
								<th class="ac">전화번호</th>
								<td class=""><div class="inputTextCleanDiv"><input type="text" name="cpTel" style="width:150px;" ><div class="inputTextClean"><span>×</span></div></div>
								<th class="ac">순&nbsp;&nbsp;&nbsp;&nbsp;서</th>
								<td ><input name="sort" type="text" style="width:40px;"></td>						
								<th class="ac">사용여부</th>
								<td class="ar"><select name="useYn"><option value="Y">사용중</option><option value="N">미사용</option></select></td>						

							</tr>
							
							<tr>
								<th class="ac">주&nbsp;&nbsp;&nbsp;&nbsp;소</th>
								<td colspan="5">
										<input name="cpZipcode" class="mr5 readonly" type="text" style="width:40px;" readonly="readonly" placeholder="우편번호">
										<input name="cpAddr" type="text" class="readonly" style="width:160px;" placeholder="기본 주소" readonly="readonly">
										<div class="inputTextCleanDiv">
										<input type="text" name="cpAddrDetail" style="width:160px;" placeholder="상세 주소" >
										<div class="inputTextClean"><span>×</span></div></div>
										<i class="fa-solid fa-location-dot cursorPointer f_rt" style="font-size:15px;margin:5px 5px;color: #81b1cd;" title="주소 검색" tabindex="12"></i>
								</td>
							</tr>
							<tr>
								<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
								<td colspan="5"><textarea name="eqMemo" class="w100p" rows="3"></textarea></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="employeeView">
	<div class="mw_defalut" style="width:700px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">직원 선택</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div class="bottonWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
						<caption></caption>
						<colgroup>
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th>
									<div class="ar"><a href="javascript:void(0);" class="btnSearch applySave">배정완료</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
				<table border="0" class="tr_nohover mb10" style="width:100%;">
					<caption></caption>
					<colgroup>
						<col width="45%">
						<col width="10%">
						<col width="45%">
					</colgroup>
					<thead>
						<tr>
							<td class="ac">직원목록</td>
							<td></td>
							<td class="last ac">담당직원</td>
						</tr>
					</thead>
					<tbody>
						<td style="vertical-align: top;background: #fff;">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="40%">
									<col width="40%">
									<col width="20%">
								</colgroup>
								<thead>
									<tr>
										<th>직원명</th>
										<th>직급</th>
										<th class="last">선택</th>
									</tr>
								</thead>
							</table>
							<div style="width:100%;height:300px;overflow-y:auto;">
									<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover">
										<caption></caption>
										<colgroup>
											<col width="40%">
											<col width="40%">
											<col width="20%">
										</colgroup>
										<tbody class="employeeList">
										</tbody>
									</table>
							</div>
						</td>
						<td></td>
						<td style="vertical-align: top;background: #fff;">
							<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover">
								<caption></caption>
								<colgroup>
									<col width="15%">
									<col width="35%">
									<col width="30%">
									<col width="20%">
								</colgroup>
								<thead>
									<tr>
										<th>순위</th>
										<th>직원명</th>
										<th>직급</th>
										<th class="last">선택</th>
									</tr>
								</thead>
							</table>
							<div style="width:100%;height:300px;overflow-y:auto;">
								<table cellpadding="0" cellspacing="0" border="0" summary="" class="listTbType02 tr_nohover">
									<caption></caption>
									<colgroup>
										<col width="15%">
										<col width="35%">
										<col width="30%">
										<col width="20%">
									</colgroup>
									<tbody class="takeChargeList">
									</tbody>
								</table>
							</div>
						</td>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>		
