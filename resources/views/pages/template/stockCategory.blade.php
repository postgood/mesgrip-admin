<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<!-- div class="searchWrap">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
				<col width="60px">
				<col width="200px">
				<col width="50px">
				<col width="120px">
				<col width="40px">
				<col width="60px">
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
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div -->
	<!-- //searchWrap -->
	<div class="mt20">
		<div class="divisionWrap f_lt leftDiv al" style="width: 49.5%; min-height: 50px;">
			<div style="clear:both;margin-bottom:5px;">
				<span style="display:inline-block;font-size: 14px;font-weight: bold;color:#566981;padding-top: 5px;">▶ 자재분류</span>
				<div class="" style="display:inline-block;float: right;padding-top: 2px;padding-right: 5px;">
					<a href="#" class="btnCreate btnCategoryCreate" title="최상위 분류를 추가 할 수 있습니다." style="padding-top:0px;margin-right:5px;margin-top: -5px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
					<a href="#" class="btnCategoryDelete" title="선택된 건을 삭제 할 수 있습니다." style="padding-top:0px;margin-top: -5px;"><i class="fa-regular fa-trash-can" style="font-size:17px; color:#ea467f"></i></a>
				</div>
			</div>
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px"><!--check-->
					<col width="auto"><!--분류명-->
					<col width="20px"><!--하위생성-->
					<col width="25px"><!--수정-->
					<col width="80px"><!--자재종류량-->
					<col width="150px"><!--비고-->
				</colgroup>
				<thead>
					<tr>
						<th><!-- input type="checkbox" class="vm" name="chckAll" --></th>
						<th colspan="3">분류명</th>
						<th>종류</th>
						<th>비고</th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
					<col width="25px"><!--check-->
					<col width="auto"><!--분류명-->
					<col width="20px"><!--하위생성-->
					<col width="25px"><!--수정-->
					<col width="80px"><!--자재 종류 수-->
					<col width="150px"><!--비고-->
					</colgroup>
					<tbody>
					</tbody>
				</table>
			</div>

			
		</div>
		<div class="divisionWrap f_rt rightDiv al" style="width: 50.4%; "> <!-- min-height: 758px;" -->
		<div style="clear:both;margin-bottom:5px;">
			<span style="display:inline-block;font-size: 14px;font-weight: bold;color:#566981;padding-top: 5px;">▶ 자재 목록</span>
			<div class="" style="display:inline-block;float: right;padding-top: 2px;padding-right: 5px;">
					<a href="#" class="btnCreate btnStockAdd" title="해당 분류에 자재를 등록합니다." style="padding-top:0px;margin-right:5px;margin-top: -5px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
					<a href="#" class="btnStockDelete" title="선택된 건을 삭제 할 수 있습니다." style="padding-top:0px;margin-top: -5px;"><i class="fa-regular fa-trash-can" style="font-size:17px; color:#ea467f"></i></a>
			</div>
		</div>
			<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead orderList"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px"><!--check-->
					<col width="65px"><!--유형-->
					<col width="150px"><!--자재명-->	
					<col width="150px"><!--규격-->
					<col width="70px"><!--자재량-->
					<col width="140px"><!--보관창고-->
					<col width="auto"><!--비고-->
				</colgroup>
				<thead>
					<tr>
						<th><input type="checkbox" class="vm" name="chckAll"></th>
						<th>유형</th>
						<th>자재명</th>
						<th>규격</th>
						<th>재고량</th>
						<th>보관창고</th>
						<th>메모</th>
					</tr>
				</thead>
			</table>
			<div class="overflowYListdiv overflowFixWrap" id="">
				<table class="listTbType02Line tr_action dataListTable " style="border-top: 0px !important;margin-top:-1px; " cellspacing="0" cellpadding="0" summary="">
					<caption></caption>
					<colgroup>
						<col width="25px"><!--check-->
						<col width="65px"><!--유형-->
						<col width="150px"><!--자재명-->	
						<col width="150px"><!--규격-->
						<col width="70px"><!--자재량-->
						<col width="140px"><!--보관창고-->
						<col width="auto"><!--비고-->
					</colgroup>
					<tbody>
						<tr><td colspan="7">데이타가 없습니다.</td></tr>
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
						<input type="hidden" name="orderculumn" value="sNm">
						<input type="hidden" name="orderby" value="ASC">
						<input type="hidden" name="scSeq" value="0">
					</span>
				</div>
			</div>
		</div>

	</div>
	<!-- //영역 Wrap -->
</div>

<template id="stockCategoryViewDiv">
	<div class="mw_defalut" style="width:450px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">분류 등록</span>
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
									<th><div class="ar"><a href="#" class="btnSearch save">등록</a></div></th>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="searchWrap">
						<table class="commonPopTable tr_nohover mb10" border="0" cellspacing="0" cellpadding="0" summary="">
							<caption></caption>
							<colgroup>
							<col width="20%">
							<col width="auto">
							</colgroup>
							<tbody name="rtTbody" class="rtTbody" style="display:">
								<tr>
									<th class="ac">상위 분류</th>
									<td class="parentPath"></td>
								</tr>
								<tr>
									<th class="ac">분류명</th> 
									<td><input type="hidden" name="scParentSeq"><input type="hidden" name="scSeq"><input type="text" name="scNm" class="w100p"></td>
								</tr>								
								<tr>
									<th class="ac">메&nbsp;&nbsp;&nbsp;&nbsp;모</th>
									<td>
										<textarea class="w100p" name="scMemo"></textarea>
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
<template id="categoryStockInsertDiv">
	<div class="mw_defalut" style="width:450px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">자재 등록</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch save">추가</a></div>
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
											<col width="160px"><!--자재명-->
											<col width="auto"><!--규격-->
											<col width="35px"><!--삭제-->
										</colgroup>
										<thead>
											<tr>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">자재명</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;">규&nbsp;&nbsp;&nbsp;&nbsp;격</th>
												<th style="border-bottom: 0px;border-left:1px solid #ccc;border-right:1px solid #ccc !important;"></th>
											</tr>
										</thead>
									</table>
									<div class="overflowYListdiv overflowFixWrap " style="height:120px;overflow: overlay;">
										<table class="listTbType02 tr_nohover dataListTable inoutList" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
											<colgroup>
												<col width="160px"><!--자재명-->
												<col width="auto"><!--규격-->
												<col width="35px"><!--삭제-->
											</colgroup>
											<tbody>
											</tbody>
											<tfoot>
											</tfoot>
										</table>
									</div>
									<table class="listTbType02 tr_nohover stockInfo" id="" style="margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
										<colgroup>
											<col width="160px"><!--자재명-->
											<col width="auto"><!--규격-->
											<col width="35px"><!--삭제-->
										</colgroup>
										<tbody>
											<tr>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<div class="inputTextCleanDiv">	
														<input type="hidden" name="sSeq">
														<input type="text" name="sNm" class="srchIp" style="width:150px;" placeholder="자재명 또는 코드">
														<div class="inputTextClean"><span>×</span></div>
													</div>
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;">
													<input type="text" name="sStandard" class="al readonly" style="width:160px;" readonly="readonly">
												</td>
												<td class="al" style="height:30px;background:#fff;border-left:0px;border-bottom:0px;border-right:0px;padding-top:10px;padding-bottom: 5px;padding-right:0px;"><a href="javascript:void(0);" class="plusbtn"><i class="fa-solid fa-square-plus stockAdd" style="color:#2a51d5;font-size: 18px;"></i></a></td>
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
