'use strict';

// 재고관리
import stockController from './stockController'
import stockTypeController from './stockTypeController'
import stockInoutController from './stockInoutController'
import stockPlaceController from './stockPlaceController'
import stockCategoryController from './stockCategoryController'
import stockFinishController from './stockFinishController'
import purchaseController from './purchaseController'

let CompanyController = class {
	constructor(_const,_data,_param,_parent) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
	}

	init = () => {
			const self = this;
			self._stock =  new stockController(self._parent, self._const);
			self._stockType =  new stockTypeController(self._parent, self._const);
			self._stockInout =  new stockInoutController(self._parent, self._const);
			self._stockPlace =  new stockPlaceController(self._parent, self._const);
			self._stockCategory =  new stockCategoryController(self._parent, self._const);
			self._stockFinish =  new stockFinishController(self._parent, self._const);
			self._purchase =  new purchaseController(self._parent, self._const);
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
export default CompanyController;