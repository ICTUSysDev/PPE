angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Offices";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.office = {}
			scope.office.id = 0;

			// List
			scope.offices = [];

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

			scope.office_id = 0;

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

		                                            // CRUD Office Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/offices/list.php',
					data: scope.offices
				}).then(function mySucces(response) {
					
					scope.offices = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/offices.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.office = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.office = {};
			scope.office.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/office.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/offices/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.office);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};
			headOfOffice(scope);
		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'office')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/offices/save.php',
					data: {office: scope.office}
				}).then(function mySuccess(response) {

					self.list(scope);

				}, function myError(response) {
					
					// error
					
				});
				
			}
			if(scope.office.id == 0) {
				bootstrapModal.confirmSave(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
			} else {
				bootstrapModal.confirmUpdate(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
			}
		}

		//Add function End
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
			if(scope.controls.edit.label=="Edit") {
				
				scope.controls.edit.label="Disable";
				
			} else{
				
				scope.controls.edit.label="Edit";
				
			};

		};

		// Delete Start
		self.delete = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete))
			return;

			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/offices/delete.php',
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
				                                            // CRUD Office END

		// Start API Suggest//

		function headOfOffice(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/employees.php'
			}).then(function mySuccess(response) {
				
				scope.headOfOffice = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		// End API Suggest//

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