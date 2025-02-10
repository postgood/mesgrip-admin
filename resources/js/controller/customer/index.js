'use strict';

// 거래처 화면 기능
import cuOrderController from './cuOrderController'
import cuInfoController from './cuInfoController'

let CustomerController = class {
	constructor(_const,_data,_param,_parent) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
	}

	init = () => {
			const self = this;
			
			self._cuOrder =  new cuOrderController(self._parent, self._const);

			self._cuInfo =  new cuInfoController(self._parent, self._const);

	}

	onControllerAction = (_target,_cmd,_code=null,_data=null) => {
		const self = this;
				switch(_cmd) {
						case 'init':
								self['_'+_target].init(_code,_data);
								break;
						case 'purge':
								self['_'+_target].purge();
								break;
						case 'reload':
								self['_'+_target].reload();
								break;
						case 'retrieve':
							self['_'+_target].retrieve();
							break;								
				}
	}

}
export default CustomerController;