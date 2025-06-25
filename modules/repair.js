angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Repairs";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.repair = {}
			scope.repair.id = 0;

			// List
			scope.repairs = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

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

		// CRUD Repair Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
			scope.repairForm = {};

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/repairs/list.php',
					data: scope.repairs
				}).then(function mySucces(response) {
					
					scope.repairs = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/repairs.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.repair = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.repair = {};
			scope.repair.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			// $('#content').load('forms/repair.html',function() {
			// 	$timeout(function() { $compile($('#content')[0])(scope); },200);
			// });

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/repairs/view.php',
				  data: {ppe_data: row}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.repair);

					self.repairList(scope);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			offices(scope);
			accountableOfficer(scope);
			machineryEquipment(scope, row);
			machineryEquipmentPars(scope);

		};
		// Form End

	self.approvedRequest = function(scope, item) {

		$http({
			method: 'POST',
			url: 'handlers/repairs/repair-form/save.php',
			data: {approvedId: item}
		}).then(function mySuccess(response) {

			$('#kt_modal_new_target').modal('hide');

			Swal.fire({
				position: "center",
				icon: "success",
				title: "Request sent!",
				showConfirmButton: false,
				timer: 1500
			});

			self.list(scope);

		}, function myError(response) {
			
			// error
			
		});

	}

		// Add Function Start
		// self.save = function(scope) {
			
		// 	if (validate.form(scope,'repair')){ 
		// 		growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
		// 		return;
		// 	}

		// 	var spinner;
		// 			spinner=document.querySelector("#spinner_form_submit");
		// 			spinner.setAttribute("data-kt-indicator","on");
		
		// 		$http({
		// 			method: 'POST',
		// 			url: 'handlers/repairs/save.php',
		// 			data: {repair: scope.repair}
		// 		}).then(function mySuccess(response) {

		// 			setTimeout(function() {
		// 				spinner.removeAttribute("data-kt-indicator");
		// 			}, 500);

		// 			setTimeout(function() {
		// 				var onOk = function() {

		// 					if(scope.repair.id==0){
		// 							scope.repair.id = response.data;
		// 					} else {
		// 					};

		// 					scope.repair = {};
		// 					scope.repair.id = 0;
							
		// 				}
		// 				bootstrapModal.successAlert(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
		// 			}, 500);

		// 		}, function myError(response) {
					
		// 			// error
					
		// 		});

		// }

		//Add function End
		// self.edit = function(scope) {
			
		// 	scope.controls.ok.btn = !scope.controls.ok.btn;
			
		// 	if(scope.controls.edit.label=="Edit") {
				
		// 		scope.controls.edit.label="Disable";
				
		// 	} else{
				
		// 		scope.controls.edit.label="Edit";
				
		// 	};

		// };

		// Delete Start
		self.delete = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete))
			return;

			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/repairs/delete.php',
					data: {id: [row.id]}
				}).then(function mySucces(response) {
					
					self.list(scope);

				}, function myError(response) {
						
					// error
					
				});
			}

			bootstrapModal.confirmDelete(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});

		};
		// Delete End

    // List Start
		self.repairList = function(scope) {

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/repairs/repair-form/list.php',
					data: {repairId: scope.repair}
				}).then(function mySucces(response) {
					
					scope.repairList = angular.copy(response.data);
					
				}, function myError(response) {

				});

		};
		
	// Add Function Start
	self.saveRepairForm = function(scope) {
			
		if (validate.form(scope,'repairForm')){ 
			growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
			return;
		}

	
			$http({
				method: 'POST',
				url: 'handlers/repairs/repair-form/save.php',
				data: {repairForm: scope.repairForm, repairId: scope.repair.par_id.id, repairDetails: scope.repair}
			}).then(function mySuccess(response) {

						if(scope.repairForm.id==0){
								scope.repairForm.id = response.data;
								self.repairList(scope);
						} else {
								self.repairList(scope);
						};
						scope.repairForm = {};
						scope.repairForm.id = 0;
						
					bootstrapModal.successAlert(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});

			}, function myError(response) {
				
				// error
				
			});

	}

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

		function accountableOfficer(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/employees.php',
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});				
			
		};

		function machineryEquipment(scope, row) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/machinery-equipment-list.php',
				data: {equipmentDescription: row.equipment_description}
			}).then(function mySuccess(response) {
				
				scope.machineryEquipment = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});				
			
		};

		function machineryEquipmentPars(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/machinery-equipment-pars.php',
			}).then(function mySuccess(response) {
				
				scope.machineryEquipmentPars = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});				
			
		};

		// CRUD Repair END

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