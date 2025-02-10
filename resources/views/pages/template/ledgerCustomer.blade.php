<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="35px">
			<col width="60px">
			<col width="35px">
			<col width="55px">
			<col width="45px">
			<col width="195px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<th>· 년도</th>
					<td>
							<select name="yyyy" class="schColumBorderColorDefault">
								<option value="2024">2024</option>
							</select>
					</td>
					<th>· 구분</th>
					<td>
							<select name="lKind" class="schColumBorderColorDefault">
								<option value="S" style="color:red;">매출</option>
								<option value="B" style="color:blue;">매입</option>
							</select>
					</td>
					<th>· 업체명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:170px;height:28px !important;" placeholder="" autocomplete="false">
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
						<div class="ar searchWrapBtn">
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt10 mb10 totalSumDiv">
		<table cellpadding="0" cellspacing="0" border="0" summary="" class="commTable f_lt tr_nohover" style="border-top: 2px solid #566981 !important;border-bottom: 2px solid #566981 !important;background:#fff;">
			<caption></caption>
			<colgroup>
			<col width="auto">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.2%">
			<col width="7.3%">
			</colgroup>
			<thead style="">
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">구분</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">1월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">2월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">3월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">4월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">5월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">6월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">7월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">8월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">9월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">10월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">11월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">12월</th>
				<th style="background:#e5e7e9;border-bottom: 1px solid #566981 !important;">합계</th>
			</thead>
			<tbody class="monthTotal">
				<tr>
					<td class="ac">총거래금액</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
				</tr>
				<tr>
					<td class="ac">총결제금액</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
					<td class="ar">0</td>
				</tr>
			</tbody>
		</table>
		<div style="clear:both;"></div>
	</div>
	<div class="mt20 divisionWrap">
		<div class=" f_lt leftSyncDiv" style="width:20%; min-height: 50px;">
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="50%"><!--업체명-->
					<col width="30%"><!--미결제금액-->
					<col width="20%"><!--구분-->
				</colgroup>
				<thead>
					<tr>
						<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
						<th class="sortTd" column="balance"><span class="headBalance">현재 미결제금</span> <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
						<th column="transTotal last">구분 <!-- img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;" --></th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap scrollheightNone" id="" style="">
				<table class="listTbType02Line tr_action dataListTable " style="border: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="50%"><!--업체명-->
						<col width="30%"><!--미결제금액-->
						<col width="20%"><!--구분-->
					</colgroup>
					<tbody class="customerList">
					</tbody>
				</table>
			</div>
		</div>
		<div class=" f_rt rightSyncDiv" style="width: 80%;overflow-y: hidden;">
			<!-- div class="f_lt" style="width: 91%;min-height: 658px;overflow: overlay" -->
				<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="7.6%"><!--1월-->
						<col width="7.6%"><!--2월-->
						<col width="7.6%"><!--3월-->
						<col width="7.6%"><!--4월-->
						<col width="7.6%"><!--5월-->
						<col width="7.6%"><!--6월-->
						<col width="7.6%"><!--7월-->
						<col width="7.6%"><!--8월-->
						<col width="7.6%"><!--9월-->
						<col width="7.6%"><!--10월-->
						<col width="7.6%"><!--11월-->
						<col width="7.6%"><!--12월-->
						<col width="8.7%"><!--합계-->
					</colgroup>
					<thead>
						<tr>
							<th style="border-left:0px !important;">1월</th>
							<th>2월</th>
							<th>3월</th>
							<th>4월</th>
							<th>5월</th>
							<th>6월</th>
							<th>7월</th>
							<th>8월</th>
							<th>9월</th>
							<th>10월</th>
							<th>11월</th>
							<th>12월</th>
							<th class="last">합계</th>
						</tr>
					</thead>
				</table>
				<div class="overflowYListdiv overflowFixWrap " id="" style="width:100%; overflow-x: hidden;"; >
					<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="7.6%"><!--1월-->
							<col width="7.6%"><!--2월-->
							<col width="7.6%"><!--3월-->
							<col width="7.6%"><!--4월-->
							<col width="7.6%"><!--5월-->
							<col width="7.6%"><!--6월-->
							<col width="7.6%"><!--7월-->
							<col width="7.6%"><!--8월-->
							<col width="7.6%"><!--9월-->
							<col width="7.6%"><!--10월-->
							<col width="7.6%"><!--11월-->
							<col width="7.6%"><!--12월-->
							<col width="8.7%"><!--합계-->
						</colgroup>
						<tbody class="customerMonth">
						</tbody>
					</table>
				</div>
			<!-- /div -->
		</div>
		<!-- div class="" style="width:100%;float: left;">
			<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<tbody class="monthTotal">
						</tbody>
					</table>
		</div -->
		<div class="absWrap" style="clear: both;float: left; width:100%;">
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
<template id="transList">
	<div class="mw_defalut ui-draggable" style="width: 1150px; top: 274px; left: 585px;" id="">
		<div class="mw_title ui-draggable-handle" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">상세내역</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap" style="padding: 5px 20px 10px 20px;">
			<div class="mw_contents">
				<div class="searchWrap">
					<div style="height:440px;overflow-y:auto;padding:2px;">
						<div class=" f_lt " style="width:49%; min-height: 50px;">
							<div class="ar mb10 buttonArea " style="height: 20px;">
								<div class="f_rt buttonArea al" style="width:100%">
									<strong style="font-size: 14px;color:#566981;">※ 거래 내역</strong>
								</div>
							</div>
							<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="margin: 0px !important; padding:3px 0;border-bottom:0px;" cellspacing="0" cellpadding="0" summary="">
								<caption></caption>
								<colgroup>
									<col width="15%"><!--일자-->
									<col width="10%"><!--구분-->
									<col width="20%"><!--공급가-->
									<col width="15%"><!--부가세-->
									<col width="20%"><!--총금액-->
									<col width="20%"><!--미결제금-->
								</colgroup>
								<thead>
									<tr>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">일자</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">구분</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">공급가</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">부가세</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">총금액</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;">미결제금</th>
									</tr>
								</thead>
							</table>
							<div class="overflowYListdiv overflowFixWrap " style="height:365px;overflow: overlay;">
								<table class="listTbType02 tr_nohover dataListTable transList tableScrollOnTbody" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
									<colgroup>
										<col width="15%"><!--일자-->
										<col width="10%"><!--구분-->
										<col width="20%"><!--공급가-->
										<col width="15%"><!--부가세-->
										<col width="20%"><!--총금액-->
										<col width="20%"><!--미결제금-->
									</colgroup>
									<tbody></tbody>
									<tfoot>
									</tfoot>
								</table>
							</div>
						</div>
						<div class=" f_rt " style="width:49%; min-height: 50px;">
							<div class="ar mb10 buttonArea " style="height: 20px;">
								<div class="f_rt buttonArea al" style="width:100%">
									<strong style="font-size: 14px;color:#566981;">※ 결제 내역</strong>
								</div>
							</div>
							<table class="listTbType07 tr_nohover payListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="margin: 0px !important; padding:3px 0;border-bottom:0px ;" cellspacing="0" cellpadding="0" summary="">
								<caption></caption>
								<colgroup>
									<col width="15%"><!--일자-->
									<col width="10%"><!--구분-->
									<col width="45%"><!--결제계좌-->
									<col width="20%"><!--결제금-->
									<col width="15%"><!--등록자-->
								</colgroup>
								<thead>
									<tr>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">일자</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">구분</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">결제계좌</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;">결제금</th>
										<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;">등록자</th>
									</tr>
								</thead>
							</table>
							<div class="overflowYListdiv overflowFixWrap noReSize"  style="height:365px;overflow: overlay;">
								<table class="listTbType02 tr_nohover dataListTable payList tableScrollOnTbody" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
									<colgroup>
										<col width="15%"><!--일자-->
										<col width="10%"><!--구분-->
										<col width="45%"><!--결제계좌-->
										<col width="20%"><!--결제금-->
										<col width="15%"><!--등록자-->
									</colgroup>
									<tbody></tbody>
									<tfoot>
									</tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
