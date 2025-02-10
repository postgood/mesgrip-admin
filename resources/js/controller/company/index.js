'use strict';

// 기업관리
import companyController from './companyController'
import employeeController from './employeeController'
import processController from './processController'
import equipmentController from './equipmentController'
import repairController from './repairController'
import connectionController from './connectionController'
import placeController from './placeController'
import customerController from '../client/customerController'
import storageController from '../distribution/storageController'

let CompanyController = class {
	constructor(_const,_data,_param,_parent) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
	}

	init = () => {
			const self = this;
			
			self._company =  new companyController(self._parent, self._const);
			self._employee =  new employeeController(self._parent, self._const);
			self._process =  new processController(self._parent, self._const);
			self._equipment =  new equipmentController(self._parent, self._const);
			self._repair =  new repairController(self._parent, self._const);
			self._place =  new placeController(self._parent, self._const);
			self._connection =  new connectionController(self._parent, self._const);
			self._customer =  new customerController(self._parent, self._const);
			self._storage =  new storageController(self._parent, self._const);
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