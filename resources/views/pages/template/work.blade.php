<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="sort">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<!--col width="55px">
			<col width="200px" -->
			<col width="35px">
			<col width="75px">
			<col width="35px">
			<col width="75px">
			<col width="470px">
			<col width="45px">
			<col width="110px">
			<col width="45px">
			<col width="65px">
			<col width="25px">
			<col width="70px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<!-- th class="ar">· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td -->
					<th class="ar">· 공장</th>
					<td>
							<select name="cpSeq" class="schColumBorderColorPlace w100p">
								<option value="">전체공장</option>
							</select>
					</td>
					<th class="ar">· 공정</th>
					<td>
						<select name="spSeq" class="schColumBorderColorProcesss w100p"></select>
					</td>
					<!-- th class="ar">· 작업상태</th -->
					<td calss="ac" style="padding-left:0px;">
						<table style="border:0px;margin-left:10px;margin-right:5px;">
							<colgroup>
								<col width="30px">
								<col width="20px">
								<col width="35px">
								<col width="20px">
								<col width="35px">
								<col width="20px">
								<col width="35px">
								<col width="20px">
								<col width="35px">
								<col width="220px">
								<col width="20px">
							</colgrop>
							<tbody>
								<td style="padding-left:10px;padding-right:0px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
								<td><input type="checkbox" name="wStatus" value="A" checked></td>
								<td style="padding-left:2px;">대기</td>
								<td><input type="checkbox" name="wStatus" value="B" checked></td>
								<td style="padding-left:2px;">진행</td>
								<td><input type="checkbox" name="wStatus" value="C"></td>
								<td style="padding-left:2px;">중지</td>
								<td><input type="checkbox" name="wStatus" value="D"></td>
								<td style="padding-left:2px;">완료</td>
								<td style="padding-left: 0px;">
									<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
									<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
								</td>
								<td style="padding-left:15px;padding-right:0px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
							</tbody>
						</table>
					</td>
					<th class="ar">· 검색어</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="schColumBorderTextDefault" style="width:105px;height:28px !important;" name="searchWord" type="text" placeholder="업체명, 품명" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<th class="ar">· 작업자</th>
					<td>
							<select name="wESeq" class="schColumBorderColorEmployee"><option value="">전직원</option><option value="NO" class="unChoice">미지정</option></select>
					</td>
					<td class="ar">
							<input type="checkbox" name="onlyToday" value="Y">
					</td>
					<td class="al">
							<strong style="margin-bottom:5px;" title="오늘 작업건만 볼 수 있습니다.">금일작업</strong>
					</td>
					<!-- td class="ar">
							<input type="checkbox" name="finishYn" value="Y">
					</td>
					<td class="al">
							<strong style="margin-bottom:5px;" title="오늘 작업건만 볼 수 있습니다.">완료작업 포함</strong>
					</td -->
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar searchWrapBtn">
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<a href="#" class="btnSearch2 btnStopCall" title="진행중인 작업을 중지할 수 있습니다."><i class="fa-solid fa-pause"></i><!--span>Ⅱ</span -->&nbsp;&nbsp;중지</a>
							<a href="#" class="btnSearch btnStatusUpdate" title="작업 상태를 변경 할 수 있습니다."><i class="fa-solid fa-arrow-rotate-left" style="font-size: 13px;"></i>&nbsp;&nbsp;대기</a>
							<!-- a href="#" class="btnSearch btnTodaySetting" title="오늘 작업량을 설정할 수 있습니다."><i class="fa-solid fa-calendar-day"></i>&nbsp;&nbsp;금일작업</a -->
							<a href="#" class="btnSearch btnSortSetting" title="선택된 작업 순서를 변경할 수 있습니다."><i class="fa-solid fa-sort"></i>&nbsp;&nbsp;순서변경</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt20">
		<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable workListTableHead scrollTbThead"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
				<col width="25px"><!--작업지시서-->
				<col width="45px"><!--입고여부-->
				<col width="110px"><!--업체명-->
				<col width="17px"><!--파일-->
				<col width="240px"><!--파일명-->
				<col width="65px"><!--규격-->
				<col width="65px"><!--주문수량-->
				<col width="140px" class=""><!--공정흐름-->
				<col width="70px" class="spNm"><!--공정명-->
				<col width="80px" class="eqNm"><!--장비명-->
				<col width="15px" class="upDown"><!--순서 변경 핸들러-->
				<col width="30px"><!--No-->
				<col width="20px"><!--체크박스-->
				<col width="60px"><!--상태-->
				<col width="40px"><!--면-->
				<col width="105px"><!--작업명-->
				<col width="60px"><!--작업자-->
				<col width="65px"><!--완료수량-->
				<col width="auto"><!--세부사항-->
				<col width="100px"><!--전달사항-->
				<col width="50px"><!--주문일-->
				<col width="0px"><!--출고메모-->
				<col width="100px"><!--출고메모-->
				<col width="30px"><!--상세보기-->
			</colgroup>
			<thead>
				<!-- tr>
					<th ><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i></th>
					<th column="">입/출 </th>
					<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="oFileNm">품명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="oPaperSize" class="sortTd">규격 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="oCnt">주문수량 </th>
					<th>공정흐름 </th>
					<th column="spNm" class="spNm">공정 </th>
					<th column="eqNm" class="eqNm">장비명</th>
					<th colspan="3">No</th>
					<th>상태 </th>
					<th column="wFrontYn">면 </th>
					<th column="wNm">작업명 </th>
					<th column="wENm">작업자 </th>
					<th column="wEndCnt">완료수량 </th>
					<th column="istInNm">세부사항 </th>
					<th column="istOutNm">전달사항</th>
					<th column="creDate">주문일 </th>
					<th class="last">기록</th>
				</tr  -->
				<tr>
					<th rowspan="2" ><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th rowspan="2" column="">입/출 </th>
					<th rowspan="2" class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" style="cursor:pointer;"></th>
					<th rowspan="2" colspan="2" class="sortTd" column="oFileNm">품명 <img src="/images/btn/btn_sort2.png" alt="" style="cursor:pointer;"></th>
					<th rowspan="2" column="oPaperSize" class="sortTd">규격 <img src="/images/btn/btn_sort2.png" alt="" style="cursor:pointer;"></th>
					<th rowspan="2" column="oCnt">주문량 </th>
					<th rowspan="2" style="border-right:0px;">생산공정</th>
					<th colspan="12" class="workThead" style="border-left:0px; border-right:0px;">작업상세 </th>
					<!-- th column="spNm" class="spNm">공정 </th>
					<th column="eqNm" class="eqNm">장비명</th>
					<th colspan="3">No</th>
					<th>상태 </th>
					<th column="wFrontYn">면 </th>
					<th column="wNm">작업명 </th>
					<th column="wENm">작업자 </th>
					<th column="wEndCnt">완료수량 </th>
					<th column="istInNm">세부사항 </th>
					<th column="istOutNm">전달사항</th> -->
					<th rowspan="2" style="border-left:0px;border-right:0px;"></th>
					<th rowspan="2" class="last" style="border-left:0px;">출고메모</th>
					<th rowspan="2" class="last" style="border-left:0px;">현장<br/>기록</th>
				</tr>
				<tr>
					<th column="spNm" class="spNm dashboardWorkTd1">공정 </th>
					<th column="eqNm" class="eqNm dashboardWorkTd1">장비명</th>
					<th colspan="3" class="dashboardWorkTd1">No</th>
					<th class="dashboardWorkTd1">상태 </th>
					<th class="dashboardWorkTd2" column="wFrontYn">면 </th>
					<th class="dashboardWorkTd2" column="wNm">작업명 </th>
					<th class="dashboardWorkTd2" column="wENm">작업자 </th>
					<th class="dashboardWorkTd2" column="wEndCnt">완료량 </th>
					<th class="dashboardWorkTd2" >세부사항 </th>
					<th class="dashboardWorkTd2" >전달사항</th>
					<th class="dashboardWorkTd2" column="oApprovalDate">승인일 </th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable workListTableBody tr_nohover" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px"><!--작업지시서-->
				<col width="45px"><!--입고여부-->
				<col width="110px"><!--업체명-->
				<col width="17px"><!--업체명-->
				<col width="240px"><!--파일명-->
				<!-- col width="25px" --><!--주문서 옵션 조회-->
				<col width="65px"><!--규격-->
				<col width="65px"><!--주문수량-->
				<col width="140px" class=""><!--공정흐름-->
				
				<col width="70px" class="spNm"><!--공정명-->
				<col width="80px" class="eqNm"><!--장비명-->
				<col width="15px" class="upDown"><!--To-Down-->
				<col width="30px"><!--No-->
				<col width="20px"><!--체크박스-->
				<!-- col width="60px" --><!--버튼-->
				<col width="60px"><!--상태-->
				<col width="40px"><!--면-->
				<col width="105px"><!--작업명-->
				<col width="60px"><!--작업자-->
				<col width="65px"><!--완료수량-->
				<!-- col width="60px" --><!--선공정-->
				<!-- col width="60px" --><!--후공정-->
				<col width="auto"><!--세부사항-->
				<col width="100px"><!--전달사항-->
				<col width="50px"><!--주문일-->
				<col width="100px"><!--출고메모-->
				<col width="30px"><!--상세보기-->
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
					<span class="totalEndCnt" style="margin-right:10px;display:none;">총 완료수량 : <strong></strong></span>
					<!-- a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;";></i></a -->
					<!-- span class="lastDateTime"></span -->
					<!-- a href="#" class="btnStyleMin03 btnAutoReload activeOff" title="자동 새로고침"><i class="fa-solid fa-a"></i></a -->
					<a href="#" class="btnStyleMin03 btnFullScreen activeOff" title="풀스크린 보기"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>
<template id="orderMarkDiv">
</tempnam>
<style>select option  {color:#000;} select option.unChoice {color:#ccc;}</style>