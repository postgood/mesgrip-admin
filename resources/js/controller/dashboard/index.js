'use strict';

// 현황
import orderController from './orderController'
import workController from './workController'
import distributionController from './distributionController'
import outsourcingController from './outsourcingController'
/*
import employeeController from './employeeController'
import processController from './processController'
import equipmentController from './equipmentController'

*/
let DashboardController = class {
	constructor(_const,_data,_param,_parent) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
	}

	init = () => {
			const self = this;
			self._order =  new orderController(self._parent, self._const);
			self._work =  new workController(self._parent, self._const);
			self._distribution =  new distributionController(self._parent, self._const);
			self._outsourcing =  new outsourcingController(self._parent, self._const);
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
export default DashboardController;