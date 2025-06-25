angular.module('app-module',['notify','my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access,notify) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Infrastructure Asset Physical Count";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.iaPhysicalCount = {}
			scope.iaPhysicalCount.id = 0;

			// List
			scope.iaPhysicalCounts = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

			scope.views1 = {};
			scope.views1.currentPage1 = 1;
			scope.views1.list = true;
			
			scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
				add: {btn: false, label: 'New'},
				edit: {btn: false, label: 'Edit'},
				icon: {label: 'fa-eye'}
			};

			scope.iaPhysicalCount_id = 0;

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
			
    // List Start
		self.list = function(scope) {
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;
			scope.showNote = true;
			scope.showInventory = true;
			scope.showTab = false;
			scope.disableSave = false;

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/infrastructure-asset-physical-count/list.php',
					data: scope.iaPhysicalCounts
				}).then(function mySucces(response) {
					
					scope.iaPhysicalCounts = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/infrastructure-asset-physical-counts.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};


		// Form Start
		self.physicalCount = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.fileList = [];
			scope.iaPhysicalCount = {};
			scope.iaPhysicalCount.id = 0;
			scope.controls.ok.label = 'Add';
			scope.controls.ok.btn = true;
			scope.showInventory = true;
			scope.showTab = false;
			scope.disableSave = false;

			$('#content').load('forms/infrastructure-asset-physical-count.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				if (scope.$id > 2) scope = scope.$parent;

				$http({
				  method: 'POST',
				  url: 'handlers/infrastructure-asset-physical-count/view.php',
				  data: {id: row.id, equipment_description: row.equipment_description}
				}).then(function mySucces(response) {

					scope.equipmentDetails = response.data;

					self.inventoryList(scope, row);
					self.fileList(scope,scope.equipmentDetails.id);
					
					scope.iaPhysicalCount.inventory_date = new Date();
					scope.inventoryDate = true;

				}, function myError(response) {
					
				  // error
				  
				});
				
			};

		};
				// Form End

		// Form Start
		self.updateInventory = function(scope,row) {

			var return_value=prompt("Password:");
				if(return_value==="admin"){

					if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
					return;
		
					scope.iaPhysicalCount.id = 0;
					scope.controls.ok.label = 'Update';
				
					if (row != null) {
						
						if (scope.$id > 2) scope = scope.$parent;
						
						$http({
							method: 'POST',
							url: 'handlers/infrastructure-asset-physical-count/view-inventory.php',
							data: {id: row.id}
						}).then(function mySucces(response) {
							
							angular.copy(response.data, scope.iaPhysicalCount);
												
							scope.iaPhysicalCount.inventory_date = new Date();
							scope.inventoryDate = false;

						}, function myError(response) {
							
							// error
							
						});
		
					};
				}	else {

					return;

				}

		};

		// List Start
		self.inventoryList = function(scope) {

			scope.currentPage1 = scope.views1.currentPage1;
			scope.pageSize = 10;
			scope.maxSize = 5;

			//for Hidding Elements
			scope.showAddButton = false;
			scope.showEditButton = true;
			
			scope.controls.edit.label = "Edit";
			
			scope.showInventory = true;
			scope.disableSave = false;

			setTimeout(function() {

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/infrastructure-asset-physical-count/inventory-list.php',
					data: {equipment_id: scope.equipmentDetails.id}
				}).then(function mySucces(response) {
					
					scope.inventoryList = angular.copy(response.data);
					
				}, function myError(response) {

				});
			}, 700);

			fileUpload(scope);

		};

		// Add Function Start
		self.save = function(scope) {
						
			if (validate.form(scope,'iaPhysicalCount')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/infrastructure-asset-physical-count/save.php',
					data: {iaPhysicalCount: scope.iaPhysicalCount, equipmentDetails: scope.equipmentDetails}
				}).then(function mySuccess(response) {

					self.inventoryList(scope, response.data);

					scope.iaPhysicalCount.id = 0;
					scope.controls.ok.label = 'Add';
					scope.inventoryDate = true;
					scope.iaPhysicalCount.location = "";
					scope.iaPhysicalCount.equipment_condition = "";
					scope.iaPhysicalCount.remarks = "";

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.iaPhysicalCount.id == 0) {
				bootstrapModal.confirmSave(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
			} else {
				bootstrapModal.confirmUpdate(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
			}
				
		}

		//MODAL Start
		self.viewHistory = function(scope,row) {

			var title = "PPE Physical Count";
			var dataThemeMode = localStorage.getItem('data-theme-mode');

			$timeout(function() {

				if (scope.$id > 2) scope = scope.$parent;
				
					$http({
						method: 'POST',
						url: 'handlers/infrastructure-asset-physical-count/view-history.php',
						data: {id: row.id}
					}).then(function mySucces(response) {
						
						scope.viewHistory = angular.copy(response.data);

						if(dataThemeMode == 'light'){
							scope.dataThemeMode = 'light';
						} else {
							scope.dataThemeMode = 'dark';
						}

					}, function myError(response) {
						
						// error
						
					});

			},500);

				var onOk = function(scope){

				}

				bootstrapModal.box8(scope,title,'components/modal/infrastructure-asset-physical-count.html',onOk);
			
		};
		// MODAL END

		self.addFile = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.iaPhysicalCount = {};
			scope.iaPhysicalCount.id = 0;

			scope.showAddButton = false;
			
			$('#content').load('forms/infrastructure-asset-physical-count.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				scope.showInventory = false;
				scope.showTab = true;
				scope.controls.ok.btn = true;
				scope.disableSave = true;

				$http({
				  method: 'POST',
				  url: 'handlers/infrastructure-asset-physical-count/add-file.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.iaPhysicalCount);

					self.fileList(scope,scope.equipmentDetails.id);

				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			// fileUpload(scope);

		};

		function fileUpload(scope) {

			setTimeout(function(){ 

			const inputElement = document.querySelector('input[type="file"]');

			FilePond.registerPlugin(
				FilePondPluginFileValidateSize,
				FilePondPluginFileValidateType,
				FilePondPluginImageValidateSize,
				);

			const pond = FilePond.create(inputElement, {
				allowFileValidateType: true,
				acceptedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
				allowFileSizeValidation: true,
    		maxFileSize: '10MB',
				server: {
					process: function (fieldName, file, metadata, load, error, progress, abort) {
						load();
					},
					fetch: null,
					revert: null
				}
			});

			scope.disableUpload = true;
			let lastLoadedFile = null;

			setInterval(function() {

				const getFiles = pond.getFiles();
				 // Iterate through the files to find the last loaded file
				 for (let i = getFiles.length - 1; i >= 0; i--) {
					const getFile = getFiles[i];
					if (getFile.status === 5) {
							lastLoadedFile = getFile;
							scope.disableUpload = false;
							break; // Stop when the last loaded file is found
					}
			}

			}, 1000)

      $('#uploadFile').click(function() {

				const files = pond.getFiles();

				if(files.length == 0){
						growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Select File');
						return;
				}
				
				const formData = new FormData();
				files.forEach(file => {
					formData.append('files[]', file.file, file.filename, file.fileSize);

					if(file.fileSize >= 10000000) {

						scope.showFileSizeAlert = true;
						return;

					} else {
						scope.showFileSizeAlert = false;
					}
					
					pond.removeFile(file);

				});

				if(scope.showFileSizeAlert == true) {

					growl.show('alert alert-danger',{from: 'top', amount: 55},'Some file size are too Large!');
					return;
				}

				$.ajax({
						url: 'handlers/infrastructure-asset-physical-count/upload-files.php',
						type: 'POST',
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(response) {

							scope.iaPhysicalCount.fileNames = response;
		
						},
						error: function(error) {
								console.error('Error:', error);
						}
				});
	
				setTimeout(function() {

					var moduleName = 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY';

					var onOk =  function() {
						$http({
							method: 'POST',
							url: 'handlers/file-uploads/save-file-names.php',
							data: {fileNames: scope.iaPhysicalCount.fileNames, landId: scope.equipmentDetails.id, module_name: moduleName}
						}).then(function mySucces(response) {
	
							self.fileList(scope,scope.equipmentDetails.id);
		
						}, function myError(response) {
							
							// error
							
						});
					}
					bootstrapModal.confirmUpload(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
					
				}, 200);
	
		});

			}, 500);
		}

		//File List Start
		self.fileList = function(scope,land_ids) {

			var moduleName = 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY';

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

		self.downloadFile = function(scope, itemId) {

			var fileUrl = './assets/files/infrastructure-assets-pi/';

			function downloadFile(filePath){
				var link=document.createElement('a');
				link.href = filePath;
				link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
				link.click();
			}

			$http({
				method: 'POST',
				url: 'handlers/file-uploads/download-file.php',
				data: {id: itemId}
			}).then(function mySucces(response) {

				scope.downloadFile = response.data;

				downloadFile(fileUrl + scope.downloadFile.file_name);
				
			}, function myError(response) {

			});

		}

		self.viewFile = function(scope, itemId) {

			var fileUrl = './assets/files/infrastructure-assets-pi/';

			$http({
				method: 'POST',
				url: 'handlers/file-uploads/view-file.php',
				data: {id: itemId}
			}).then(function mySucces(response) {

				scope.viewFile = response.data;

				window.open(fileUrl + scope.viewFile.file_name);
				
			}, function myError(response) {

			});

		}

		self.deleteFile = function(scope,item) {

			var moduleName = 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY';

			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/file-uploads/delete-file.php',
					data: {dataFile: item, module_name: moduleName},
				}).then(function mySucces(response) {

					self.fileList(scope,response.data.ppe_id);

				}, function myError(response) {
						
					// error
					
				});
			}

			bootstrapModal.confirmDelete(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});

		};


	};
	
	return new app();
	
});