'use strict';

// 현황
import ledgerWorkController from './ledgerWorkController';
import ledgerController from './ledgerController';
import ledgerPayController from './ledgerPayController';
import ledgerCustomerController from './ledgerCustomerController';
import ledgerInvoiceController from './ledgerInvoiceController';
import ledgerFinishController from './ledgerFinishController';

let LedgerController = class {
	constructor(_const,_data,_param,_parent) {
		this._parent = _parent?_parent:null;
		this._const = _const?_const:{};
		this._data = _data?_data:{};
		this._param = _param?_param:{};
	}

	init = () => {
			const self = this;
			self._ledgerWork =  new ledgerWorkController(self._parent, self._const);
			self._ledger =  new ledgerController(self._parent, self._const);
			self._ledgerPay =  new ledgerPayController(self._parent, self._const);
			self._ledgerCustomer =  new ledgerCustomerController(self._parent, self._const);
			self._ledgerInvoice =  new ledgerInvoiceController(self._parent, self._const);
			self._ledgerFinish =  new ledgerFinishController(self._parent, self._const);
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
export default LedgerController;