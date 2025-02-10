<div id="____DIV_ID____">
	<div class="pageHere"></div>
	<!-- 영역 Wrap -->
	<div class="searchWrapArea">
		<input type="hidden" name="orderculumn" value="">
		<input type="hidden" name="orderby" value="ASC">
		<table cellpadding="0" cellspacing="0" summary="" class="noBdrTb tr_nohover">
			<caption></caption>
			<colgroup>
				<col width="55px">
				<col width="200px">
				<col width="55px"><!-- 입고-->
				<col width="135px">
				<col width="55px"><!-- 출고-->
				<col width="135px">
				<col width="70px"><!-- 중요-->
				<col width="110px">
				<col width="55px"><!-- 업체명-->
				<col width="165px">
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
					
					<th class="ar" style="color:#498e91;">입고</th>
					<td style="padding-left:5px;"><table style="width:100%;border:0px;">
							<colgroup>
								<col width="7px">	
								<col width="20px">
								<col width="50px">
								<col width="20px">
								<col width="37px">
							</colgrop>
							<tbody>
								<td style="padding-left:2px;padding-right:2px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
								<td><input type="checkbox" name="todayIn" value="Y" ></td>
								<td style="padding-left:2px;">금일입고</td>
								<td><input type="checkbox" name="istInStatus" value="A" ></td>
								<td style="padding-left:2px;">미입고</td>
							</tbody>
						</table>
					</td>
					<th class="ar" style="color:#8361af;">출고</th>
					<td  style="padding-left:5px;"><table style="width:100%;border:0px;">
							<colgroup>
								<col width="7px">	
								<col width="20px">
								<col width="50px">
								<col width="20px">
								<col width="37x">
							</colgrop>
							<tbody>
								<td style="padding-left:2px;padding-right:2px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
								<td><input type="checkbox" name="todayOut" value="Y"></td>
								<td style="padding-left:2px;">금일출고</td>
								<td><input type="checkbox" name="istOutStatus" value="A"></td>
								<td style="padding-left:2px;">미출고</td>
							</tbody>
						</table>
					</td>
					<th class="ar" style="color:#bf5353;">우선진행</th>
					<td style="padding-left:5px;"><table style="width:100%;border:0px;">
							<colgroup>
								<col width="7px">
								<col width="20px">
								<col width="25px">
								<col width="20px">
								<col width="37x">
							</colgrop>
							<tbody>
								<td style="padding-left:2px;padding-right:2px;"><div style="display:inline-block;border-left:1px solid #999;border-right:1px solid #fff;height:20px;width:1px;"></td>
								<td><input type="checkbox" name="todayMarkIn" value="Y"></td>
								<td style="padding-left:2px;">입고</td>
								<td><input type="checkbox" name="todayMarkOut" value="Y"></td>
								<td style="padding-left:2px;">출고</td>
							</tbody>
						</table>
					</td>
					<th class="ar">· 업체명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="srchIp schColumBorderTextDefault" name="searchWord" type="text" style="width:145px;height:28px !important" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td>
					<!-- th class="ar">· 품명</th>
					<td>
						<div class="inputTextCleanDiv">
							<input class="schColumBorderTextDefault" style="width:95px;height:28px !important" name="oFileNm" type="text" placeholder="" autocomplete="false">
							<div class="inputTextClean"><span>×</span></div>
						</div>
					</td -->
					
					<td>
						<a href="#" class="btnSearchCall" title="검색조건을 기준으로 검색을 합니다."><i class="fa-solid fa-magnifying-glass"></i></a>
					</td>
					<td style="padding-left:10px;">
						<i class="fa-solid fa-clock-rotate-left"></i> <span class="searchRunTime"></span>
					</td>
					<td>
						<div class="ar">
							<div style="display:inline-block;">
								입고대기 : <span class="inCnt" style="color:#68C3C7;font-size:16px;font-weight:bold;"></span> / 출고대기 : <span class="outCnt" style="font-size:16px;color:#b583f5;font-weight:bold;"></span>
							</div>
							<!-- a href="#" class="btnSearch btnSearchCall" title="검색조건을 기준으로 검색을 합니다." style="margin-left:10px;"><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;검색</a -->
							<!-- a href="#" class="btnSearch btnWorkReportPrint" title="선택한 수주건의 작업지시서를 출력합니다."><i class="fas fa-print" title="작업지시서 출력"></i>&nbsp;&nbsp;작업지시서 출력</a -->
							<a href="#" class="btnSearch btnInout" style="margin-left:10px;" title="선택한 수주건을 입/출고 상태를 변경 합니다."><i class="fa-solid fa-building-circle-arrow-right"></i>&nbsp;&nbsp;상태변경</a>
							<a href="#" class="btnSearch btnMap" title="선택한 수주건(완료 제외)을 지도로 입/출고지 위치를 볼수 있습니다."><i class="fa-solid fa-location-arrow"></i>&nbsp;&nbsp;위치보기</a>
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
				<col width="25px"><!-- 작업지시서 -->
				<col width="25px"><!-- 체크박스 -->
				<col width="50px"><!-- 등록일시 -->
				<col width="130px"><!--업체명-->
				<col width="17px"><!--파일-->
				<col width="auto"><!--품명-->
				<col width="65px"><!--규격-->
				<col width="65px"><!--주문수량-->
				<col width="60px"><!-- 첫공정 -->
				<col width="150px"><!-- 공정 -->
				<col width="30px"><!-- 상태 -->
				<col width="145px"><!-- 입고처 -->
				<col width="120px"><!-- 입고희망일 -->
				<col width="60px"><!-- 입고상태 -->
				
				<!-- col width="80px" --><!-- 입고자 -->
				<col width="145px"><!-- 출고처 -->
				<col width="120px"><!-- 출고일 -->
				<col width="60px"><!-- 출고상태 -->
				
				<!-- col width="80px" --><!-- 출고자 -->
				<col width="0px">
				<col width="100px"><!-- 메모 -->
				<!-- col width="50px" --><!-- 보기 -->
			</colgroup>
			<thead>
				<tr>
					<th rowspan="2"><i class="fa-solid fa-rotate-right cursorPointer" title="정렬 초기화"></i><!-- input type="checkbox" class="vm" name="chckAll" --></th>
					<th rowspan="2"></th>
					<th rowspan="2" column="creDate">승인일 </th>
					<th rowspan="2" class="sortTd" column="cuNm">업체명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th rowspan="2" class="sortTd" column="oFileNm" colspan="2">품명 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					
					<th rowspan="2" column="oPaperSize" class="sortTd">규격 <img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th rowspan="2" column="oCnt">주문량 </th>
					
					<th rowspan="2" column="startProcess" style="border-right:0px;">첫공정</th>
					<th rowspan="2" colspan="2" column="process" style="border-right:0px;">생산공정<span style="margin-left:10px;" title="대기">○ <span style="color:#4e80ee;" title="출고중">●</span> <span style="color:#b2b8ba;" title="완료">●</span></th>
					<!-- th rowspan="2" style="border-right:0px;">작업<br>상태 </th -->
					<th colspan="3" column="istInNm" style="border-bottom:0px solid #49607d;border-left:0px;border-right:0px;"><i class="fa-solid fa-arrow-right-to-bracket" style="color: #68C3C7;;"></i> &nbsp;입고현황</th>
					<th colspan="3" column="istOutNm" style="border-bottom:0px solid #49607d;border-left:0px;border-right:0px;">출고현황 &nbsp;<i class="fa-solid fa-arrow-right-from-bracket" style="color: #d8a2ff;"></i> </th>
					<th rowspan="2" style="border-left:0px;border-right:0px;"></th>
					<th rowspan="2" column="oMemo" style="border-left:0px;">비고 </th>
				</tr>
				<tr>
					<th column="ist.istInNm" class="sortTd" style="background:#68C3C7;border-right:1px solid #239ca1;border-bottom:0px solid #ccc; border-left:1px solid #566981;">입고장소 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="ist.istInHopeDt" class="sortTd" style="background:#68C3C7;border-right:1px solid #239ca1;;border-bottom:0px solid #ccc;">요청일 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="istInStatus"  style="background:#68C3C7;border-right:1px solid #239ca1;;border-bottom:0px solid #ccc;">상태변경</th>
					
					<th column="ist.istOutNm" class="sortTd" style="background:#b583f5;border-right:1px solid #974ff3;border-bottom:0px solid #ccc;">출고장소 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="ist.istOutHopeDt" class="sortTd"  style="background:#b583f5;border-right:1px solid #974ff3;border-bottom:0px solid #ccc;">요청일 &nbsp;<img src="/images/btn/btn_sort2.png" alt="" class="vm" style="cursor:pointer;"></th>
					<th column="istOutStatus" style="background:#b583f5;border-bottom:0px solid #ccc;border-right:1px solid #566981;">상태변경</th>
				</tr>
			</thead>
		</table>
		<div class="overflowYListdiv overflowFixWrap" id="">
			<table class="listTbType02 tr_action dataListTable" style="border-top: 0px !important;margin-top:-1px;" cellspacing="0" cellpadding="0" summary="">
				<caption></caption>
				<colgroup>
				<col width="25px"><!-- 작업지시서 -->
				<col width="25px"><!-- 선택 -->
				<col width="50px"><!-- 등록일시 -->
				<col width="130px"><!--업체명-->
				<col width="17px"><!--파일-->
				<col width="auto"><!--품명-->
				<col width="65px"><!--규격-->
				<col width="65px"><!--주문수량-->
				<col width="60px"><!-- 첫공정 -->
				<col width="150px"><!-- 공정 -->
				<col width="30px"><!-- 상태 -->
				<col width="15px"><!-- 입고 지도아이콘 -->
				<col width="130px"><!-- 입고처 -->
				<col width="120px"><!-- 입고희망일 -->
				<col width="15px"><!-- 입고상태 -->
				<col width="45px"><!-- 입고상태 -->
				<!-- col width="80px" --><!-- 입고자 -->
				<col width="15px"><!-- 출고 지도아이콘 -->
				<col width="130px"><!-- 출고처 -->
				<col width="120px"><!-- 출고일 -->
				<col width="15px"><!-- 입고상태 -->
				<col width="45px"><!-- 출고상태 -->
				<!-- col width="80px" --><!-- 출고자 -->
				<col width="100px"><!-- 메모 -->
				<!-- col width="50px" --><!-- 보기 -->
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
					<!-- a href="#" class="btnStyleMin03 btnExcelDownload" title="엑셀파일 받기"><i class="fa-brands fa-square-x-twitter" style="color: #38a938;";></i></a -->
					<!--span class="lastDateTime"></span -->
					<!--a href="#" class="btnStyleMin03 btnAutoReload activeOff" title="자동 새로고침"><i class="fa-solid fa-a"></i></a -->
					<a href="#" class="btnStyleMin03 btnFullScreen activeOff" title="풀스크린 보기"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
				</span>
			</div>
		</div>
	</div>
	<!-- //영역 Wrap -->
</div>