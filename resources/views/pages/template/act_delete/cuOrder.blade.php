<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="55px">
			<col width="220px">
			<col width="55px">
			<col width="70px">
			<col width="45px">
			<col width="150px">
			<col width="45px">
			<col width="100px">
			<col width="105px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<th class="ar">· 진행상태</th>
					<td>
							<select name="oStatus">
								<option value="">전체</option>
								<option value="A">대기</option>
								<option value="B">진행중</option>
								<option value="C">정지</option>
								<option value="D">완료</option>
							</select>
					</td>
					<th class="ar">· 파일명</th>
					<td>
						<input class="w98p" name="oFileNm" type="text" placeholder="파일명">
					</td>
					<th class="ar">· 업체명</th>
					<td>
							<input class="w98p srchIp" name="searchWord" type="text" placeholder="검색어">
					</td>
					<td>
							<input type="checkbox" name="oMarkYn" value="Y"> <span style="margin-bottom:5px;" title="자주발생하는 수주로 설정된 수주건을 볼 수 있습니다.">등록된 즐겨찾기</span>
					</td>
					<td>
						<div class="ar">
							<a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a>
							<a href="#" class="btnSearch btnMarkCreate" title="자주 발생하는 주문을 코드를 부여하여 신규등록시 검색하여 사용 할 수 있습니다."><i class="fa-regular fa-bookmark"></i>&nbsp;&nbsp;즐겨찾기</a>
							<a href="#" class="btnSearch btnApproval" title="자주 발생하는 주문을 코드를 부여하여 신규등록시 검색하여 사용 할 수 있습니다."><i class="fa-solid fa-check"></i>&nbsp;&nbsp;작업승인</a>
							<a href="#" class="btnSearch btnCreate" title="신규 수주건을 등록 할 수 있습니다."><i class="fa-regular fa-square-plus"></i>&nbsp;&nbsp;신규</a>
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다."><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;삭제</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- //searchWrap -->
	<div class="mt20">
		<table class="listTbType02 tr_nohover tablScrollDisplay dataHeadTable scrollTbThead"  id="" style="margin: 0px !important;" cellspacing="0" cellpadding="0" summary="">
			<caption></caption>
			<colgroup>
				<col width="25px">
				<col width="30px"><!-- 작업지시서 -->
				<col width="50px"><!-- 상태 -->
				<col width="150px"><!-- 업체명 -->
				<col width="300px"><!-- 파일명 -->
				<col width="200px"><!-- 공정 -->
				<col width="75px"><!-- 규격 -->
				<col width="80px"><!-- 주문수량 -->
				<col width="110px"><!-- 입고처 -->
				<col width="55px"><!-- 상태 -->
				<col width="110px"><!-- 출고처 -->
				<col width="55px"><!-- 출고일 -->
				<col width="80px"><!-- 등록일 -->
				<col width="50px"><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th><i class="fa-regular fa-note-sticky"></i></th>
					<th >상태 </th>
					<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="oFileNm">파일명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="process">공정 </th>
					<th column="oPaperSize">규격</th>
					<th column="oCnt">주문수량 </th>
					<th column="istInNm">입고처 </th>
					<th column="istInStatusNm">상태 </th>
					<th column="istOutNm">출고처 </th>
					<th column="oHopeOutDt">출고일</th>
					<th column="creDate">등록일시 </th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px">
				<col width="30px"><!-- 작업지시서 -->
				<col width="50px"><!-- 상태 -->
				<col width="150px"><!-- 업체명 -->
				<col width="300px"><!-- 파일명 -->
				<col width="200px"><!-- 공정 -->
				<col width="75px"><!-- 규격 -->
				<col width="80px"><!-- 주문수량 -->
				<col width="110px"><!-- 입고처 -->
				<col width="55px"><!-- 상태 -->
				<col width="110px"><!-- 출고처 -->
				<col width="55px"><!-- 출고일 -->
				<col width="80px"><!-- 등록일 -->
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
					<a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter"></i></a>
					<span class="lastDateTime"></span>
					<a href="#" class="btnStyleMin03 btnAutoReload activeOff" title="자동 새로고침"><i class="fa-solid fa-repeat"></i></a>
					<a href="#" class="btnStyleMin03 btnFullScreen activeOff" title="풀스크린 보기"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>