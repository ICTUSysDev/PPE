angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Users";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.user = {}
			scope.user.id = 0;

			// List
			scope.users = [];

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

			scope.user_id = 0;

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

		                                            // CRUD User Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.isError = false;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/users/list.php',
					data: scope.users
				}).then(function mySucces(response) {
					
					scope.users = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/users.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.user = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
			
			scope.userType = 'USER';

			scope.user = {};
			scope.user.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/user.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/users/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.user);

					self.checkEmployeeId(scope);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			offices(scope);
			positions(scope);
			groups(scope);

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'user')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/users/save.php',
					data: {user: scope.user}
				}).then(function mySuccess(response) {

					self.list(scope);

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.user.id == 0) {
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
					url: 'handlers/users/delete.php',
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

				                                            // CRUD User END

		self.approveUser = function(scope, row) {

			Swal.fire({
				title: "Activate this User?",
				icon: "question",
				showDenyButton: false,
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				confirmButtonText: "Approve",
			}).then((result) => {
				if (result.isConfirmed) {

					$http({
						method: 'POST',
						url: 'handlers/users/approve-user.php',
						data: {id: row.id}
					}).then(function mySuccess(response) {
						
						Swal.fire({
							title: "Activated Successfully!",
							icon: "success",
							showCancelButton: false,
							confirmButtonColor: "#3085d6",
							cancelButtonColor: "#d33",
							confirmButtonText: "Okay"
						}).then((result) => {
							if (result.isConfirmed) {
								
								self.list(scope)
	
							} else {

								self.list(scope);

							}
						});
	
					}, function myError(response) {
						
						// error
						
					});	

				}
			});

		}

		//Start / Api / Suggestions
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

		function positions(scope) {
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/positions.php'
			}).then(function mySuccess(response) {
				
				scope.positions = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		function groups(scope) {
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/groups.php'
			}).then(function mySuccess(response) {
				
				scope.groups = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};
		//End / Api / Suggestions

		//Show and Hide Element with Condition Start

		self.checkEmployeeId = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'api/suggestions/check-employee-id.php',
			  data: {employeeId: item, userType: scope.userType}
			}).then(function mySucces(response) {

				scope.checkEmployeeId = response.data;

				if(scope.checkEmployeeId.length >= 1) {
					scope.formHolder.user.employee_id.$invalid = true;
					scope.isError = true;
					growl.show('alert alert-danger',{from: 'top', amount: 55},'User Already Exist');
					scope.controls.ok.btn = true;
				} else {
					scope.isError = false;
					scope.controls.ok.btn = false;
				}

			}, function myError(response) {
				
			});
			
		};
		//Show and Hide Element with Condition End

		//MODAL Start
		

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