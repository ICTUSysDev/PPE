angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Signatories";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.signatory = {}
			scope.signatory.id = 0;

			// List
			scope.signatories = [];

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

			scope.signatory_id = 0;

			scope.notify = notify;

			scope.stopNotification = window.setInterval(function() {
				notify.notifications(scope);
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

		                                            // CRUD Brand Start
		
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
					url: 'handlers/signatories/list.php',
					data: scope.signatories
				}).then(function mySucces(response) {
					
					scope.signatories = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/signatories.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.signatory = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
			scope.signatory = {};
			scope.signatory.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/signatories.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/signatories/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					angular.copy(response.data, scope.signatory);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error

				});
				
			};

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'signatory')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/signatories/save.php',
					data: {signatory: scope.signatory}
				}).then(function mySuccess(response) {

					self.list(scope);

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.signatory.id == 0) {
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
					url: 'handlers/signatories/delete.php',
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
				                                            // CRUD Brand END

	//Start Notification Start/Stop
		
	self.stopNotification = function(scope){
		clearInterval(scope.stopNotification);
	}
	self.startNotification = function(scope){
		scope.stopNotification = window.setInterval(function() {
			notify.notifications(scope);
		}, 2000);
	}

	//End Notification Start/Stop

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