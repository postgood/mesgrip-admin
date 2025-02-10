<div id="OM00000016">
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<div class="pageHere">
		<span class="first">거래처관리</span> &gt; <strong>자재사관리</strong>
	</div>
	<!-- searchWrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="cuNm">
		<input type="hidden" name="orderby" value="DESC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
			<col width="6%">
			<col width="14%">
			<col width="6%">
			<col width="24%">
			<col width="auto">
			</colgroup>
			<tbody>
				<tr>
					<th>· 분류</th>
					<td>
						<select class="w98p schColumBorderColorDefault" name="searchColumn">
							<option value="cuNm">업체명</option>
							<option value="cuOwnerNm">대표자명</option>
							<option value="cuTel">전화번호</option>
						</select>
					</td>
					<th>· 검색어</th>
					<td>
							<input class="w98p srchIp schColumBorderTextDefault" name="searchWord" type="text" style="height:28px !important;" placeholder="">
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<a href="#" class="btnSearch btnSearchCall">검색</a>
							<!-- a href="#" class="btnSearch btnCreate">신규</a -->
							<a href="#" class="btnSearch btnCreate" title="신규 등록 할 수 있습니다." style="padding-top:4px;"><i class="fa-solid fa-plus" style="font-size:17px;"></i></a>
							<!-- a href="#" class="btnSearch2 btnTransDelete">삭제</a -->
							<a href="#" class="btnSearch2 btnTransDelete" title="선택된 수주건을 삭제 할 수 있습니다." style="padding-top:4px;"><i class="fa-regular fa-trash-can" style="font-size:17px;"></i></a>
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
				<col width="15%">
				<col width="15%">
				<col width="10%">
				<col width="7%">
				<col width="10%">
				<col width="auto">
				<col width="12%">
				<col width="8%">
			</colgroup>
			<thead>
				<tr>
					<th><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th class="sortTd" column="cuOwnerNm">대표자 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th >전화번호 </th>
					<th >거래여부 </th>
					<th >할인률 </th>
					<th >비고 </th>
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
					<col width="15%">
					<col width="15%">
					<col width="10%">
					<col width="7%">
					<col width="10%">
					<col width="auto">
					<col width="12%">
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