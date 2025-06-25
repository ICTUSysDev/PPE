angular.module('app-module',['notify','my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access,notify) {
	
	function app() {

    var self = this;
	var equipment_type;
	var equipment_id;

		self.data = function(scope) {

			scope.headerName = "PPE Physical Inventory";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.PPEphysicalCount = {}
			scope.PPEphysicalCount.id = 0;

			// List
			scope.PPEphysicalCounts = [];

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

			scope.PPEphysicalCount_id = 0;

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

		// CRUD  Start
		self.lists = function(scope) {
			
			window.location.replace("http://10.10.26.160/ppe-new/machinery-furniture-physical-count.php");

		};

    // List Start
		self.list = function(scope) {
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			equipment_id = document.getElementById("property_number").value;
			equipment_type = document.getElementById("property_type").value;
			scope.equipment_description = document.getElementById("property_type").value;
			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = true;
			
			scope.controls.edit.label = "Edit";
			
			scope.showNote = true;
			scope.controls.ok.btn = true;
				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/qr-machinery-furniture-physical-count/view.php',
					data: {id: document.getElementById("property_number").value, type: document.getElementById("property_type").value}
				  }).then(function mySucces(response) {
					  angular.copy(response.data, scope.PPEphysicalCount);
  
						scope.PPEphysicalCount.inventory_date = new Date();
					//   scope.PPEphysicalCount.article_name = response.data.article_id.article_name;
					  
				  }, function myError(response) {
					  
					// error
					
				  });

				// $http({
				// 	method: 'POST',
				// 	url: 'handlers/machinery-furniture-physical-count/list.php',
				// 	data: scope.PPEphysicalCounts
				// }).then(function mySucces(response) {
					
				// 	scope.PPEphysicalCounts = angular.copy(response.data);
					
				// }, function myError(response) {

				// });

				// $('#content').load('lists/machinery-furniture-physical-counts.html', function() {
				// 	$timeout(function() { $compile($('#content')[0])(scope); },100);								
				// });

		};


		// Form Start
		// self.physicalCount = function(scope,row) {

		// 	if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
		// 	return;

		// 	scope.PPEphysicalCount = {};
		// 	scope.PPEphysicalCount.id = 0;
		// 	scope.controls.ok.label = 'Add';
		// 	scope.controls.ok.btn = true;
	
		// 	$('#content').load('forms/qr-machinery-furniture-physical-count.html',function() {
		// 		$timeout(function() { $compile($('#content')[0])(scope); },200);
		// 	});

		// 	if (row != null) {
		// 		if (scope.$id > 2) scope = scope.$parent;

		// 		scope.equipment_description = row.equipment_description;

		// 		$http({
		// 		  method: 'POST',
		// 		  url: 'handlers/qr-machinery-furniture-physical-count/view.php',
		// 		  data: {id: row.id, equipment_description: row.equipment_description}
		// 		}).then(function mySucces(response) {
		// 			angular.copy(response.data, scope.PPEphysicalCount);

		// 			scope.PPEphysicalCount.article_name = response.data.article_id.article_name;
					
		// 		}, function myError(response) {
					
		// 		  // error
				  
		// 		});
				
		// 	};

		// };
				// Form End
		self.edit = function(scope) {

			var return_value=prompt("Password:");
			if(return_value==="admin"){
				scope.controls.ok.btn = !scope.controls.ok.btn;
				
				if(scope.controls.edit.label=="Edit") {
					
					scope.controls.edit.label="Disable";
					
				} else{
					
					scope.controls.edit.label="Edit";
					
				};
			}	else {
				return;
			}

		};
		// Add Function Start
		self.save = function(scope) {

			if (validate.form(scope,'PPEphysicalCount')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/qr-machinery-furniture-physical-count/save.php',
					data: {PPEphysicalCount: scope.PPEphysicalCount, equipment_description: scope.equipment_description}
				}).then(function mySuccess(response) {
					

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {
						var onOk = function() {

							window.location.replace("http://10.10.26.160/ppe-new/machinery-furniture-physical-count.php");
						
						}
						bootstrapModal.successAlert(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
					}, 500);

				}, function myError(response) {
					
					// error
					
				});

		}

		// //MODAL Start
		// self.viewHistory = function(scope,row) {

		// 	var title = "PPE Physical Count";
		// 	var dataThemeMode = localStorage.getItem('data-theme-mode');

		// 	$timeout(function() {

		// 		if (scope.$id > 2) scope = scope.$parent;
				
		// 			$http({
		// 				method: 'POST',
		// 				url: 'handlers/machinery-furniture-physical-count/view-history.php',
		// 				data: {id: row.id}
		// 			}).then(function mySucces(response) {
						
		// 				scope.viewHistory = angular.copy(response.data);

		// 				if(dataThemeMode == 'light'){
		// 					scope.dataThemeMode = 'light';
		// 				} else {
		// 					scope.dataThemeMode = 'dark';
		// 				}

		// 			}, function myError(response) {
						
		// 				// error
						
		// 			});

		// 	},500);

		// 		var onOk = function(scope){

		// 		}

		// 		bootstrapModal.box8(scope,title,'components/modal/view-physicalInventory-history.html',onOk);
			
		// };

	};
	
	return new app();
	
});