<div id="CI00000005">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>장비관리</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="sNm">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="40px">
			<col width="60px">
			<col width="50px">
			<col width="150px">
			<col width="60px">
			<col width="80px">
			<col width="40px">
			<col width="70px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			<col width="200px">
			</colgroup>
			<tbody>
				<tr>
					<th>· 년도</th>
					<td>
							<select name="yyyy" class="schColumBorderColorDefault"></select>
					</td>
					<th class="ar">· 물품명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input name="searchColumn" type="hidden" value="sNm">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:145px;height:28px !important;" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar">· 저장소명</th>
					<td>
						<select name="cpSeq" class="w100p schColumBorderColorDefault"><option value="">전체</option></select>
					</td>
					<th class="ar">· 분류</th>
					<td>
						<select name="skCd" class="schColumBorderColorDefault"><option value="">전체</option><option value="S">자재</option><option value="P">제품</option></select>
					</td>
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<strong>총 재고자산액 : <span class="totalPrice">0</span>원</strong>
						</div>
					</td>
					<td>
						
						<div class="ar">
							<a href="#" class="btnSearch btnAdjust" title="재고 수량을 조정할수 있습니다." style=""><i class="fa-solid fa-pen"></i> 재고조정</a>
							<a href="#" class="btnSearch btnStockFinish" title="마감처리" style="display:;"><i class="fa-solid fa-lock"></i>&nbsp;&nbsp;마감</a>
							<a href="#" class="btnSearch btnStockFinishCancel" title="마감해지" style="display:none;"><i class="fa-solid fa-lock-open"></i>&nbsp;&nbsp;마감해지</a>
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
				<col width="60px"><!-- 주요자재여부 -->
				<col width="auto"><!-- 자재명 -->
				<col width="200px"><!-- 규격 -->
				<col width="100px"><!-- 재고량 -->
				<col width="150px"><!-- 평귱금액 -->
				<col width="200px"><!-- 총금액 -->
				<col width="200px"><!-- 저장소 -->
				<col width="100px"><!-- 저장소 수량 -->
				<col width="70px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th>주요</th>
					<th class="sortTd" column="sNm">자재명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>규격</th>
					<th class="sortTd" column="sfcCnt">총재고 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sfcPrice">평균단가 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="sTotalPrice">총금액 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th>보관창고</th>
					<th>수량</th>
					<th class="last">마감여부</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="60px"><!-- 주요자재여부 -->	
					<col width="auto"><!-- 자재명 -->
					<col width="200px"><!-- 규격 -->
					<col width="100px"><!-- 재고량 -->
					<col width="150px"><!-- 평귱금액 -->
					<col width="200px"><!-- 총금액 -->
					<col width="200px"><!-- 저장소 -->
					<col width="100px"><!-- 저장소 수량 -->
					<col width="70px"><!-- 보기 -->
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
					<a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;";></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>


<template id="stockAdjustDiv">
	<div class="mw_defalut" style="width:650px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">재고 조정</span>
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
					<table cellpadding="0" cellspacing="0" border="0" summary="" class="commonPopTable tr_nohover mb10">
						<caption></caption>
						<colgroup>
							<col width="70px">
							<col width="auto">
							<col width="70px">
							<col width="auto">
						</colgroup>
						<tbody>
							<tr class="placeArae">
								<td colspan="4">
									<table class="listTbType07 tr_nohover transListHeard tablScrollDisplay dataHeadTable scrollTbThead" id="" style="padding: 3px 0px; border-bottom: 0px; margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
										<caption></caption>
										<colgroup>
											<col width="25%"><!--자재명-->
											<col width="20%"><!--규격-->
											<col width="auto"><!--보관창고-->
											<col width="10%"><!--현재수량-->
											<col width="5%"><!---->
											<col width="10%"><!--실제정수량-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">보관창고</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:0px;" title="재고관리상 재고량">현재고량</th>
												<th style="border-bottom: 0px;border-left:0px;border-right:0px;"></th>
												<th style="border-bottom: 0px;border-left:0px;" title="창고 실 재고량">실재고량</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;"></th>
											</tr>
										</thead>
									</table>
									<div class="overflowYListdiv overflowFixWrap " style="height:120px;overflow: overlay;">
										<table class="listTbType02 tr_nohover dataListTable inoutList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
											<colgroup>
												<col width="25%"><!--자재명-->
												<col width="20%"><!--자재명-->
												<col width="auto"><!--보관창고-->
												<col width="10%"><!--현재수량-->
												<col width="5%"><!---->
												<col width="10%"><!--실제정수량-->
												<col width="5%"><!--삭제-->
											</colgroup>
											<tbody>
											</tbody>
										</table>
									</div>
									<table class="listTbType02 tr_nohover inoutInfo" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
										<colgroup>
											<col width="25%"><!--자재명-->
											<col width="20%"><!--자재명-->
											<col width="auto"><!--보관창고-->
											<col width="10%"><!--현재수량-->
											<col width="5%"><!---->
											<col width="10%"><!--실제정수량-->
											<col width="5%"><!--삭제-->
										</colgroup>
										<tbody class="finishPlaceInfo">
											<tr>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<div class="inputTextCleanDiv">	
														<input type="hidden" name="sSeq">
														<input type="text" name="sNm" class="w97p srchIp" placeholder="자재명">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<input type="text" name="sStandard" class="al readonly" style="width:105px;" readonly="readonly">
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<select name="cpSeq" class="w100p"></select>
												</td>
												<td class="ar splCnt" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<input type="text" name="splCnt" class="ar readonly" style="width:55px;" readonly="readonly">
												</td>
												<td class="ar" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">▶</td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<div class="inputTextCleanDiv">	
														<input type="text" name="splRealCnt" class="ar" style="width:55px;" placeholder="실재고량">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="ac" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus" style="color:#2a51d5;font-size: 18px;"></i></a></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<template id="stockFinishInsert">		
	<div class="mw_defalut" style="width:350px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">마감</span>
				<a href="javascript:void(0);" class="close_layer btnClosePopLayer"><img src="/images/btn/btn_mw_close.png" alt="레이어 닫기"></a>
			</h1>
		</div>
		<div class="mw_ctWrap">
			<div class="mw_contents">
				<div style="height:220px;overflow-y:auto;padding:2px;">
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
									<div class="inputTextCleanDiv">
										<input type="password" style="width:160px;" name="sfPassword" placeholder="5자리 이상" >
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
							</tr>
							<tr>
								<th class="ac">비밀번호 확인</th>
								<td class="al">
									<div class="inputTextCleanDiv">
										<input type="password" style="width:160px;" name="sfPassword2" placeholder="5자리 이상" >
										<div class="inputTextClean"><span>×</span></div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="stockFinishCancel">		
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
								<td class="al"><input type="password" class="w100p" name="sfPassword"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>