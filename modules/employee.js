angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Employees";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.employee = {}
			scope.employee.id = 0;

			// List
			scope.employees = [];

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

			scope.employee_id = 0;

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

		                                            // CRUD Employee Start
		
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
					url: 'handlers/employees/list.php',
					data: scope.employees
				}).then(function mySucces(response) {
					
					scope.employees = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/employees.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.employee = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.userType = 'EMPLOYEE';

			scope.employee = {};
			scope.employee.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/employee.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.isError = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/employees/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.employee);

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
			
			if (validate.form(scope,'employee')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/employees/save.php',
					data: {employee: scope.employee}
				}).then(function mySuccess(response) {

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

						Swal.fire({
							title: "Form has been successfuly submitted!",
							icon: "success",
							showDenyButton: false,
							showCancelButton: false,
							confirmButtonText: "Ok, got it!",
							denyButtonText: `Add more`
						}).then((result) => {
							/* Read more about isConfirmed, isDenied below */
							if (result.isConfirmed) {
								self.list(scope);
							}
						});
						
					}, 500);

				}, function myError(response) {
					
					// error
					
				});

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
					url: 'handlers/employees/delete.php',
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

				                                            // CRUD Employee END

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

		self.checkEmployeeId = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'api/suggestions/check-employee-id.php',
			  data: {employeeId: item, userType: scope.userType}
			}).then(function mySucces(response) {

				scope.checkEmployeeId = response.data;

				if(scope.checkEmployeeId.length >= 1) {
					scope.formHolder.employee.employee_id.$invalid = true;
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

		// MODAL END

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