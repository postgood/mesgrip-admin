<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="35px">
			<col width="60px">
			<col width="45px">
			<col width="200px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th>· 년도</th>
					<td>
							<select name="yyyy" class="schColumBorderColorDefault"></select>
					</td>
					<th class="ar">· 업체명</th>
					<td>
							<input class=" srchIp schColumBorderTextDefault" name="searchWord" style="width:180px;height:28px !important;" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar searchWrapBtn">
							<span style="margin-right:10px;"> ※ 마감 후 해당년의 매입/매출 원장 및 결제내역은 등록 및 수정이 불가능합니다. </span>
							<a href="#" class="btnSearch btnLedgerFinish" title="마감처리" style="display:none;"><i class="fa-solid fa-lock"></i>&nbsp;&nbsp;마감</a>
							<a href="#" class="btnSearch btnLedgerFinishCancel" title="마감해지" style="display:none;"><i class="fa-solid fa-lock-open"></i>&nbsp;&nbsp;마감해지</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt10 mb10 totalSumDiv">
		<table cellpadding="0" cellspacing="0" border="0" summary="" class="commTable f_lt tr_nohover" style="width:48.5%;border-top:0 !important;background:#fff;">
			<caption></caption>
			<colgroup>
			<col width="50px">
			<col width="55px">
			<col width="55px">
			<col width="auto">
			<col width="55px">
			<col width="auto">
			<col width="65px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th rowspan="2" class="ac" style="color:red !important;border-top:1px solid #ff135f !important;font-size: 12px;">매출</th>
					<th class="yearPrev" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #ff135f !important;">전년</th>
					<th class="" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #ff135f !important;">총매출</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="lfAmountSaleTransPrev">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #ff135f !important;letter-spacing:-1px;">수금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="lfAmountSalePayPrev">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #ff135f !important;letter-spacing:-1px;">미수금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="lfAmountSaleBalancePrev">0</strong></td>
				</tr>
				<tr>
					<th class="yearNow" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #ff135f !important;">금년</th>
					<th class="" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #ff135f !important;">총매출</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="lfAmountSaleTrans">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #ff135f !important;letter-spacing:-1px;">수금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="lfAmountSalePay">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #ff135f !important;letter-spacing:-1px;">미수금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #ff135f !important;"><strong class="lfAmountSaleBalance">0</strong></td>
				</tr>
			</tbody>
		</table>
			<table cellpadding="0" cellspacing="0" border="0" summary="" class="commTable f_rt tr_nohover" style="width:48.5%;border-top:0 !important;background:#fff;">
			<caption></caption>
			<colgroup>
			<col width="50px">
			<col width="55px">
			<col width="55px">
			<col width="auto">
			<col width="55px">
			<col width="auto">
			<col width="65px">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th rowspan="2" class="ac" style="color:blue !important;padding:0 !important;border-top:1px solid #1379ff !important;font-size: 12px;">매입</th>
					<th class="yearPrev" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #1379ff !important;">전년</th>
					<th class="" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #1379ff !important;">총매입</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #1379ff !important;"><strong class="lfAmountBuyTransPrev">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #1379ff !important;letter-spacing:-1px;">지급금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #1379ff !important;"><strong class="lfAmountBuyPayPrev">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #1379ff !important;">미지급금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #1379ff !important;"><strong class="lfAmountBuyBalancePrev">0</strong></td>
				</tr>
				<tr>
					<th class="yearNow" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #1379ff !important;">금년</th>
					<th class="" style="font-size:11px;letter-spacing:-1px;border-top:1px solid #1379ff !important;">총매입</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #1379ff !important;"><strong class="lfAmountBuyTrans">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #1379ff !important;letter-spacing:-1px;">지급금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #1379ff !important;"><strong class="lfAmountBuyPay">0</strong></td>
					<th class="" style="font-size:11px;border-top:1px solid #1379ff !important;">미지급금</th>
					<td class="ar pr5" style="font-size:12px;border-top:1px solid #1379ff !important;"><strong class="lfAmountBuyBalance">0</strong></td>
				</tr>
			</tbody>
		</table>
		
		<div style="clear:both;"></div>
	</div>
	<div class="mt20">
		<!-- div class="ar mb10 buttonArea">
			<a href="javascript:;" class="btnStyle04 addCustomer" style="display: ">추가</a>
			<a href="javascript:;" class="btnStyle04 saveCustomer">저장</a>
			<a href="javascript:;" class="btnStyle05 deleteCustomer">삭제</a>
		</div -->
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="auto"><!--거래처-->
					<col width="120px"><!--전년 매출거래금액-->
					<col width="120px"><!--전년 수금액-->
					<col width="120px"><!--전년 미수금-->
					<col width="120px"><!--전년 매입거래금액-->
					<col width="120px"><!--전년 지금금-->
					<col width="120px"><!--전년 미지급금-->
					<col width="120px"><!--금년 매출거래금액-->
					<col width="120px"><!--금년 수금액-->
					<col width="120px"><!--금년 미수금-->
					<col width="120px"><!--금년 매입거래금액-->
					<col width="120px"><!--금년 지금금-->
					<col width="120px"><!--금년 미지급금-->
				</colgroup>
				<thead>
					<tr>
						<th rowspan="3" style="border-right:0px;" class="sortTd" column="cuNm">거래처 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
						<th colspan="6" class="yearPrev" style="border-left:0px;border-right:0px;">전년</th>
						<th colspan="6" class="yearNow" style="border-left:0px;color:#fffb38;">금년</th>
					</tr>
					<tr>
						<th colspan="3" style="background:#f94680;border-left:0px;border-bottom:1px solid #a11f49;border-right:0px solid #a11f49;border-top:1px solid #566981;">매출</th>
						<th colspan="3" style="background:#4e80ee;border-left:0px;border-bottom:1px solid #2b558d;border-right:1px solid #566981;border-top:1px solid #566981;">매입</th>
						<th colspan="3" style="background:#f94680;border-left:0px;border-bottom:1px solid #a11f49;border-right:0px solid #a11f49;border-top:1px solid #566981;">매출</th>
						<th colspan="3" style="background:#4e80ee;border-left:0px;border-bottom:1px solid #2b558d;border-right:0px solid #3f76bf;border-top:1px solid #566981;">매입</th>

					</tr>
					<tr>
						<th style="background:#f94680;border-bottom:1px solid #f94680;border-right:1px solid #a11f49;border-left:0px solid #566981;">거래금액</th>
						<th style="background:#f94680;border-bottom:1px solid #f94680;border-right:1px solid #a11f49;">수금</th>
						<th style="background:#f94680;border-bottom:1px solid #f94680;border-right:0px solid #a11f49;">잔액</th>
						<th style="background:#4e80ee;border-bottom:1px solid #4e80ee;border-right:1px solid #2b558d;border-left:0px;">거래금액</th>
						<th style="background:#4e80ee;border-bottom:1px solid #4e80ee;border-right:1px solid #2b558d;">지급금</th>
						<th style="background:#4e80ee;border-bottom:1px solid #4e80ee;border-right:1px solid #566981;">잔액</th>
						<th style="background:#f94680;border-bottom:1px solid #f94680;border-right:0px solid #a11f49;border-left:0px solid #566981;">거래금액</th>
						<th style="background:#f94680;border-bottom:1px solid #f94680;border-right:1px solid #a11f49;border-left:1px solid #a11f49;">수금</th>
						<th style="background:#f94680;border-bottom:1px solid #f94680;border-right:0px solid #a11f49;">잔액</th>
						<th style="background:#4e80ee;border-bottom:1px solid #4e80ee;border-right:1px solid #2b558d;border-left:0px;">거래금액</th>
						<th style="background:#4e80ee;border-bottom:1px solid #4e80ee;border-right:1px solid #2b558d;">지급금</th>
						<th style="background:#4e80ee;border-bottom:1px solid #4e80ee;border-right:0px solid #2b558d;">잔액</th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="auto"><!--거래처-->
						<col width="120px"><!--전년 매출거래금액-->
						<col width="120px"><!--전년 수금액-->
						<col width="120px"><!--전년 미수금-->
						<col width="120px"><!--전년 매입거래금액-->
						<col width="120px"><!--전년 지금금-->
						<col width="120px"><!--전년 미지급금-->
						<col width="120px"><!--금년 매출거래금액-->
						<col width="120px"><!--금년 수금액-->
						<col width="120px"><!--금년 미수금-->
						<col width="120px"><!--금년 매입거래금액-->
						<col width="120px"><!--금년 지금금-->
						<col width="120px"><!--금년 미지급금-->
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
<template id="ledgerFinishInsert">		
	<div class="mw_defalut" style="width:350px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">마감</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:215px;overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th><div class="ar"><a href="#" class="btnSearch save">마감</a></div></th>
								</tr>
							</tbody>
						</table>
					</div>
				<div class="searchWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10">
						<caption></caption>
						<colgroup>
							<col width="35%">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac">년&nbsp;&nbsp;&nbsp;&nbsp;도</th>
								<td class="al yeraFinish"></td>
							</tr>
							<tr>
								<th class="ac">마감자</th>
								<td class="al eNm"></td>
							</tr>
							<tr>
								<th class="ac">비밀번호</th>
								<td class="al">
									<input type="text" class="w98p" name="lfPassword" placeholder="5자리 이상" >
									<div class="inputTextClean"><span>×</span></div>
								</td>
							</tr>
							<tr>
								<th class="ac">비밀번호 확인</th>
								<td class="al">
									<input type="text" class="w98p" name="lfPassword2" placeholder="5자리 이상" >
									<div class="inputTextClean"><span>×</span></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="ledgerFinishCancel">		
	<div class="mw_defalut" style="width:350px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">마감해지</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:210px;overflow-y:auto;padding:2px;">
					<div class="bottonWrap">
						<table cellpadding="0" cellspacing="0" border="0" summary="" class="noBdrTb tr_nohover">
							<caption></caption>
							<colgroup>
								<col width="auto">
							</colgroup>
							<tbody>
								<tr>
									<th><div class="ar"><a href="#" class="btnSearch save">마감해지</a></div></th>
								</tr>
							</tbody>
						</table>
					</div>
				<div class="searchWrap">
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10">
						<caption></caption>
						<colgroup>
							<col width="30%">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr>
								<th class="ac">년&nbsp;&nbsp;&nbsp;&nbsp;도</th>
								<td class="al yeraFinish"></td>
							</tr>
							<tr>
								<th class="ac">마감자</th>
								<td class="al eNm"></td>
							</tr>
							<tr>
								<th class="ac">마감일자</th>
								<td class="al creDate"></td>
							</tr>
							<tr>
								<th class="ac">비밀번호</th>
								<td class="al"><input type="text" class="w100p" name="lfPassword"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>