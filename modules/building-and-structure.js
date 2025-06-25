angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Building and Other Structure";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.buildingAndStructure = {}
			scope.buildingAndStructure.id = 0;

			// List
			scope.buildingAndStructures = [];

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

			scope.buildingAndStructureId = 0;

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
				
				scope.showAddButton = false;
				scope.showEditButton = false;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
				scope.controls.add.label = 'Edit';
				
				scope.showAddButton = false;
				scope.showEditButton = true;
			}
			
		};

		// CRUD Start
		
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
					url: 'handlers/building-and-other-structures/list.php',
					data: scope.buildingAndStructures
				}).then(function mySucces(response) {
					
					scope.buildingAndStructures = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/building-and-other-structures.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.buildingAndStructure = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.buildingAndStructure = {};
			scope.buildingAndStructure.id = 0;
			
			scope.fileList = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/building-and-other-structure.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/building-and-other-structures/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.buildingAndStructure);

					scope.filteredBarangays = response.data.municipality_id.barangays;

					if (response.data.date_added != null){scope.buildingAndStructure.date_added = new Date(response.data.date_added);}else{};

					self.fileList(scope,scope.buildingAndStructure.id);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});

			};

			municipalities(scope);
			coaCodes(scope);
			fileUpload(scope);
				
		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'buildingAndStructure')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/building-and-other-structures/save.php',
					data: {buildingAndStructure: scope.buildingAndStructure}
				}).then(function mySuccess(response) {

					if(scope.buildingAndStructure.id==0){
						scope.buildingAndStructure.id = response.data;
					}

				}, function myError(response) {
					
					// error
					
				});

			}
			if(scope.buildingAndStructure.id==0) {
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
					url: 'handlers/building-and-other-structures/delete.php',
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

		//Start / Api / Suggestions

		function municipalities(scope,item) {

			$http({
			  method: 'POST',
			  url: 'api/suggestions/municipalities.php',
			}).then(function mySucces(response) {

				scope.municipalities = response.data;

			}, function myError(response) {
				
			});
			
		};

		function coaCodes(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/building-and-other-structures/charts-of-accounts.php',
			}).then(function mySucces(response) {

				scope.coaDescription = response.data;

			}, function myError(response) {
				
			});
			
		};

		self.filterBarangay = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/building-and-other-structures/filter-barangays.php',
			  data: {barangay_id: item.id}
			}).then(function mySucces(response) {

				scope.filteredBarangays = response.data;

			}, function myError(response) {
				
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

		self.openMap = function(scope) {
			var title = "Open Street Map";
			var dataThemeMode = localStorage.getItem('data-theme-mode');
			var lat = document.getElementById('latitude').value;
			var lng = document.getElementById('longtitude').value;
			
			
			if ((typeof scope.buildingAndStructure.latitude != 'undefined' ) || (typeof scope.buildingAndStructure.longtitude != 'undefined')) {
				lat = scope.buildingAndStructure.latitude;
				lng = scope.buildingAndStructure.longtitude;
			}



				var onOk = function(scope){
					if(marker == null){
						growl.show('alert alert-danger',{from: 'top', amount: 55},'Click on the map to set property location.');
						return;
					}
					else {
						document.getElementById('latitude').value = coordinates.lat;
						document.getElementById('longtitude').value = coordinates.lng;
						scope.buildingAndStructure.latitude = coordinates.lat;
						scope.buildingAndStructure.longtitude = coordinates.lng
					}

				}
				bootstrapModal.box9(scope,title,'components/modal/view-map.html',onOk);


		}

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
				if(scope.buildingAndStructure.id == 0) {
					growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Submit Details first');
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
						url: 'handlers/building-and-other-structures/upload-files.php',
						type: 'POST',
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(response) {

							scope.buildingAndStructure.fileNames = response;
		
						},
						error: function(error) {
								console.error('Error:', error);
						}
				});
	
				setTimeout(function() {

					var moduleName = 'BUILDING AND OTHER STRUCTURE';

					var onOk = function() {
						$http({
							method: 'POST',
							url: 'handlers/file-uploads/save-file-names.php',
							data: {fileNames: scope.buildingAndStructure.fileNames, landId: scope.buildingAndStructure.id, module_name: moduleName}
						}).then(function mySucces(response) {
	
							self.fileList(scope,scope.buildingAndStructure.id);
							
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

			var moduleName = 'BUILDING AND OTHER STRUCTURE';

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

			var fileUrl = './assets/files/building-and-other-structures/';

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

			var fileUrl = './assets/files/building-and-other-structures/';

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

			var moduleName = 'BUILDING AND OTHER STRUCTURE';

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