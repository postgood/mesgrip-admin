
'use strict';
import Utils from '../../../raon_modules/utils.js';
import AjaxCall from '../../../raon_modules/AjaxCall.js'

class InoutDashboardController {
	constructor(_const, _data, _param) {
			this._const = _const?_const:{};
			this._data = _data?_data:{};
			this._param = _param?_param:{};
			this._options = {};
			this._utils = new Utils();
			this._ajax = new AjaxCall();
			this._employee = {};
			this._scanner = false;
			// Object.freeze(this._const);
	}

	init = () => {
		let self = this;
		let width  = window.innerWidth  || document.body.clientWidth;
		let height  = window.innerHeight  || document.body.clientHeight;

		$('.workList').css('height',height-30);

		let logBoxWidth = $('.logBox').width();
		if(width != parseInt(logBoxWidth)){
			$('.logBox').css('left', '50%').css('margin-left', '-250px');
		}
		let today = self._utils.currentDate();
		let _day = ['일','월','화','수','목','금','토'];
		let week = new Date(today).getDay();
		$('.mobileToday').text(today + " ("+ _day[week] +")");
		$('.eNm').text(self._const.__USER_NAME);
		$(".cNm").empty().text(self._const.__C_NM);


		$('.logOutBtn').on('click',function(){
			confirm('<span style="font-size:19px !important">로그아웃 하시겠습니까?</span>', function(data){
				if(data) {
					document.location.href="/inout/logout";
				}
			},'로그아웃');
			
		});
		$('.inScanner').on('click',function(){
			let $popDiv = $('template#workQrScanner');
			self.openLayer($popDiv.html(), self.workQrScannerEvent, 'istInStatus');
		});
		$('.outScanner').on('click',function(){
			let $popDiv = $('template#workQrScanner');
			self.openLayer($popDiv.html(), self.workQrScannerEvent, 'istOutStatus');
		});
		$('.newInScanner').on('click',function(){
			let $popDiv = $('template#workQrScanner');
			self.openLayer($popDiv.html(), self.workQrScannerEvent, 'istInStatus');
		});
		$('.newOutScanner').on('click',function(){
			let $popDiv = $('template#workQrScanner');
			self.openLayer($popDiv.html(), self.workQrScannerEvent, 'istOutStatus');
		});
	}

	scannerListAdd = (d) => {
		let self = this;
		const $layerObject = self._layerObject;
		let $tbody = $('.scannerList', $layerObject);
		let $trs = $('tr', $tbody);
		for(let i=0;i<$trs.length;i++){
			let data = $($trs[i]).data("ROW");
			if(data.oSeq == d.oSeq){
				//alert('이미 등록된 수주건입니다.');
				return false;
			}
		}

		let $tr = $('<tr />');
		$tr.append($('<td class="al" style="border-bottom:1px solid #fff !important;background:#000;color:#fff;padding-bottom:10px !important;"></td>').append(d.oFileNm));
		$tr.append($('<td class="ac" style="border-bottom:1px solid #fff !important;background:#000;color:#fff;padding-bottom:10px !important;"></td>').append(d.oPaperSize));
		$tr.append($('<td class="ac" style="border-bottom:1px solid #fff !important;background:#000;color:#fff;padding-bottom:10px !important;"></td>').append(self._utils.numberWithCommas(d.oCnt)));
		$tr.append($('<td class="ac" style="border-bottom:1px solid #fff !important;background:#000;color:#fff;padding-bottom:10px !important;"></td>').append('<i class="fa-solid fa-square-minus" style="color:#f740e8;font-size: 18px;"></i>'));
		$tr.data("ROW",d);
		$tbody.append($tr);
	}
	workQrScannerEvent = (popupID, d) => {
		let self = this;
		const $layerObject = $(`#${popupID}`);
		self._layerObject = $layerObject;
		self._actionType = d;

		
		if(d == 'istInStatus'){
			$('.btnFinishCall',$layerObject).addClass('istInButton');		
			$('.actionIcon',$layerObject).removeClass('fa-right-to-bracket').addClass('fa-right-from-bracket');
			self._actionNm = '입고';
		}else{
			$('.btnFinishCall',$layerObject).addClass('istOutButton');
			$('.actionIcon',$layerObject).removeClass('fa-right-from-bracket').addClass('fa-right-to-bracket');
			self._actionNm = '출고';
		} 
		
		let video = document.createElement("video");

		$('.actionNm', $layerObject).text(self._actionNm);
		let $tbody = $('.scannerList', $layerObject);

		$tbody.on('click','.fa-square-minus',function(){
			let $tr = $(this).closest('tr');
			let data = $tr.data("ROW");
			confirm('<span style="font-size:19px !important">['+ data.oFileNm +']삭제 하시겠습니까?</span>', function(data){
				if(data) {
					$tr.remove();
				}
			},"삭제");
		});
		$('.btnClosePopLayer',$layerObject).on('click',function(){
			self.stopScan(video);
		});
		$('.btnFinishCall',$layerObject).on('click',function(){
			let oSeqs = [];
			let $trs = $('tr',$tbody);
			
			for(let i=0;i<$trs.length;i++){
				let data = $($trs[i]).data("ROW");
				if(oSeqs.indexOf(data.oSeq) == -1){
					oSeqs.push(data.oSeq);
				}
			}
			if(oSeqs.length == 0){
				alert('<span style="font-size:19px !important">'+ self._actionNm +'처리할 QR코드를 스캔 하십시오</span>');
				return;
			}
			let mapData = {oSeqs: JSON.stringify(oSeqs), kind:((self._actionType == 'istInStatus'?'in':'out')),status:'C'};
			self.update(mapData, function(data){
				if(data.code == 0){
					$(".btnClosePopLayer", $layerObject).trigger('click');
					alert('<span style="font-size:19px !important">총 '+ oSeqs.length +'건이 '+ self._actionNm +'처리 되었습니다.</span>');
					self.modifyTime({action:'distribution'});
				}else{
					alert(data.message);
				}
			});
		});

		function startScan() {
					
			let canvasElement = document.getElementById("inoutCanvas");
			let canvas = canvasElement.getContext("2d");
			let loadingMessage = document.getElementById("loadingMessage");
			let $qrMessage = $(".qrMessage",$layerObject);
			self._scanner = true;
			

			function drawLine(begin, end, color) {
				canvas.beginPath();
				canvas.moveTo(begin.x, begin.y);
				canvas.lineTo(end.x, end.y);
				canvas.lineWidth = 4;
				canvas.strokeStyle = color;
				canvas.stroke();
			}
	
				// 카메라 사용시
			navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
				video.srcObject = stream;
				video.setAttribute("playsinline", true);      // iOS 사용시 전체 화면을 사용하지 않음을 전달
				video.play();
				
				requestAnimationFrame(tick);
			});
	
			function tick() {
				try{
				loadingMessage.innerText = "⌛ 스캔 기능을 활성화 중입니다."
	
				if(video.readyState === video.HAVE_ENOUGH_DATA) {
					loadingMessage.hidden = true;
					canvasElement.hidden = false;
					///outputContainer.hidden = false;
	
					// 읽어들이는 비디오 화면의 크기
					canvasElement.height = video.videoHeight;
					canvasElement.width = video.videoWidth;
					canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
					
					var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
					var code = jsQR(imageData.data, imageData.width, imageData.height, {
									inversionAttempts : "dontInvert",
					});
					
					// QR코드 인식에 성공한 경우
					if(code) {
						// 인식한 QR코드의 영역을 감싸는 사용자에게 보여지는 테두리 생성
						drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
						drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
						drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
						drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
						$qrMessage.empty();
						if(code.data.indexOf(document.location.host) > -1 || code.data.indexOf('127.0.0.1') > -1){
							let parameter = code.data.substring(code.data.indexOf('?')+3);
							parameter = self._utils.decryptData(decodeURI(parameter));
							let param = {};
							let params = parameter.split('&');
							for(let i=0;i<params.length;i++){
								let p = params[i].split('=');
								param[p[0]] = p[1];
							}
							
							if(param.oSeq != undefined){
								let data = {ctl:"order", cmd :"load", oSeq : param.oSeq};
								let _api = new AjaxCall(self._const,data);
								_api.ajaxformdata(function(rdata){ 
										if(rdata.code == 0) {
											let d = rdata.data;
											if(d[self._actionType] == 'C'){
												$qrMessage.text(self._actionNm +'완료된 수주건 입니다.');
											}else{
												if(self._actionType == 'istOutStatus'){
													if(d.oStatus != 'D'){
														$qrMessage.text('작업이 완료되지 않은 수주건 입니다.');
													}else{
														self.scannerListAdd(d);	
													}
												}else{
													self.scannerListAdd(d);
												}
											}
										} else {
											$qrMessage.text(rdata.message);
										}
								});

							}else{
								$qrMessage.text('조회 가능한 QR코드가 아닙니다.');
							}
						}

						// return을 써서 함수를 빠져나가면 QR코드 프로그램이 종료된다.
						
					}
					// QR코드 인식에 실패한 경우
					else {
						//outputMessage.hidden = false;
						//outputData.parentElement.hidden = true;
					}
				}

				if(self._scanner) requestAnimationFrame(tick);
				}catch(e){
					alert('vedio : '+ e.message);
				}
			}
		}
		
		// 카메라 열기
		setTimeout(startScan,100);
	}
	stopScan = (videoElem) => {
		const stream = videoElem.srcObject;
		const tracks = stream.getTracks();
		tracks.forEach(function(track) {
		track.stop();
		});
		videoElem.srcObject = null;
	}

	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'distribution',
			cmd : 'update'
		}
		$.extend(mapData,_mapData);
		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
		});
	}
	openLayer = (data,cbfunc, d, $parentObj) => {
		const self = this;
		let popupID = self.createUniqueId();
		let obj;

		let openDiv = '<div class="mw_layer open"><div class="bg"></div><div id="'+popupID+'" class="ctlContainer">'+data+'</div></div>';
		$("body").append(openDiv);
			
		// 레이어 설정
		obj = $("#"+popupID+" div:eq(0)");
		let handler = obj.find(".mw_title");
		obj.draggable({containment:"body", cursor:"move", handle:handler});
		self.initPositionLayer(obj);

		// contents 원래크기 기록
		let contentsDiv = $(".contents");
		let contentsHeight = contentsDiv.height();
		if(contentsDiv.attr("data-height")==undefined){
			contentsDiv.attr("data-height", contentsDiv.height());
		}

		$("body").on("click", ".btnClosePopLayer", function(){
			let $video = $('video');
			if($video.length > 0){
				$video.stop();
			}
			self._scanner = false;
			self.closeLayerPopup($(this));
		});

		cbfunc(popupID , d, $parentObj);
	}

	closeLayerPopup = ($obj) => {
		if($obj != undefined){
			$obj.closest(".mw_layer").html("").remove();
	
			// contents 원래크기로 변경
			var contentsDiv = $(".contents");
			if(contentsDiv.attr("data-height")!=undefined){
				contentsDiv.css("minHeight", contentsDiv.attr("data-height")+"px");
			}
		}
	}

	createUniqueId = () => {
		const self = this;
		self._uniqueID = self._uniqueID ?? 0;
		return "dynamicLayerID_" + (++self._uniqueID);
	}
	initPositionLayer = ($id) => {
		const self = this;

		let objWrap = $(".wrap");
		let heightDoc = objWrap.height(); // 문서높이
		let widthDoc = objWrap.width(); // 문서너비
		let heightWin = $(window).height(); // 창높이
		let widthWin = $(window).width(); // 창너비
		let layerHeight = $id.height(); // 레이어높이
		let layerWidth = $id.width(); // 레이어너비
		let top = $(document).scrollTop(); // 스크롤세로
		let left = $(document).scrollLeft(); // 스크롤가로

		if(widthDoc==0) widthDoc = $(document).width();
		if(heightDoc==0) heightDoc = $(document).width();
	
		if(widthWin<layerWidth) widthWin=widthDoc; // 가로는 출력내용이 많을경우 Doc 크기로 변경
	
		top += (heightWin-layerHeight)/2;
		left += (widthWin-layerWidth)/2;
		if(top<10) top=10; // 최소 10px
		if(left<10) left=10; // 최소 10px
	
		$id.css("top", top);
		$id.css("left", left);
		$id.parent().prev(".bg").height('100%'); // 불투명 스크린 문서크기만큼 height 리사이즈
		$id.parent().prev(".bg").width('100%'); // 불투명 스크린 문서크기만큼 width 리사이즈
	}
	modifyTime = (_mapData, cbfunc) => {
		try{
			const self = this;
			let mapData = {ctl : 'media',cmd : 'realLastTimeSave'};
			$.extend(mapData,_mapData);
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':false});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					if(typeof cbfunc == 'function') cbfunc();
				} else {
					toast('수정 시간 기록 실패');
				}
			});
		}catch(e){
			console.error(e.message)
		}
	}
	lastModifyTime = (cbfunc) => {
		try{
			let realLastTimeFile = __FILE_DOMIN +"/"+ self._const.__GROUP_ID +"/realTimeCheck.txt";
			$.ajax({
				url: realLastTimeFile  + ((/\?/).test(realLastTimeFile) ? "&" : "?") + (new Date()).getTime(),
				method: 'GET',
				success: function (str, status, xhr) {
					let data = JSON.parse(str);
					if(typeof cbfunc == 'function') cbfunc(data);
				},
				error: function (data, status, err) {
				},
				complete: function () {
				}
			});
		}catch(e){
			console.error(e.message)
		}
	}
}
export default InoutDashboardController