
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let companyController = class {

	constructor(_parent,_const,_data,_opt) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._options = _opt?_opt:{};
		this._utils = new Utils();
		this._ajax = new AjaxCall();
		this._code = null;
		this._fileSeq = null;
	}

	init = (_code,_data) => {
		const self = this;
		self._code = $(`#${_code}`);
		self._data = _data?_data:{};

		// 검색 영역
		self._code.find(".btnSearchCall").on("click",function(e){
			self._code.find(".pageInfoTfoot input[name=page]").val(1);
			self.retrieve();
			e.stopPropagation();
		});

		self._code.find(".btnCreate").on("click",function(e){
			//self.load()
			let $div = $('template#companyInsertDiv');
			self._parent.openLayer($div.html(), self.companyEvent);
			e.stopPropagation();
		});
		self._code.find(".btnExcelUpload").on("click",function(e){
			let $div = $('template#customerExcelInsert');
			self._parent.openLayer($div.html(), self.excelUploadEvent);
			e.stopPropagation();
		});
		

		self._code.find(".btnTransDelete").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let chkBoxs = tbody.find("input[name=cuSeq]:checked");
			if(chkBoxs.length==0){
				alert("삭제할 대상을 선택 하십시오");
				return;
			}else if(chkBoxs.length>1){
				alert("삭제는 1건씩 가능 합니다.");
				self._code.find("input[name=chckAll]").prop("checked", false);
				for(let i in chkBoxs) {
					if (chkBoxs[i].checked) {
						chkBoxs[i].checked = false;
					}
				}
				return;
			}

			confirm('삭제하시겠습니까?', function(data){
				if(data) {
					let cuSeq = chkBoxs.val();

					self.delete({cuSeq : cuSeq}, function(resp) {
						if(resp.code==0) {
							self.retrieve();
							alert('삭제되었습니다');
						} else {
							self._code.find("input[name=chckAll]").prop("checked", false);
							for(let i in chkBoxs) {
								if (chkBoxs[i].checked) {
									chkBoxs[i].checked = false;
								}
							}
							alert(resp.message);
						}
					});
				}
			});
		});

		self._code.find("input[name=chckAll]").on("click",function(e){
			e.stopPropagation();

			let tbody = self._code.find(".dataListTable tbody");
			let boxs = tbody.find("input[name=cuSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
			
		});

		// 목록 테이블 이벤트 정의
		let searchWrap = self._code.find(".searchWrapArea");
		let thead = self._code.find(".dataHeadTable thead");
		let tfoot = self._code.find(".pageInfoTfoot");
		let tbody = self._code.find(".dataListTable tbody");
		searchWrap.on('keypress','input[type=text]',function(e) {
			if(e.keyCode == 13){
				if($(this).val() != ''){
					self._code.find(".pageInfoTfoot input[name=page]").val(1);
					self.retrieve();
				}
			}
		});
		thead.on("click",".sortTd",function(){
			let column = $(this).attr("column");
			let order = searchWrap.find("input[name=orderby]").val();
			order = (order == "DESC")?"ASC":"DESC";
			searchWrap.find("input[name=orderculumn]").val(column);
			searchWrap.find("input[name=orderby]").val(order);
			self._utils.tHeadOrderBy($(this),order);
			self.retrieve();
			
		});
		self._defaultData = self._utils.serializeObject(searchWrap);
		thead.on("click",".fa-rotate-right",function(){
			let $tr = $(this).closest("tr");
			self._utils.unSerializeObject(searchWrap,self._defaultData );
			$tr.find(".sortTd img").attr("src","/images/btn/btn_sort2.png");
			self.retrieve();
		});
		let rowsPerPage = localStorage.getItem('rowsPerPage');
		if(!self._utils.checkEmptyNull(rowsPerPage)) tfoot.find("select[name=rowsPerPage]").val(rowsPerPage);
		tfoot.find("select[name=rowsPerPage]").on("change",function(){
			 localStorage.setItem('rowsPerPage',$(this).val());
			tfoot.find("input[name=page]").val("1");
			self.retrieve();
		});
		tbody.on('click','.btnMemberMenu', function() {
			let _data = $(this).closest('tr').data('ROW');
			// 회원사 메뉴데이터를 먼저 읽어온다
			self.menuList({cSeq:_data.cSeq}, function(resp){
				if(resp.code == 0) {
					let $div = $('template#companyMenuSetting');
					self._parent.openLayer($div.html(), self.companyMenuEvent, {cSeq:_data.cSeq,menuList:resp.data});
				} else {
					alert('회원사데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.btnCustomerMenu', function() {
			let _data = $(this).closest('tr').data('ROW');
			// 회원사 메뉴데이터를 먼저 읽어온다
			self.customerMenuList({cSeq:_data.cSeq}, function(resp){
				if(resp.code == 0) {
					let $div = $('template#companyMenuSetting');
					self._parent.openLayer($div.html(), self.companyCustomerMenuEvent, {cSeq:_data.cSeq,menuList:resp.data});
				} else {
					alert('회원사데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.btnOpenInfo',  function(){
			let _data = $(this).closest('tr').data('ROW');
			self.load({cSeq:_data.cSeq}, function(resp){
				if(resp.code == 0) {
					let $div = $('template#companyInsertDiv');
					self._parent.openLayer($div.html(), self.companyEvent, resp.data);
				} else {
					alert('데이터를 불러올 수 없습니다');
					return false;
				}
			});
		});
		tbody.on('click','.customerEmployee', function(){
			let _data = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#customerEmployee');
			self._parent.openLayer($popDiv.html(), self.employeeListEvent,_data);

			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.reloadLayer);
			});
			*/
		});
		tbody.on('click','.cuNm',function(){
			let d = $(this).closest('tr').data('ROW');
			self._parent._popup.customerView(d);			
		});

		self.retrieve();
		
	}
	searchData = () => {
		const self = this;
		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchWrap = self._code.find(".searchWrapArea");
		let orderColumn = searchWrap.find("input[name=orderculumn]").val();
		let orderType = searchWrap.find("input[name=orderby]").val();
		let searchColumn = searchWrap.find("select[name=searchColumn]").val();
		let searchWord = searchWrap.find("input[name=searchWord]").val();
		let cuTypeCd = searchWrap.find("select[name=cuTypeCd]").val();

		let searchData = {
			cuTypeCd : cuTypeCd,
			cuImportantYn : 'N',
			page : page,
			rows : pageSize,
			orderColumn : orderColumn,
			orderType : orderType,
			searchColumn : searchColumn,
			searchWord : searchWord
		}
		return searchData;
	}
	retrieve = () => {
		const self = this;

		let pageTfoot = self._code.find(".pageInfoTfoot");
		let pageSize = pageTfoot.find("select[name=rowsPerPage]").val();
		let page = pageTfoot.find("input[name=page]").val();

		let searchData = self.searchData();

		self.list(searchData, function(resp){
			let tbody = self._code.find(".dataListTable tbody");
			let thead = self._code.find(".dataHeadTable thead");
			$('.searchRunTime',self._code).text(self._utils.currentTime());
			tbody.empty();
			
			let total = 0;
			let totalPage = 0;

			if(resp != null && resp.length > 0) {
				for(let i in resp){
					if(i==0){
						total = resp[i].totalCnt;
						totalPage = Math.ceil(total / pageSize);
					}
					self.display(tbody, resp[i]);
				}
			} else {
				$('<tr><td colspan="'+ thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo(tbody);
			}
			
			self._utils.mdiPaging(pageTfoot.find(".pagenate"),total,pageSize,totalPage,10,page,self.goPage);
		});
	}
	display = ($tbody, d) => {
		const self = this;
		let $tr = $('<tr />');
		$tr.append('<td style="border:1px solid #dedede;" ><input type="checkbox" class="vm" name="eSeq" value="'+d.cSeq+'"/>');
		$tr.append('<td class="al" style="border:1px solid #dedede;">'+self._utils.nullTostring(d.cNm, '')+'</td>');
		$tr.append('<td class="ac" style="border:1px solid #dedede;">'+self._utils.nullTostring(d.cOwnerNm, '')+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+self._utils.convertBizNo(d.cBizNo) +'</td>');
		$tr.append('<td class="al" style="border:1px solid #dedede;">'+d.cDomain.replace(/,/g,'<br>') +'</td>');
		$tr.append('<td class="al" style="border:1px solid #dedede;">'+(self._utils.nullTostring(d.cAddr, '') + ' '+self._utils.nullTostring(d.cAddrDetail, ''))+'</td>');
		let expiryTag = self._utils.dateformatStringToDate(d.expiryDt);
		if(self._utils.currentDate() > expiryTag ) expiryTag = '<strong style="color:red;">'+ expiryTag +'</strong>';
		$tr.append('<td style="border:1px solid #dedede;">'+ expiryTag +'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+d.empCnt+'</td>');
		$tr.append('<td style="border:1px solid #dedede;">'+d.loginCnt+'</td>');
		$tr.append($('<td style="border:1px solid #dedede;" class="al"/>').text(self._utils.strMaxCuttion(self._utils.nullTostring(d.cMemo,''),20)).attr("title",d.cMemo));
		$tr.append('<td style="border:1px solid #dedede;">'+d.creDate.substring(0,16)+'</td>');
		$tr.append('<td style="border:1px solid #dedede;"><i class="fa-brands fa-elementor cursorPointer btnMemberMenu" title="회원사 메뉴 권한 설정"></i></td>');
		$tr.append('<td style="border:1px solid #dedede;"><i class="fa-brands fa-elementor cursorPointer btnCustomerMenu" title="거래처 메뉴 권한 설정"></i></td>');
		$tr.append('<td style="border:1px solid #dedede;"><i class="fa-regular fa-pen-to-square btnOpenInfo cursorPointer" style="font-size:14px;" title="직원정보 수정"></i></td>');
		$tr.data("ROW",d);
		$tr.appendTo($tbody);
	}

	companyEvent = (popupID, info) => {
		let self = this;
		let $layerObject = $('#'+ popupID);
		if(info != undefined){
			$layerObject.data(info);
			self._utils.unSerializeObject($layerObject, info);
			if(info.fileInfo && info.fileInfo.length > 0) {
				self._fileSeq = info.fileInfo[0].fileSeq;
				$('#uploadProfie-preview').attr('src', __FILE_DOMIN+info.fileInfo[0].path.replace('kprintfactory', ''));
			}
		}

		self._utils.focusEvent($('input[name=cBizNo]',$layerObject), 'bizNo');
		self._utils.focusEvent($('input[name=cTel],input[name=cFax]',$layerObject), 'tel');

		$('.btnAddrSearch', $layerObject).on('click', function(e){
			new daum.Postcode({
				oncomplete: function(data) {
						// data.zonecode 새 우편번호
						let roadAddr = data.roadAddress; // 도로명 주소 변수
						$('input[name=cZipcode]',$layerObject).val(data.zonecode);
						$('input[name=cAddr]',$layerObject).val(roadAddr);
				}
			}).open();
		});
		$('.btnAddFile', $layerObject).on('click', function(e){
			e.preventDefault();
			  $('#uploadProfie').trigger('click');
		});

		$("#uploadProfie", $layerObject).on("change", function(event) {
			let file = event.target.files[0];
			if(file.size > self._imagesize) {
					$(this).val('');
					alert('파일 용량은 2MB 이하로 제한됩니다.');
					return false;
			}

			var reader = new FileReader(); 
			reader.onload = function(e) {
				$("#uploadProfie-preview").attr("src", e.target.result);
			}
			reader.readAsDataURL(file);
		});

		$layerObject.on('click', '.save', function(){
			let d = $layerObject.data();
			if(self._utils.checkRequired($layerObject)){
				// 로고 이미지 업로드
				const mPromise = new Promise((resolve, reject) => {
					if($('input[name=upfile]',$layerObject)[0].files[0]) {
							self.mediaUpload($('input[name=upfile]')[0].files[0], function(resp){
									if(resp == -9999) {
										reject(new Error("upload  is failed"));
									}
									//resolve(resp.id);
									resolve(resp.fileSeq);
							});
					} else {
							resolve(self._fileSeq??undefined);
					}
				});

				mPromise.then((res) => {
					let mapData = self._utils.serializeObject($layerObject);
					if(res != undefined) mapData.fileSeq = res;
					if(d.cSeq != undefined){
						mapData.cSeq = d.cSeq;
						self.update(mapData, function(resp){
							if(resp.code==0) {
								$(".btnClosePopLayer",$layerObject).trigger('click');
								alert('저장되었습니다.');
								self.retrieve();
							} else {
								alert(resp.message);
							}
						});
					}else{
						self.insert(mapData, function(resp){
							if(resp.code==0) {
								$(".btnClosePopLayer",$layerObject).trigger('click');
								alert('등록되었습니다.');
								self.retrieve();
							} else {
								alert(resp.message);
							}
						});
					}
				}).catch((error) => {
					alert('로고 이미지 업로드 에러');
				});
			}
			
		});
	}

	companyMenuEvent = (popupID, data) => {
		const self = this;
		let layerObject = $(`#${popupID}`);
		let menuList = data.menuList;
		$(`.title`, layerObject).text("메뉴 설정");
		let tbody = $('.menuList', layerObject);
		let mapData = {ctl : 'menu',cmd : 'menu',};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		let mSeqs = [];
		for(let i=0;i<menuList.length;i++) mSeqs.push(menuList[i].mSeq);
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				for(let i=0;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let is = (mSeqs.indexOf(d.mSeq) > -1);
					let tr = $('<tr/>');
					tr.append($('<td class="al pl10" style="">'+ d.mgNm +'</td>'));
					tr.append($('<td style="border:1px solid #9ac7e1 !important;border-right-width: 0 !important;"><input type="checkbox" name="mSeq" value="'+ d.mSeq +'" '+((is)?' checked':'')+'></td>'));
					tr.append($('<td class="al" style="border:1px solid #9ac7e1 !important;border-left-width: 0 !important;border-right-width: 0 !important;">'+ d.mNm +'</td>'));
					tr.data(d);
					tbody.append(tr);
				}
				tbodyMerge(tbody,[0]);
			}
			function tbodyMerge($tbody, indexs){
				let info = {};
				let $trs = $tbody.children();
				let $beferTr = null; 
				for(let r=($trs.length-1);r>=0;r--){
					let $nowTr = $($trs[r]);
					let data = $nowTr.data();
					if(data.mgSeq == undefined) continue;
					let d = data.mgSeq;
					if($beferTr==null){
						for(let t=0;t<indexs.length;t++){	
							info[indexs[t]] = 1;
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							if(t==0){
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;border-left-width: 0 !important;');
							}else{
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;');
							}
						}
					}else{
						let beferD = $beferTr.data().mgSeq;
						for(let t=(indexs.length-1);t>=0;t--){	
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							if(t==0){
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;border-left-width: 0 !important;');
							}else{
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;');
							}
							if(d == beferD &&  $($beferTr.children()).eq(indexs[t]).text() == $($nowTr.children()).eq(indexs[t]).text()){
								$($nowTr.children()).eq(indexs[t]).attr("rowspan",info[indexs[t]]+1);
								$($beferTr.children()).eq(indexs[t]).remove();
								info[indexs[t]]++;
							}else{
								info[indexs[t]] = 1;
							}
						}
					}
					$beferTr = $($trs[r]);
				}
			}
		});

		layerObject.find("input[name=menuAll]").on("click",function(e){
			e.stopPropagation();
			let boxs = tbody.find("input[name=mSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
		});

		layerObject.on('click','.memuSave', function(e){
			let menuInfo = [];
			let chkBoxs = tbody.find("input[name=mSeq]:checked");
			for(let i=0;i<chkBoxs.length;i++) menuInfo.push($(chkBoxs[i]).val());
			let mapData = {ctl : 'menu',cmd : 'companyMenuSet',cSeq : data.cSeq, menuInfo: JSON.stringify(menuInfo)};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$("body .btnClosePopLayer").trigger('click');
					alert("저장되었습니다.");
				}else{
					alert(rdata.message);
				}
			});

		});
	}
	companyCustomerMenuEvent = (popupID, data) => {
		const self = this;
		let layerObject = $(`#${popupID}`);
		let menuList = data.menuList;
		$(`.title`, layerObject).text("메뉴 설정");
		let tbody = $('.menuList', layerObject);
		let mapData = {ctl : 'menu',cmd : 'menu', mUseType : 'customer'};
		let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
		let mSeqs = [];
		for(let i=0;i<menuList.length;i++) mSeqs.push(menuList[i].mSeq);
		_api.ajaxformdata(function(rdata){ 
			if(rdata.code==0) {
				for(let i=0;i<rdata.data.length;i++){
					let d = rdata.data[i];
					let is = (mSeqs.indexOf(d.mSeq) > -1);
					let tr = $('<tr/>');
					tr.append($('<td class="al pl10" style="">'+ d.mgNm +'</td>'));
					tr.append($('<td style="border:1px solid #9ac7e1 !important;border-right-width: 0 !important;"><input type="checkbox" name="mSeq" value="'+ d.mSeq +'" '+((is)?' checked':'')+'></td>'));
					tr.append($('<td class="al" style="border:1px solid #9ac7e1 !important;border-left-width: 0 !important;border-right-width: 0 !important;">'+ d.mNm +'</td>'));
					tr.data(d);
					tbody.append(tr);
				}
				tbodyMerge(tbody,[0]);
			}
			function tbodyMerge($tbody, indexs){
				let info = {};
				let $trs = $tbody.children();
				let $beferTr = null; 
				for(let r=($trs.length-1);r>=0;r--){
					let $nowTr = $($trs[r]);
					let data = $nowTr.data();
					if(data.mgSeq == undefined) continue;
					let d = data.mgSeq;
					if($beferTr==null){
						for(let t=0;t<indexs.length;t++){	
							info[indexs[t]] = 1;
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							if(t==0){
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;border-left-width: 0 !important;');
							}else{
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;');
							}
						}
					}else{
						let beferD = $beferTr.data().mgSeq;
						for(let t=(indexs.length-1);t>=0;t--){	
							let style = $($nowTr.children()).eq(indexs[t]).attr('style');
							if(t==0){
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;border-left-width: 0 !important;');
							}else{
								$($nowTr.children()).eq(indexs[t]).attr('style',((style==undefined) ?'':style)+'background-color:#deebf2;border:1px solid #9ac7e1 !important;');
							}
							if(d == beferD &&  $($beferTr.children()).eq(indexs[t]).text() == $($nowTr.children()).eq(indexs[t]).text()){
								$($nowTr.children()).eq(indexs[t]).attr("rowspan",info[indexs[t]]+1);
								$($beferTr.children()).eq(indexs[t]).remove();
								info[indexs[t]]++;
							}else{
								info[indexs[t]] = 1;
							}
						}
					}
					$beferTr = $($trs[r]);
				}
			}
		});

		layerObject.find("input[name=menuAll]").on("click",function(e){
			e.stopPropagation();
			let boxs = tbody.find("input[name=mSeq]"); 
			let status = $(this).is(":checked");
			for(let i=0;i<boxs.length;i++){
				let box = $(boxs[i]);
				if(box.is(":checked") != status) box.trigger('click');
			}
		});

		layerObject.on('click','.memuSave', function(e){
			let menuInfo = [];
			let chkBoxs = tbody.find("input[name=mSeq]:checked");
			for(let i=0;i<chkBoxs.length;i++) menuInfo.push($(chkBoxs[i]).val());
			let mapData = {ctl : 'menu',cmd : 'companyCustomerMenuSet',cSeq : data.cSeq, menuInfo: JSON.stringify(menuInfo)};
			let _api = new AjaxCall(self._const, mapData, {'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				if(rdata.code==0) {
					$("body .btnClosePopLayer").trigger('click');
					alert("저장되었습니다.");
				}else{
					alert(rdata.message);
				}
			});

		});
	}

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'list'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					if(rdata.code==0) {
						cbfunc(rdata.data);
					} else {
						cbfunc(null);
					}
			});
	}

	load = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'load'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	insert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'insert'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	update = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
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
	delete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'delete'
		}

		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
				cbfunc(rdata);
			});
	}
	mediaUpload = (file, cbfunc) => {
		let self = this;

		let form_data = new FormData();
				form_data.append('ctl', 'media');
				form_data.append('cmd', 'upload');
				form_data.append('directory', 'company');
				//form_data.append('target', 'P');
				form_data.append('authLevel', 3);
				form_data.append('upfile', file);
				
				let _api = new AjaxCall(self._const
						,form_data
						,{'isasync':false, 'wapi': 'user/fws','spinner':true});
						_api.ajaxfiledata(function(rdata){ 
								if(rdata.code == 0) {
										cbfunc(rdata.data);
								} else {
										alert(rdata.message);
										cbfunc(-9999);
								}
						});
	}
	menuList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'menu',
			cmd : 'companyMenu'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	customerMenuList = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'menu',
			cmd : 'customerMenu'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
}
export default companyController