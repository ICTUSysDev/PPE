angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Office Equipment List";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.office_equipment = {}
			scope.office_equipment.id = 0;

			// List
			scope.office_equipments = [];

			// List
			scope.partSerialNumbers = [];

			// CRUD
			scope.assignTo = {}
			scope.assignTo.id = 0;

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
					url: 'handlers/office-equipments/list.php',
					data: scope.office_equipments
				}).then(function mySucces(response) {
					
					scope.office_equipments = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/office-equipments.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.office_equipment = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
			
			scope.office_equipment = {};
			scope.office_equipment.id = 0;

			scope.assignTo = {};
			scope.assignTo.id = 0;

			scope.partSerialNumbers = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/office-equipment.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/office-equipments/view.php',
				  data: {id: row.equipment_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.office_equipment);
					
					if (response.data.acquisition_date != null){scope.office_equipment.acquisition_date = new Date(response.data.acquisition_date);}else{};
					self.filterArticle(scope,response.data.article_id);
					self.filterBrand(scope,response.data.article_id);
					self.listPartSerialNumber(scope);
					self.fileList(scope,scope.office_equipment.id);
					self.assignedTo(scope, row);
					self.filterOfficer(scope, response.data.office_id);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			coaDescription(scope);
			brands(scope);
			offices(scope);
			funds(scope);
			suppliers(scope);
			// positions(scope);
			// groups(scope);

		};
		// Form End

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
					url: 'handlers/equipment-lists/delete.php',
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

		function coaDescription(scope) {

			scope.coaDescriptionId = 10705;
	
			$http({
				method: 'POST',
				url: 'api/suggestions/coa-description.php',
				data: {coaDescriptionId: scope.coaDescriptionId}
			}).then(function mySuccess(response) {
				
				scope.coaDescription = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		function brands(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/brands.php',
			}).then(function mySuccess(response) {
				
				scope.brands = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		self.filterArticle = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment/filter-articles.php',
			  data: {coaCodeArticle: item.code}
			}).then(function mySucces(response) {

				scope.filteredArticle = response.data;

			}, function myError(response) {
				
			});
			
		};

		self.filterBrand = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment/filter-brands.php',
			  data: {article_id: item.id}
			}).then(function mySucces(response) {

				scope.filteredBrand = response.data;

			}, function myError(response) {
				
			});
			
		};

		function funds(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/funds.php',
			}).then(function mySuccess(response) {
				
				scope.funds = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		function suppliers(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/suppliers.php',
			}).then(function mySuccess(response) {
				
				scope.suppliers = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		// List Start
		self.listPartSerialNumber = function(scope) {

			scope.showAddButton = false;
			scope.showEditButton = true;

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/part-serial-number/list.php',
					data: {machineryEquipmentId: scope.office_equipment.id}
				}).then(function mySucces(response) {
					
					scope.partSerialNumbers = angular.copy(response.data);
										
				}, function myError(response) {

				});

		};

		self.fileList = function(scope,land_ids) {

			var moduleName = 'MACHINERY AND EQUIPMENT';

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			// scope.showAddButton = true;
			scope.showEditButton = false;

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/file-uploads/file-list.php',
					data: {id: land_ids, module_name: moduleName}
				}).then(function mySucces(response) {
					
					scope.fileList = angular.copy(response.data);
					
				}, function myError(response) {

				});

		};

		self.assignedTo = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
	
			scope.assignTo = {};
			scope.assignTo.id = 0;
	
			scope.showAddButton = false;
	
			mode(scope, row);
				
				if (scope.$id > 2) scope = scope.$parent;
	
				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/view-assign.php',
					data: {id: scope.office_equipment.id}
				}).then(function mySucces(response) {
					
					if(response.data==null) {
	
						scope.assignTo = {};
						scope.assignTo.id = 0;
						
						scope.assignTo.par_date = new Date();
	
					} else {
	
						angular.copy(response.data, scope.assignTo);
						
						if (response.data.par_date.par_date != null){scope.assignTo.par_date = new Date(response.data.par_date.par_date);}else{};
		
					}
	
					mode(scope, row);
					
				}, function myError(response) {
					
					// error
					
				});
				
		};

		self.filterOfficer = function(scope, item) {
	
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment/filter-officer.php',
				data: {officeId: item.id}
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = response.data;
				
			}, function myError(response) {
				
				// error
				
			});	
			
		};

		self.requestForPreInspection = function(scope) {

			Swal.fire({
				title: "Request for Pre-repair Inspection?",
				html: `Leave remarks/note below`,
				icon: "question",
				input: "text",
				inputAttributes: {
						autocapitalize: "off"
				},
				showCancelButton: true,
				confirmButtonText: "Send Request",
				showLoaderOnConfirm: true,
				preConfirm: async (remarks) => {
					try {
						let response = await $http({
							method: 'POST',
							url: 'handlers/office-equipments/save.php',
							data: { officeEquipment: scope.oe, note: remarks }
						});
						return response.data;
					} catch (error) {
							// Handle error
							console.error(error);
					}
				},
				allowOutsideClick: () => !Swal.isLoading()
				}).then((response) => {
					if (response.isConfirmed) {
						// Now you can access response.data inside this block
						if(response.value.errorMsg != 'error') {
							Swal.fire({
								position: "center",
								icon: "success",
								title: "Request sent!",
								showConfirmButton: false,
								timer: 1500
							});
						} else {
							Swal.fire({
								position: "center",
								icon: "error",
								title: "You already Requested!",
								showConfirmButton: false,
								timer: 1500
							});
						}
							
					}
				});
		}
		//End / Api / Suggestions

		//Show and Hide Element with Condition Start

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