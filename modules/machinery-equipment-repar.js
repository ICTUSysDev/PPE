angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery Equipment REPAR";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipmentNewpar = {}
			scope.machineryEquipmentNewpar.id = 0;

			// CRUD
			scope.reparEquipment = {}
			scope.reparEquipment.id = 0;

			// List
			scope.machineryEquipmentNewpars = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;
			
			scope.viewsAdd = {};
			scope.viewsAdd.currentPageAdd = 1;
			scope.viewsAdd.list = true;

			scope.viewsRemove = {};
			scope.viewsRemove.currentPageRemove = 1;
			scope.viewsRemove.list = true;

			scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
				add: {btn: false, label: 'New'},
				edit: {btn: false, label: 'Edit'},
				icon: {label: 'fa-eye'}
			};

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;
			scope.reparDisableSave = false;

			scope.reparEquipment = {};

			scope.notify = notify;

			scope.notificationStartStop = window.setInterval(function() {
				scope.notificationActive = document.getElementsByClassName('btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative active');

				if(scope.notificationActive.length == 0) {
					
					notify.notifications(scope);
				} else {
					clearInterval(scope.stopNotification);
				}
				
			}, 2000);

		};

		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
				scope.controls.add.btn = true;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
				scope.controls.add.label = 'Edit';
			}
			
		};

		                                            // CRUD Machinery Equipment PAR Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
			scope.machineryEquipmentData = [];
			scope.machineryEquipmentDataNewpar = [];

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-repars/list.php',
					data: scope.machineryEquipmentNewpars
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentNewpars = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/machinery-equipment-repars.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.machineryEquipmentNewpar = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.machineryEquipmentNewpar = {};
			scope.machineryEquipmentNewpar.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/machinery-equipment-repar.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/machinery-equipment-repars/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.machineryEquipmentNewpar);

					machineryEquipmentData(scope,row.id);
					self.filterOfficer(scope);
					if (response.data.par_date != null){scope.machineryEquipmentNewpar.par_date = new Date(response.data.par_date);}else{};

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			offices(scope);

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'machineryEquipmentNewpar')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
			if (scope.machineryEquipmentDataNewpar.length == 0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Add Equipment.');
				return;
			}

			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-repars/save.php',
					data: {machineryEquipmentNewpar: scope.machineryEquipmentNewpar, machineryEquipmentDataNewpar: scope.machineryEquipmentDataNewpar}
				}).then(function mySuccess(response) {

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {
						var onOk = function() {

							if(scope.machineryEquipmentNewpar.id==0){
									scope.machineryEquipmentNewpar.id = response.data;
									self.list(scope);
							} else {
									self.list(scope);
							};
							
						}
						bootstrapModal.successAlert(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
					}, 500);

				}, function myError(response) {
					
					// error
					
				});

		}

				                                            // CRUD Machinery Equipment PAR END

		function machineryEquipmentData(scope,id){

			scope.currentPageAdd = scope.viewsAdd.currentPageAdd;
			scope.pageSizeAdd = 10;
			scope.maxSizeAdd = 5;

			scope.currentPageRemove = scope.viewsRemove.currentPageRemove;
			scope.pageSizeRemove = 10;
			scope.maxSizeRemove = 5;

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment-repars/machinery-equipment-data.php',
			  data: {par_id: id}
			}).then(function mySucces(response) {
				
				scope.machineryEquipmentData = response.data;
				
			}, function myError(response) {
				 
			});
			
		};

		self.filterOfficer = function(scope, item) {
	
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-pars/filter-officer.php',
				data: {officeId: item.id}
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});	
			
		};

		function offices(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/offices.php'
			}).then(function mySuccess(response) {
				
				scope.offices = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};
		//End / Api / Suggestions

	//Others
	self.addFunction = function(scope,item) {

		let index = scope.machineryEquipmentData.findIndex(
			x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
		);

		scope.machineryEquipmentDataNewpar.push(scope.machineryEquipmentData[index]);
		scope.machineryEquipmentData.splice(index, 1);

	}

	self.removeFunction = function(scope,item) {

			let index = scope.machineryEquipmentDataNewpar.findIndex(
				x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
				);

			scope.machineryEquipmentData.push(scope.machineryEquipmentDataNewpar[index]);
			scope.machineryEquipmentDataNewpar.splice(index, 1);

	}
	//------

		//Show and Hide Element with Condition Start

		self.checkAccountableOfficer = function(scope) {

			if(scope.machineryEquipmentNewpar.accountable_officer.id == scope.machineryEquipmentNewpar.new_accountable_officer.id) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'New Accountable Officer cannot be same as Previous Accountable Officer!');
				scope.reparDisableSave = true;
				return;
			} else {
				scope.reparDisableSave = false;
			}

		}

		//Show and Hide Element with Condition End

		self.openAllNotification = function(scope) {
			
			$http({
				method: 'POST',
				url: 'handlers/admin_notifications/open-all-notification.php',
			}).then(function mySucces(response) {
				
				notify.notifications(scope);
				clearInterval(scope.stopNotification);

			}, function myError(response) {
					
				// error
				
			});

		}

	};
	
	return new app();
	
});