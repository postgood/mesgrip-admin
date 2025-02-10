<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrap">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
				<col width="55px">
				<col width="200px">
				<col width="45px">
				<col width="120px">
				<col width="35px">
				<col width="75px">
				<col width="40px">
				<col width="120px">
				<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th>· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<th>· 업체명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="cuSeq" type="hidden">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:110px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th>· 구분</th>
					<td>
						<select name="lKind" class="schColumBorderColorDefault">
							<option value="S" style="color:red;background:#fbe2e2;">매출</option>
							<option value="B" style="color:blue;background:#bfd3ee;">매입</option>
						</select>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar searchWrapBtn">
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<!-- a href="#" class="btnSearch btnPayCreate" title="결재(수금/지급)를 등록합니다."><i class="fa-solid fa-won-sign"></i>&nbsp;&nbsp;결제등록</a -->
							<!-- a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다."><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;삭제</a -->
							 <!-- a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다."><i class="fa-regular fa-square-plus"></i>&nbsp;&nbsp;신규</a -->
							<a href="#" class="btnSearch btnCreate btnPayCreate" title="결재(수금/지급)를 등록합니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt20">
		<div class="divisionWrap f_lt leftDiv al" style="width: 49.5%; min-height: 50px;">
			<div style="clear:both;margin-bottom:5px;">
				<span style="display:inline-block;font-size: 14px;font-weight: bold;color:#566981;padding-top: 5px;">▶ 거래처 결제집계</span>
				<span class="" style="display:inline-block;float: right;padding-top: 5px;"> 총 미결제금액 : <strong class="totalBalance"></strong></span>
			</div>
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<!-- col width="25px" --><!--check-->
					<col width="auto"><!--업체명-->
					<col width="120px"><!--전기이월금-->
					<col width="120px"><!--결제금액-->
					<col width="150px"><!--합계-->
					<!-- col width="40px" --><!--내역보기-->
				</colgroup>
				<thead>
					<tr>
						<!-- th><input type="checkbox" class="vm" name="chckAll"></th -->
						<th>업체명</th>
						<th style="color:#FAF4C0;" title="마감처리 기준 미결제금액">전기 이월금액</th>
						<th title="금년 총 결제금액">결제금액</th>
						<th>현잔액</th>
						<!-- th>내역</th -->
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
					<!-- col width="25px" --><!--check-->
					<col width="auto"><!--업체명-->
					<col width="120px"><!--전기이월금-->
					<col width="120px"><!--결제금-->
					<col width="150px"><!--합계-->
					<!-- col width="40px" --><!--내역보기-->
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

			<!-- table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px">
					<col width="auto">
					<col width="120px">
					<col width="120px">
					<col width="150px">
				</colgroup>
				<thead>
					<tr>
						<th><input type="checkbox" class="vm" name="chckAll"></th>
						<th>미수금</th>
						<th>미수금</th>
						<th>미지급금</th>
						<th>합계</th>
						
					</tr>
				</thead>
			</table -->
		</div>
		<div class="divisionWrap f_rt rightDiv al" style="width: 50.4%; "> <!-- min-height: 758px;" -->
			<div style="clear:both;margin-bottom:5px;">
				<span style="display:inline-block;font-size: 14px;font-weight: bold;color:#566981;padding-top: 5px;">▶ 결제내역</span>
				<span class="" style="display:inline-block;float: right;padding-top: 5px;">총 결제금액 : <strong class="totalPay"></strong></span>
			</div>
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px"><!--check-->
					<col width="80px"><!--일자-->	
					<col width="50px"><!--구분-->
					<col width="150px"><!--업체명-->
					<col width="120px"><!--결제금액-->
					<col width="170px"><!--계좌-->
					<col width="80px"><!--등록자-->
					<col width="auto"><!--비고-->
					<col width="40px"><!--보기-->
				</colgroup>
				<thead>
					<tr>
						<th><input type="checkbox" class="vm" name="chckAll"></th>
						<th>일자</th>
						<th>구분</th>
						<th>업체명</th>
						<th>결제금액</th>
						<th>계좌</th>
						<th>등록자</th>
						<th>비고</th>
						<th>보기</th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
					<col width="25px"><!--check-->
					<col width="80px"><!--일자-->
					<col width="50px"><!--구분-->
					<col width="150px"><!--업체명-->
					<col width="120px"><!--결제금액-->
					<col width="170px"><!--계좌-->
					<col width="80px"><!--등록자-->
					<col width="auto"><!--비고-->
					<col width="40px"><!--보기-->
					</colgroup>
					<tbody>
					</tbody>
				</table>
			</div>
			<div class="absWrap">
				<div class="pageInfoTfoot" style="position:relative;margin-top:10px;">
					<span style="position:absolute;top:0px;left:5px;">
						<select name="rightRowsPerPage" class="vm">

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
						<input type="hidden" name="rightPage" style="width:40px;text-align:center;" inputType=comma>
					</span>
				</div>
			</div>
		</div>

	</div>
	<!-- //영역 Wrap -->
</div>

<!-- template id="workDetail">
	<div class="divisionWrap" style="min-height: 150px">
		<table class="workTable tr_nohover" border="0" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
			<col width="10%">
			<col width="23%">
			<col width="10%">
			<col width="23%">
			<col width="10%">
			<col width="24%">
			</colgroup>
			<tbody name="rtTbody" class="rtTbody" style="display:">
			<input name="cSeq" type="hidden" require="" value="">
				<tr>
					<th>작업명</th>
					<td></td>
					<th>상태</th>
					<td></td>
					<th>상태일시</th>
					<td></td>
				</tr>
				<tr>
					<th>완료수량</th>
					<td></td>
					<th>단가</th>
					<td></td>
					<th>금액</th>
					<td></td>
				</tr>
				<tr>
					<th>비고</th>
					<td colspan="5"></td>
				</tr>
				<tr>
					<th>작업메모</th>
					<td colspan="5"></td>
				</tr>
				<tr>
					<th class="ac" colspan="6">수주 세부사항</th>
				</tr>
				<tr>
					<td colspan="6"></th>
				</tr>
				<tr>
					<th class="ac" colspan="6">작업 세부사항</th>
				</tr>
				<tr>
					<td colspan="6"></th>
				</tr>
				
			</tbody>
		</table>
	</div>
</template -->
<template id="payInsert">
	<div class="mw_defalut" style="width:450px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">결제 등록</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:295px;overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th><div class="ar"><a href="#" class="btnSearch save">등록</a></div></th>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="searchWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10">
							<caption></caption>
							<colgroup>
								<col width="18%">
								<col width="auto">
								<col width="18%">
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th class="ac">구&nbsp;&nbsp;&nbsp;&nbsp;분</th>
									<td class="al"><select name="lpKind"><option value="I" selected>수금</option><option value="O">지급</option></select></td>
									<th class="ac">일&nbsp;&nbsp;&nbsp;&nbsp;자</th>
									<td class="al"><input class="date crdrIp" type="text" name="lpDt" placeholder="날짜 선택" readonly></td>
								</tr>
								<tr>
									<th class="ac">거래처</th>
									<td class="al" colspan="3">
										<div class="inputTextCleanDiv">
											<input type="hidden" name="cuSeq">
											<input class="srchIp" type="text" name="cuNm" style="width:300px;" placeholder="거래처">
											<div class="inputTextClean"><span>×</span></div>
										</div>
									</td>
								</tr>
								<tr>
									<th class="ac">결제계좌</th>
									<td class="al" colspan="3"><select name="caSeq" style="width:300px;"><option value="">계좌선택</option></select></td>
								</tr>
								<tr>
									<th class="ac">금&nbsp;&nbsp;&nbsp;&nbsp;액</th>
									<td class="al" colspan="3"><input class="ar w95p" type="text" name="lpAmount" placeholder="결제금"  value="0"> 원</td>
								</tr>								
								<tr>
									<th class="ac">비&nbsp;&nbsp;&nbsp;&nbsp;고</th>
									<td class="al" colspan="3"><textarea name="lpMemo" style="width:300px;" rows="2"></textarea></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>		