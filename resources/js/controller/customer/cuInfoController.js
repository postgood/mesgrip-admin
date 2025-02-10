
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let cuInfoController = class {

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


		self._code.find(".btnAddEmployee").on("click",function(e){
			let $popDiv = $('template#employeeDiv');
			self._parent.openLayer($popDiv.html(), self.initNewLayer);
/*			
			self.layerView(function(data){
				self._parent.openLayer(data, self.initNewLayer);
			});
*/			
			e.stopPropagation();
		});


		let $form = $('#frmCompany',self._code);
		self._utils.focusEvent($('input[name=cuBizNo]',$form), 'bizNo');
		self._utils.focusEvent($('input[name=cuTel]',$form), 'tel');
		self._utils.focusEvent($('input[name=cuFax]',$form), 'tel');
		

		self._code.find('.btnSave').on('click',function(){

			
			let data = {};
			data.cuNm = $('input[name=cuNm]',$form).val();
			data.cuOwnerNm = $('input[name=cuOwnerNm]',$form).val();
			data.cuBizNo = $('input[name=cuBizNo]',$form).val();
			data.cuBizNoNum = $('input[name=cuBizNoNum]',$form).val();
			data.cuUpjong = $('input[name=cuUpjong]',$form).val();
			data.cuJongmok = $('input[name=cuJongmok]',$form).val();
			data.cuZipcode = $('input[name=cuZipcode]',$form).val();
			data.cuAddr = $('input[name=cuAddr]',$form).val();
			data.cuAddrDetail = $('input[name=cuAddrDetail]',$form).val();
			data.cuFax = $('input[name=cuFax]',$form).val();
			data.cuTel = $('input[name=cuTel]',$form).val();
			data.cuInvoiceEmail = $('input[name=cuInvoiceEmail]',$form).val();

			// self._utils.unSerializeObject($form);
			self.update(data, function(rdata){
				if(rdata.code == 0){
					alert('수정되었습니다.');
				}else{
					alert(rdata.message);
				}
			});

		});

		

		// 목록 테이블 이벤트 정의
		let $tbody = self._code.find(".cuEmployeeList tbody");
		$tbody.on('click','.customerEmployee', function(){
			let _data = $(this).closest('tr').data('ROW');
			let $popDiv = $('template#employeeDiv');
			self._parent.openLayer($popDiv.html(), self.initLoadLayer,_data);

			/*
			self.layerView(function(data){
				self._parent.openLayer(data, self.reloadLayer);
			});
			*/
		});
		

		self.retrieve();
	}

	initNewLayer = (popupID) =>{
		const self = this;
		const $layerObject = $(`#${popupID}`);
		$(`.title`, $layerObject).text("직원 등록");
		$(`.btnSearch.save`, $layerObject).text("등록");
		$('.btnChangePwd',$layerObject).remove();
		$('.employeeDelete',$layerObject).remove();
		
		self.eventAction($layerObject);
	}
	initLoadLayer = (popupID,d) =>{
		const self = this;
		const $layerObject = $(`#${popupID}`);

		self._utils.unSerializeObject($layerObject , d);

		$(`.title`, $layerObject).text("직원 수정");
		$(`.btnSearch.save`, $layerObject).text("수정");
		$('input[name=eId]', $layerObject).attr('disabled',true).css('border-width', '0px').css('background-color','transparent');
		//$('input[name=ePwd]', $layerObject).remove();
		//$('input[name=reEPwd]', $layerObject).remove();
		if(d.eManagerYn == 'Y')	$('.employeeDelete',$layerObject).remove();
		self.eventAction($layerObject, d);
	}

	eventAction = ($layerObject, d)=>{
		let self = this;

		self._utils.focusEvent($('input[name=eTel]',$layerObject), 'tel');

		$('.employeeDelete', $layerObject).on('click',function(){

			confirm('직원을 삭제 처리 하시겠습니까?', function(data){
				if(data) {
					let info = $layerObject.data();
					if(info.eManagerYn == 'N'){
						self.employeeDelete({eSeq : info.eSeq}, function(resp) {
							if(resp.code==0) {
								self.employeeRetrieve();
								alert('삭제 되었습니다');
							} else {
								//self._code.find("input[name=chckAll]").prop("checked", false);
								alert(resp.message);
							}
						});
					}else{
						alert('관리자는 삭제 할 수 없습니다.');
					}
				}
			},'직원 삭제');
		});

		$('input[name=eId]',$layerObject).on('change', function(){
			let eId = $(this).val();
			let $idOverlapCheck = $('.idOverlapCheck',$layerObject);
			if(!self._utils.checkEmptyNull(eId)){
				self.idOverlapCheck({eId: eId}, function(rdata){
					if(rdata.code == 0){
						if(rdata.data.check){
							$idOverlapCheck.css('color','blue').text('사용가능');
							self._idOverlapcheck = 'Y';
						}else{
							$idOverlapCheck.css('color','red').text('사용불가');
							self._idOverlapcheck = 'N';
						}
					}
				});
			}else{
				$idOverlapCheck.css('color','blue').text('');
			}
		});
		$('.btnChangePwd', $layerObject).on('click', function(){
			let _ePwd = $('input[name=ePwd]', $layerObject).val();
			let _reEPwd = $('input[name=reEPwd]', $layerObject).val();
			if(_ePwd.trim() == ''){
				alert('비밀번호를 입력해 주세요');
				return false;
			}
			if(_ePwd != _reEPwd) {
				alert('비밀번호를 확인해 주세요');
				return false;
			}
			let info = $layerObject.data();
			let mapData = {
				changepwd : 'N',
				eSeq : info.eSeq,
				ePwd : _ePwd
			}

			self.changepwd(mapData, function(resp){
				if(resp.code == 0) {
					$('input[name=ePwd], input[name=reEPwd]',$layerObject).val('');
					alert('변경되었습니다');
				} else {
					alert('변경 실패하였습니다');
				}
			});
		});
		$('.employeeSave',$layerObject).on('click', function(){
			let info = $layerObject.data();
			let data = self._utils.serializeObject($layerObject);
			if(self._utils.checkEmptyNull(data.eNm)){
				alert("이름을 입력하십시오");
				return false;
			}
			if(self._utils.checkEmptyNull(data.eTel)){
				alert("전화번호를 입력하십시오");
				return false;
			}
			if(info.eSeq != undefined){
				data.eSeq = info.eSeq;
				self.employeeUpdate(data, function(rdata){
					if(rdata.code == 0){
						self.employeeRetrieve();
						$(".btnClosePopLayer", $layerObject).trigger('click');
						alert('수정 되었습니다.');
					}else{
						alert(rdata.message);
					}
				});
			}else{
				
				if(self._utils.checkEmptyNull(data.eId)){
					alert("아이디를 입력하십시오");
					return false;
				}
				if(self._utils.checkEmptyNull(data.ePwd)){
					alert("비밀번호를 입력하십시오");
					return false;
				}
				if(self._utils.checkEmptyNull(data.reEPwd)){
					alert("확인 비밀번호를 입력하십시오");
					return false;
				}
				if(data.ePwd != data.reEPwd){
					alert("비밀번호를 정확히 입력하십시오");
					return false;
				}
				
				if(self._idOverlapcheck != 'Y'){
					alert("사용 가능한 아이디를 입력하십시오");
					return false;
				}
				data.eLoginYn = 'Y';
				self.employeeInsert(data, function(rdata){
					if(rdata.code == 0){
						self.employeeRetrieve();
						$(".btnClosePopLayer", $layerObject).trigger('click');
						alert('등록 되었습니다.');
					}else{
						alert(rdata.message);
					}
				})
			}
		});
		
		if(d != undefined){
			$layerObject.data(d);
			self._utils.unSerializeObject($layerObject,d);
			$('input[name=eTel]',$layerObject).trigger('focusout');
		}
	}

	purge = () => {
		const self = this;

		console.log("customerController purge");
	}

	reload = () => {
		const self = this;

		console.log("customerController reload");
	}

	goPage = (page) => {
		const self = this;
		
		let tfoot = self._code.find(".pageInfoTfoot");
		tfoot.find("input[name=page]").val(page);

		self.retrieve();
	}

	retrieve = () => {
		const self = this;
		let $frmCompany = $('#frmCompany', self._code);

		self.load(function(resp){
			self._utils.unSerializeObject($frmCompany, resp.data);
			$('input[name=cuBizNo]',$frmCompany).trigger('focusout');
			$('input[name=cuTel]',$frmCompany).trigger('focusout');
			$('input[name=cuFax]',$frmCompany).trigger('focusout');
		});
		self.employeeRetrieve();
/*		
		self.employeeList( function(resp){
			let $tbody = self._code.find(".cuEmployeeList tbody");
			let $thead = self._code.find(".cuEmployeeList thead");
			$tbody.empty();

			if(resp.code == 0) {
				if(resp.data.length > 0){
					for(let i in resp.data)	self.display($tbody, resp.data[i]);
				}else{
					$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
				}
			} else {
				alert(resp.message);
			}
			

		});
*/		
	}

	employeeRetrieve = () => {
		const self = this;
		self.employeeList( function(resp){
			let $tbody = self._code.find(".cuEmployeeList tbody");
			let $thead = self._code.find(".cuEmployeeList thead");
			$tbody.empty();

			if(resp.code == 0) {
				if(resp.data.length > 0){
					for(let i in resp.data)	self.display($tbody, resp.data[i]);
				}else{
					$('<tr><td colspan="'+ $thead.find('th').length +'">데이타가 없습니다.</td></tr>').appendTo($tbody);
				}
			} else {
				alert(resp.message);
			}
		});
	}
	
	display = ($tbody, d) => {
		const self = this;
		let $tr = $('<tr />');
		let icon = '<i class="fa-solid fa-user" title="직원"></i>';
		if (d.eManagerYn == 'Y'){
			icon = '<i class="fa-solid fa-user-tie" style="color:blue;" title="관리자"></i>';
		}

		$tr.append($('<td class="ac customerEmployee cursorPointer" style="padding-left:0px;" />').append(icon));
		$tr.append($('<td class="ac customerEmployee cursorPointer" />').append(d.eNm));
		$tr.append($('<td class="ac customerEmployee cursorPointer" />').append(d.eRank));
		$tr.append($('<td class="ac customerEmployee cursorPointer" />').append(d.eId));
		$tr.append($('<td class="ac customerEmployee cursorPointer" />').append(self._utils.convertTel(d.eTel)));
		
		$tr.data("ROW",d);
		$tbody.append($tr);
	}

	
	load = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'customer',
			cmd : 'load'
		}

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
			ctl : 'employee',
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

	bizSelect = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'common',
			cmd : 'bizSelect'
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}

	employeeList = (cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'list',
			rows : 9999
		}

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	employeeDetail = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'load',
		}
		$.extend(mapData,_mapData);

		let _api = new AjaxCall(self._const
			,mapData
			,{'wapi': 'user/ws','spinner':true});
			_api.ajaxformdata(function(rdata){ 
					cbfunc(rdata);
			});
	}
	employeeInsert = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	employeeUpdate = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	employeeDelete = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
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
	changepwd = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'pwdChange'
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
			ctl : 'customer',
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
	idOverlapCheck = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'employee',
			cmd : 'idCheck'
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
export default cuInfoController