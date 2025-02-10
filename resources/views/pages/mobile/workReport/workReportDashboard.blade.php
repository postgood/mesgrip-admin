@extends('layouts.workReportIndex', [])

@section('content')
<div class="" id="mobileContainerWorkReport">
    <div class="mobileWorkReportTop">
        <table class="mobileTopTable tr_nohover" style="">
			<colgroup>
				<col width="50%">
                <col width="auto">
                <col width="20%">
			</colgroup>
			<tbody>
				<tr class="mobileTopLogo">
                    <td class="al" style="vertical-align: bottom;"><div class="mobileMark">M</div></td>
                    <td class="ar companyInfo" colspan="2" ><strong class="cNm" style="font-size:18px !important;"></strong> <br/><span class="cTel"></span></td>
				</tr>
                <tr class="">
					<td class="al" colspan="3" style="padding-top:5px;padding-bottom:5px;background: #003a6f; color: #fff;">
                        <div style="display:flex;align-items:center;">
                            <!-- strong class="workTitle">발주서</strong -->
                            <span class="cuNm" style="font-size:32px !important; margin-left:0px;"></span>
                        <div>
                    </td>
				</tr>
				<tr class="">
					<td class="al processFlow" colspan="3">
						<!-- span class="mprocessStatusB">인쇄</span>
                        <span class="mprocessStatusA">코팅</span>
                        <span class="mprocessStatusA">금박</span>
                        <span class="mprocessStatusA">실크</span -->
					</td>
				</tr>
			</tbody>
		</table>
    </div>
	<hr class="divLine" style="border-color:#031627;margin-top: 8px;"></hr>
    <div class="mobileWorkReportBody ac">
		<div class="mobileOrderInfo" style="width:100%;padding: 5px 5px;">
			<table class="tr_nohover">
                <colgroup>
                    <col style="width:15%;">
					<col style="width:auto;">
                </colgorp>
                <tbody>
					<tr>
						<td class="oFileNm" colspan="2" style="height:30px;color: #fff;"></td>
					</tr>
					<tr>
						<td colspan="2" class="ac" style="padding: 5px 0px;color: #fff;background: #003a6f;">
							<table class="orderInfo" style="width:100%;font-size: 15px;">
								<colgroup>
									<col style="width:19%;">
									<col style="width:22%;">
									<col style="width:19%;">
									<col style="width:39%;">
								</colgorp>
								<tbody>
									<tr style="height:35px;">
										<td class="ac" rowspan="2" style="color: #fff;border-top-left-radius:7px;background: #08102c;border-right:1px solid #fff;border-bottom:1px solid #fff;">규&nbsp;&nbsp;격</td>
										<td class="ac oPaperSize" rowspan="2" style="color: #fff;background: #08102c;border-right:1px solid #fff;border-bottom:1px solid #fff;"></td>
										<td class="ac" rowspan="2" style="color: #fff;background: #08102c;border-right:1px solid #fff;border-bottom:1px solid #fff;">입&nbsp;&nbsp;고</td>
										<td class="ac osInHopeDt" style="color: #fff;border-top-right-radius:7px;background: #08102c;border-bottom:1px solid #fff;"></td>
									</tr>
									<tr style="height:35px;">
										<td class="ac osInNm" style="color: #fff;background: #08102c;border-bottom:1px solid #fff;"></td>
									</tr>
									<tr style="height:35px;">
                                        <td class="ac" rowspan="2" style="color: #fff;background: #08102c;border-bottom-left-radius:7px;border-right:1px solid #fff;border-bottom:1px solid #fff;">주문량</td>
										<td class="ac oCnt" rowspan="2" style="color: #fff;background: #08102c;border-right:1px solid #fff;border-bottom:1px solid #fff;"></td>
										<td class="ac" rowspan="2" style="color: #fff;background: #08102c;border-right:1px solid #fff;border-bottom:1px solid #fff;">출&nbsp;&nbsp;고</td>
										<td class="ac osOutHopeDt" style="color: #fff;background: #08102c;border-bottom:1px solid #fff;"></td>
									</tr>
									<tr style="height:35px;">
										<td class="ac osOutNm" style="color: #fff;background: #08102c;border-bottom-right-radius:7px;"></td>
									</tr>									
								</tbody>
							</table>
						</td>
					</tr>
					<!-- tr>
						<td class="ar" style="color: #fff;">비고 |</td>
						<td class="al oMemo" style="color: #fff;">비고란 비고란</td>
					</tr -->
                    <tr>
						<td colspan="2" style="height:10px;;background: #003a6f;"></td>
					</tr>
				</tbody>
			</table>
		</div>
    </div>
    <div class="workReportList">
        <div class="workReportBoard">
			<table class="workInfoTable tr_nohover" style="width:100%;font-size:16px;margin-bottom:5px !important;">
                <colgroup>
                    <col style="width:30%;">
					<col style="width:11%;">
					<col style="width:auto;">
                </colgorp>
				<thead>
                    <tr style="height:35px;">
                        <th class="wNm ac" style="background: #003a6f;border-right:1px solid #000;border-bottom:0px;color:#fff;font-size:15px !important; font-weight: bold;table-layout:fixed ;white-space:nowrap;  text-overflow: ellipsis; overflow: hidden;"></th>
						<td class="ac workCheck" style="background: #003a6f;border-right: 0px;color:#fff;font-size:16px;"></th>
						<td class="al oswMemo" style="background: #003a6f;border-left: 0px;color:#fff;font-size:14px !important;table-layout:fixed ;white-space:nowrap;  text-overflow: ellipsis; overflow: hidden;"></th>
                    </tr>
				</thead>
                <tbody style="display:none;">
                    <tr>
                        <th class="ac oswCnt" rowspan="2" style="border-right:1px solid #a3a3a3;border-bottom:2px solid #a3a3a3;font-size:14px !important;"></th>
						<td class="ac wFrontYnNm" rowspan="2" style="border-bottom:2px solid #a3a3a3;border-right:1px solid #a3a3a3;background: #fff;font-size:14px !important;"></td>
						<td class="al wOption" style="background: #fff;font-size:16px !important;padding: 5px 5px;border-bottom:1px solid #a3a3a3;font-size:14px !important;"></td>
                    </tr>
                    <tr>
						<td class="al wOption" style="border-bottom:2px solid #a3a3a3;background: #fff;font-size:16px !important;padding: 5px 5px;font-size:14px !important;"></td>
                    </tr>
                    <tr>
						<td class="ac" colspan="3" style="border-left:0px;background: #fff;font-size:16px;padding:10px 5px;"><div class="btnAction" style="display:inline-block;border:1px solid #4270ff;background:#4270ff;border-radius:3px;color:#fff;width:50%;padding: 5px;font-weight: bold;">진행</div></td>
                    </tr>
                </tbody>
			</table>
        </div>
        <div style="height:50px;"/>
    </div>        
</div>

<template id="outworkAction">
    <div class="mobilePop" style="width:250px;">
        <div class="mobilePopContent">
            <div class="mw_title">
                <h1 class="ar" >
                    <a href="javascript:void(0);" class="close_layer btnClosePopLayer">×</a>
                </h1>
            </div>
            <table cellpadding="0" cellspacing="0" border="0" summary="" class=" tr_nohover mb10 ">
                <caption></caption>
                <colgroup>
                    <col width="100%">
                </colgroup>
                <tbody>
                    <tr>
                        <td class="ac wNm" style="font-size: 15px !important;font-weight: bold;"></td>
                    </tr>
                    <tr>
                        <td class="ac trMargin"></td>
                    </tr>
                    <tr>
                        <td class="ac" colspan="3"><input type="text" class="w70p ar" name="oswActionCnt" placeholder="수량"></td>
                    </tr>
                </tbody>
            </table>
            
            <!-- table cellpadding="0" cellspacing="0" border="0" summary="" class="workCheck tr_nohover mb10">
                <caption></caption>
                <colgroup>
                    <col width="100%">
                </colgroup>
                <tbody>
                    <tr>
                        <td class="ac" style="color:red;">
                            <table cellpadding="0" cellspacing="0" border="0" summary="" class="tr_nohover mb10" style="width:180px;">
                                <caption></caption>
                                <colgroup>
                                    <col width="10%">
                                    <col width="90%">
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td class="ar"><input type="checkbox" name="confirmation" value="Y"></td>
                                        <td class="al"> 작업세부사항을 확인하였습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table -->
            <table cellpadding="0" cellspacing="0" border="0" summary="" class=" tr_nohover mb10">
                <caption></caption>
                <colgroup>
                    <col width="100%">
                </colgroup>
                <tbody>
                    <tr>
                        <td class="ac"><a href="#" class="btnActionCall" style="display:inline-block;border:1px solid #4270ff;background:#4270ff;border-radius:3px;color:#fff;width:50%;margin:10px;padding: 5px;font-weight: bold;"><i class="fa-solid fa-check"></i>&nbsp;&nbsp;<span class="actionNm">시작</span></a></td>	
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

@endsection