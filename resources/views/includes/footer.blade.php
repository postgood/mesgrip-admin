<audio id="notification-sound">
	<source src="/effect/notisnd.mp3" type="audio/mpeg">
	<!-- 다른 형식의 오디오 파일도 추가할 수 있습니다. -->
</audio>
<div id="printWrap" style="height:0px;width:210mm;display:;overflow: hidden;"></div>
<div id="notification-container" class="notification-container"></div>
<div id="spinnerWrap" class="loading_div" style="display:none">
	<span class="ico_load"></span>
</div>
<template id="facktoryDiv0000000000000000000000000000000000000000000000">
	<div class="mw_defalut" style="width:520px;" id="">
		<div class="mw_title" id="handle">
			<h1 class="mw_title_mid">
				<span class="title">공장 목록</span>
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
									<div class="ar"><a href="javascript:void(0);" class="btnSearch clientSave">저장</a></div>
								</th>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="searchWrap">
					<table class="listTbType07 tr_nohover dataHeadTable tablScrollDisplay" id="" style="margin: 0px !important; padding:3px 0;border-bottom: 0px;" cellspacing="0" cellpadding="0" summary="">
						<caption></caption>
						<colgroup>
							<col width="75px"><!--공정명-->
							<col width="40px"><!--면-->
							<col width="85px"><!--작업명-->
							<col width="auto"><!--주문세부사항-->
							<!-- col width="auto" --><!--작업세부사항-->
							<col width="55px"><!--완료수량-->
							<col width="70px"><!--단가-->
							<col width="120px"><!--금액-->
							<col width="80px"><!--부가세-->
						</colgroup>
						<thead>
							<tr>
								<th style="border-bottom: 0px;">공장명</th>
								<th style="border-bottom: 0px;">면</th>
								<th style="border-bottom: 0px;">작업명</th>
								<th style="border-bottom: 0px;">주문세부사항 <span style="color:#000;font-weight: normal; font-size:11px;">(비용청구내역)</span> <span style="color:#f20;">③</span></th>
								<!-- th>작업세부사항</th -->
								<th style="border-bottom: 0px;">완료량</th>
								<th style="border-bottom: 0px;">단가 </th>
								<th style="border-bottom: 0px;" title="완료수량 × 단가 = 금액">금액 <span style="color:#f20;">④</span></th>
								<th style="border-bottom: 0px;" title="금액 × 0.1 = 부가세">부가세</th>
							</tr>
						</thead>
					</table>
					<div class="overflowYListdiv overflowFixWrap noReSize" style="height:400px;">
						<table class="listTbType02 tr_nohover workList" id="" style="min-height:35px;margin: 0px !important; padding:3px 0;" cellspacing="0" cellpadding="0" summary="">
							<colgroup>
								<col width="75px"><!--공정명-->
								<col width="40px"><!--면-->
								<col width="85px"><!--작업명-->
								<col width="auto"><!--주문세부사항-->
								<!-- col width="auto" --><!--작업세부사항-->
								<col width="55px"><!--완료수량-->
								<col width="70px"><!--단가-->
								<col width="120px"><!--금액-->
								<col width="80px"><!--부가세-->
							</colgroup>
							<tbody><tr style="width:100%;"><td class="ac workOptionView cursorPointer" style="color:#000;border-top:0px;">코팅</td><td class="ac workOptionView cursorPointer" style="color:#000;border-top:0px;">양면</td><td class="ac workOptionView cursorPointer" style="color:#000;border-top:0px;">코팅(써멀)</td><td class="workOptionListDiv al" style="border-top:0px;"></td><td class="ar" style="color:#000;border-top:0px;;"><strong class="wEndCnt">3,200</strong></td><td class="ac" style="color:#000;border-top:0px;;"><input type="text" name="wUnitPriceWork" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 금액 및 부가세 자동 입력" value="0"></td><td class="ac" style="color:#000;border-top:0px;;"><input type="text" name="wAmount" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 단가는 표시 되지 않습니다." value="0"></td><td class="ac" style="color:#000;border-top:0px;;"><input type="text" name="wAmountVat" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" value="0"></td></tr><tr style="width:100%;"><td class="ac workOptionView cursorPointer" style="color:#000;">씰크</td><td class="ac workOptionView cursorPointer" style="color:#000;">전면</td><td class="ac workOptionView cursorPointer" style="color:#000;">백색씰크</td><td class="workOptionListDiv al" style=""></td><td class="ar" style="color:#000;;"><strong class="wEndCnt">5,000</strong></td><td class="ac" style="color:#000;;"><input type="text" name="wUnitPriceWork" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 금액 및 부가세 자동 입력" value="0"></td><td class="ac" style="color:#000;;"><input type="text" name="wAmount" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 단가는 표시 되지 않습니다." value="0"></td><td class="ac" style="color:#000;;"><input type="text" name="wAmountVat" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" value="0"></td></tr><tr style="width:100%;"><td class="ac workOptionView cursorPointer" style="color:#000;">금박</td><td class="ac workOptionView cursorPointer" style="color:#000;">전면</td><td class="ac workOptionView cursorPointer" style="color:#000;">박</td><td class="workOptionListDiv al" style=""><span class="workOptionListOne vm"><strong class="workOptionInfoView">필름 : <span style="font-size:12px;">신규→직입</span> <input type="hidden" name="woSeq" value="4297"> <input type="text" name="woAmount" style="text-align:right;width:60px;margin-left:5px;font-size:13px;" placeholder="금액" title="금액" value="0"><input type="text" name="woAmountVat" style="display:none;text-align:right;width:45px;margin-left:5px;font-size:13px;" placeholder="부가세" title="부가세" value="0" <="" strong=""></strong></span><strong class="workOptionInfoView"> <span class="workOptionListOne vm"><strong class="workOptionInfoView">동판 : <span style="font-size:12px;">신규→제작</span> <input type="hidden" name="woSeq" value="4299"> <input type="text" name="woAmount" style="text-align:right;width:60px;margin-left:5px;font-size:13px;" placeholder="금액" title="금액" value="0"><input type="text" name="woAmountVat" style="display:none;text-align:right;width:45px;margin-left:5px;font-size:13px;" placeholder="부가세" title="부가세" value="0" <="" strong=""></strong></span></strong></td><td class="ar" style="color:#000;;"><strong class="wEndCnt">2,000</strong></td><td class="ac" style="color:#000;;"><input type="text" name="wUnitPriceWork" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 금액 및 부가세 자동 입력" value="0"></td><td class="ac" style="color:#000;;"><input type="text" name="wAmount" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 단가는 표시 되지 않습니다." value="0"></td><td class="ac" style="color:#000;;"><input type="text" name="wAmountVat" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" value="0"></td></tr><tr style="width:100%;"><td class="ac workOptionView cursorPointer" style="color:#000;">톰슨</td><td class="ac workOptionView cursorPointer" style="color:#000;">전면</td><td class="ac workOptionView cursorPointer" style="color:#000;">톰슨</td><td class="workOptionListDiv al" style=""></td><td class="ar" style="color:#000;;"><strong class="wEndCnt"></strong></td><td class="ac" style="color:#000;;"><input type="text" name="wUnitPriceWork" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 금액 및 부가세 자동 입력" value="0"></td><td class="ac" style="color:#000;;"><input type="text" name="wAmount" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" title="입력시 단가는 표시 되지 않습니다." value="0"></td><td class="ac" style="color:#000;;"><input type="text" name="wAmountVat" vtype="number" class="w100p inputBoder0 ar" style="font-size:13px;" value="0"></td></tr></tbody>
							<tfoot>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<template id="progress">
	<div class="mw_defalut" style="width:250px;" id="">
		<h2>진행상항</h2>
		<progress class="progress" value="50" min="0" max="100"></progress>
	</div>
</template>