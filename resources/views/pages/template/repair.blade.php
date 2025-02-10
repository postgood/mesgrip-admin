<div id="CI00000020">
	<div class="pageHere">
		<span class="first">기업관리</span> &gt; <strong>장비수리이력</strong>
	</div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="eqNm">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="60px">
			<col width="200px">
			<col width="40px">
			<col width="80px">
			<col width="60px">
			<col width="195px">
			<col width="40px">
			<col width="120px">
			<col width="auto">
			
			</colgroup>
			<tbody>
				<tr>
					<th class="ar">· 조회기간</th>
					<td>
							<input class="date crdrIp" type="text" name="startDt" placeholder="날짜 선택" readonly> ~
							<input class="date crdrIp" type="text" name="endDt" placeholder="날짜 선택" readonly>
					</td>
					<th class="ar">· 분류</th>
					<td>
						<select class="w98p schColumBorderColorDefault" name="searchColumn">
							<option value="eqNm">장비명</option>
							<option value="erMemo">수리내역</option>
						</select>
					</td>
					<th class="ar">· 검색어</th>
					<td>
						<div class="inputTextCleanDiv">
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
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<!-- a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다."><i class="fa-regular fa-square-plus"></i>&nbsp;&nbsp;신규</a -->
							<a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<!-- a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다."><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;삭제</a -->
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
				<col width="8%">
				<col width="20%">
				<col width="auto">
				<col width="15%">
				<col width="8%">
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th >일자 </th>
					<th class="sortTd" column="cuNm">장비명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th >수리내용 </th>
					<th >등록일시 </th>
					<th class="last">수정</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
					<col width="25px">
					<col width="8%">
					<col width="20%">
					<col width="auto">
					<col width="15%">
					<col width="8%">
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