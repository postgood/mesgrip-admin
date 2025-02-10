
'use strict';
import Utils from '../../raon_modules/utils.js';
import AjaxCall from '../../raon_modules/AjaxCall.js';


let connectionController = class {

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

		self.display();

		$('.btnSave', self._code).on('click', function(e){
			let $tr = $(this).closest('tr');
			let d = self._utils.serializeObject($tr);
			let keys = Object.keys(d);
			let isSend = false;
			for(let key of keys){
				if(!self._utils.checkEmptyNull(d[key])){
					isSend = true;
					break;
				}
			}
			if(isSend){
				let info = $($tr).data("ROW");
				if(info!=undefined){
					d.coaSeq = info.coaSeq;
					self.update(d, function(rdata){
						if(rdata.code == 0){
							alert('저장 되었습니다.');
						}else{
							alert(rdata.message);
						}
					});
				}else{
					d.coaType = $tr.attr("name");
					self.insert(d, function(rdata){
						if(rdata.code == 0){
							alert('등록 되었습니다.');
						}else{
							alert(rdata.message);
						}
					});
				}
			}else{
				alert('정보 입력이 필요합니다.');
			}
		});

		$('.btnDelete', self._code).on('click', function(e){
			let $tr = $(this).closest('tr');
			let info = $($tr).data("ROW");
			if(info!=undefined){
				self.delete({coaSeq:info.coaSeq}, function(rdata){
					if(rdata.code == 0){
						alert('삭제 되었습니다.');
						$('input',$tr).val('');
					}else{
						alert(rdata.message);
					}
				});
			}
		});

	}

	purge = () => {
		const self = this;

		console.log("employeeController purge");
	}

	reload = () => {
		const self = this;

		console.log("employeeController reload");
	}

	display = () => {
		const self = this;

		self.list(null, function(resp){
			if(resp.code == 0) {
				let _data = resp.data;
				for(let i=0;i<_data.length;i++){
					let d = _data[i];
					let $tr = $('.'+ d.coaType, self._code);
					$tr.data('ROW',d);
					$('input[name=coaDomain]',$tr).val(d.coaDomain);
					$('input[name=coaPort]',$tr).val(d.coaPort);
					$('input[name=coaId]',$tr).val(d.coaId);
					$('input[name=coaPwd]',$tr).val(d.coaPwd);
					$('input[name=coaEtc1]',$tr).val(d.coaEtc1);
				}
			} else {
				alert(resp.message);
			}
		});
	}

	list = (_mapData, cbfunc) => {
		const self = this;

		let mapData = {
			ctl : 'company',
			cmd : 'apiAccountList'
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
			cmd : 'apiAccountUpdate'
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
			cmd : 'apiAccountDelete'
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
			cmd : 'apiAccountInsert'
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
export default connectionController