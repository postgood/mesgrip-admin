import Utils from './utils.js'

let SendData = function(_prop){
    let _properites= {
            api_url : undefined,
            url : '',
            method : 'POST',
            contentType : 'application/json',
            dataType : 'json',
            isasync : true,
            sendtype: 'formdata',
            encKey : undefined,
            code : undefined,
            spinner : true,
            encdata : false
        };

    let _const = {}; // constdata
    let _data = {};
    let _util = new Utils();

        $.extend(_properites,_prop);
        function sendFormData(cbfunc){
            let _paramdata = {};
            if(_const.__ISENCPARAM){    
                _paramdata = {
					'ctl' : _data.ctl,
					'cmd' : _data.cmd,
                    'encdata' : _util._encrypt( JSON.stringify(_data),_const.__ENCKEY),
					'encrypt' : true
                }
            }  else {
                _paramdata = _data;
				_paramdata.encrypt = false;
            }
			
            $.ajax({
                url: (_properites.api_url?_properites.api_url:_const.__URL_API) +'/'+ _properites.url, //+_properites.action,
                method: _properites.method,
                contentType: _properites.contentType,
                dataType: _properites.dataType,
                async: _properites.isasync,
                global:false,
                processData: false,
                data: JSON.stringify(_paramdata),
				crossDomain: true,
                beforeSend: function(xhr) {
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
					xhr.setRequestHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
					xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-XSRF-TOKEN,Access-Control-Allow-Headers,Access-Control-Allow-Origin");
                    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
					// xhr.setRequestHeader("Content-Type", "application/json");
					// xhr.setRequestHeader("X-HTTP-Method-Override", "POST");

					if( _const.__ACCESSTOKEN)
					{
						xhr.setRequestHeader("Authorization", "Bearer "+_const.__ACCESSTOKEN);
					}

                    if(_properites.spinner) {
                        _util.showLoading();
                    }
				},
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // console.log(XMLHttpRequest,textStatus,errorThrown);
                    if(_properites.spinner) {
                        _util.hideLoading();
                    }

                    if(XMLHttpRequest.status!=200){
                        try{
                            alert(XMLHttpRequest.responseJSON.message);
                        }catch(e){
                            alert(XMLHttpRequest.statusText);
                        }
                        return false;
                    }
                },
                success : function(resp){
                    
                    if(_const.__ISENCPARAM)
                    {
                        if(resp.data) {
							resp.data = _util.jsonDecode(_util._decrypt(resp.data,_const.__ENCKEY));
                        } else if(resp.navigatepageNums) {
                            if(resp.list.length>0) {
                                resp.list = _util._decrypt(resp.list[0],_const.__ENCKEY);
                            }
                        }
                    }

                    if(_const.__ISDEBUGDATA)
                    {
                        console.log('\n\n\n/*********** '+(_data.ctl??'')+'_'+(_data.cmd??''),_data,JSON.stringify(_data),resp,'**************/');
                    }
                    
                    if(_properites.spinner) {
                        _util.hideLoading();
                    }
                    cbfunc(resp);
                }
            });
        };

        function sendFileData(cbfunc){
             $.ajax({
                url: (_properites.api_url?_properites.api_url:_const.__URL_API) +'/'+ _properites.url, //+_properites.action,
                method: 'POST',
                mimeType:'multipart/form-data',
                dataType: _properites.dataType,
                // async: false,
                contentType: false,
                cache: false,
                processData:false,
                timeout : 0,
                data: _data,
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
					xhr.setRequestHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
					xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-XSRF-TOKEN,Access-Control-Allow-Headers,Access-Control-Allow-Origin");
                    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
					// xhr.setRequestHeader("Content-Type", "application/json");
					// xhr.setRequestHeader("X-HTTP-Method-Override", "POST");

					if( _const.__ACCESSTOKEN)
					{
						xhr.setRequestHeader("Authorization", "Bearer "+_const.__ACCESSTOKEN);
					}
                    if(_properites.spinner) {
                        _util.showLoading();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _util.hideLoading();
                    if(XMLHttpRequest.status!=200){
                        alert(XMLHttpRequest.responseJSON.message);
                        return false;
                    }
                },
                success : function(resp){
                    if(_const.__DEBUGDATA)
                    {
                        console.log('/**'+_properites.url+'-request**/',_data);
                        console.log('/**'+_properites.url+'-response**/',resp);
                    }
                    if(_properites.spinner) {
                        _util.hideLoading();
                    }
                    cbfunc(resp);

                }
            });
        };

        function _setConst(data){
            _const = data;
            // Object.freeze(_const);
        };

        function _setData(data,type){
            // console.log(data,type);
            switch(type)
            {
                case '_data':
                    _data = data;
                break;
                case '_properites':
                    $.extend(_properites,data);
                break;
            }
        };

    return {
        init : function(data)
        {
            _setConst(data);
        },
        resetData : function(cbfunc)
        {
            _data = {};
            _properites = {
                method : 'POST',
                dataType : 'json',
                isasync : true,
                sendtype: 'formdata',
                code : undefined
            };
            cbfunc();
        },
        getData : function(data)
        {
            if (typeof data === 'string') {
                try {
                    // JSON 문자열인 경우 파싱
                    return JSON.parse(data);
                } catch (error) {
                    // JSON 파싱 오류 발생 시 문자열 그대로 반환
                    console.error('Error parsing JSON data:', error);
                    return data;
                }
            } else {
                // 문자열이 아닌 경우 그대로 반환
                return data;
            }
        },
        setData : function(data,type)
        {
            _setData(data,type);
        },
        procData : function(cbfunc)
        {
            if(_properites.sendtype=='filedata')
            {
                sendFileData( function(data){
                    cbfunc(data);
                });

            } else {
                sendFormData( function(data){
                    cbfunc(data);
                });
            }
        }
    };
};

class  AjaxCall {
	constructor (_const,_data,_options) {
		this._const = _const;
		this._data = _data?this._convert(_data):{};
		this._options = _options?_options:{
			isasync : true,
            wapi : 'public/ws'
		}

        let mode = 'ws';
        if(this._options.wapi != undefined){
            mode = this._options.wapi.split('/')[1];
        }    
        
        if(_const == undefined){
            this._options.wapi = 'public/'+ mode;
        }else{

            if(_const.__USER_LEVEL == 3){
                this._options.wapi = 'customer/'+ mode;
            }else if(_const.__USER_LEVEL == 4){
                this._options.wapi = 'user/'+ mode;
            }else if(_const.__USER_LEVEL > 4){
                this._options.wapi = 'admin/'+ mode;
            }else{
                this._options.wapi = 'public/'+ mode;
            }
        }
		this._filter = {}
	}

  	ajaxformdata = (cbfunc) => {
	  const self = this,
		  _data = SendData();
		  _data.init(self._const);
		  _data.setData({
              api_url : self._options.api_url || undefined,
			  url : self._options.wapi,
			  isasync : self._options.isasync!==undefined?self._options.isasync:true,
			  spinner :  self._options.spinner || false,
			  dataType : self._options.dataType || 'json',
			  sendtype : 'formdata',
			  method : 'POST'
		  },'_properites');
		  _data.setData(self._data,'_data');
		  _data.procData( function(data){
			  cbfunc(data);
		  });
  	}

	ajaxfiledata = (cbfunc) => {
	  const self = this,
		  _data = SendData();
		  _data.init(self._const);
		  _data.setData({
                api_url : self._options.api_url || undefined,
				url : self._options.wapi,
				isasync : self._options.isasync!==undefined?self._options.isasync:true,
				spinner :  self._options.spinner || false,
				dataType : self._options.dataType || 'json',
			  	sendtype : 'filedata',
			  	method : 'POST'
		  },'_properites');
		  _data.setData(self._data,'_data');
		  _data.procData( function(data){
			  cbfunc(data);
		  });
  	}
    ajaxdowndata = (cbfunc) => {
        let self = this,
        _data = SendData();
        _data.init(self._const);
        _data.setData({
                url : self._options.wapi,
                isasync : self._options.isasync || true,
                useloading :  self._options.useloading || false,
                dataType : self._options.dataType || 'blob',
                sendtype : 'downfile',
                method : 'POST'
        },'_properites');
        _data.setData(self._data,'_data');
        _data.procData( function(data){

            console.log(data);

            cbfunc(data);
        });
    }
    _convert = (d) => {
        if(d != undefined && typeof d == 'object'){
            let keys = Object.keys(d);
            for(let i=0;i<keys.length;i++){
                if(typeof d[keys[i]] == 'object'){
                    d[keys[i]] = JSON.stringify(d[keys[i]]);
                }
            }
        }
        return d;
    }
}

export default AjaxCall;