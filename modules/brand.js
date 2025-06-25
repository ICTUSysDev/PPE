angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Brands";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.brand = {}
			scope.brand.id = 0;

			// List
			scope.brands = [];

			scope.filteredBrands = [];

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

			scope.brand_id = 0;

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

	// CRUD Brand Start
		
    // List Start
		// self.list = function(scope) {

		// 	scope.currentPage = scope.views.currentPage;
		// 	scope.pageSize = 10;
		// 	scope.maxSize = 5;

		// 	scope.showAddButton = true;
		// 	scope.showEditButton = false;

		// 		if (scope.$id > 2) scope = scope.$parent;

		// 		$http({
		// 			method: 'POST',
		// 			url: 'handlers/brands/list.php',
		// 			data: scope.brands
		// 		}).then(function mySucces(response) {
					
		// 			scope.brands = angular.copy(response.data);
					
		// 		}, function myError(response) {

		// 		});

		// 		$('#content').load('lists/brands.html', function() {
		// 			$timeout(function() { $compile($('#content')[0])(scope); },100);								
		// 		});

		// };
		
		// Form Start
		self.brand = function(scope,row) {

			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			// return;
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.brand = {};
			scope.brand.id = 0;

			scope.filteredBrands = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/brand.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/brands/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					angular.copy(response.data, scope.brand);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			article(scope);

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'brand')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/brands/save.php',
					data: {brand: scope.brand}
				}).then(function mySuccess(response) {

					self.filterBrand(scope,scope.brand.article_id.id);
					
					scope.brand.name = "";
					scope.brand.description = "";
					scope.brand.id = 0;

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.brand.id == 0) {
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

		self.clear = function(scope) {
			
			scope.brand = {};

		};

		// Delete Start
		self.delete = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete))
			return;

			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/brands/delete.php',
					data: {id: [row.id]}
				}).then(function mySucces(response) {
					
					self.filterBrand(scope,scope.brand.article_id.id);

				}, function myError(response) {
						
					// error
					
				});
			}

			bootstrapModal.confirmDelete(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});

		};
		// Delete End
				                                            // CRUD Brand END
		//Start / Api / Suggestions
		function article(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/articles.php',
			}).then(function mySuccess(response) {
				
				scope.articles = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});				
			
		};

		self.filterBrand = function(scope, id) {

			scope.article_id = id;

			if (scope.$id > 2) scope = scope.$parent;
			
			$http({
				method: 'POST',
				url: 'handlers/brands/filter-brand.php',
				data: {article_id: scope.article_id}
			}).then(function mySuccess(response) {
				
				scope.filteredBrands = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});	

		};

		self.checkBrandName = function(scope, item) {

			$http({
				method: 'POST',
				url: 'handlers/brands/check-brand.php',
				data: {item: item}
			}).then(function mySuccess(response) {
				
				scope.checkBrandName = angular.copy(response.data);
				
				if(scope.checkBrandName.length == 1) {
					scope.formHolder.brand.name.$invalid = true;
					scope.isError = true;
					scope.disableSave = true;
				} else {
					scope.formHolder.brand.name.$invalid = false;
					scope.isError = false;
					scope.disableSave = false;
				}

			}, function myError(response) {
				
				// error
				
			});	

		};
		//End / Api / Suggestions

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