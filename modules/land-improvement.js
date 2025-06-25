angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Land Improvement";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.landImprovement = {}
			scope.landImprovement.id = 0;

			// List
			scope.landImprovements = [];

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

			scope.landImprovementId = 0;

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
					url: 'handlers/land-improvements/list.php',
					data: scope.landImprovements
				}).then(function mySucces(response) {
					
					scope.landImprovements = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/land-improvements.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.landImprovement = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.landImprovement = {};
			scope.landImprovement.id = 0;

			scope.fileList = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/land-improvement.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/land-improvements/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {

					
					angular.copy(response.data, scope.landImprovement);
					
					scope.filteredBarangays = response.data.municipality_id.barangays;

					if (response.data.date_added != null){scope.landImprovement.date_added = new Date(response.data.date_added);}else{};

					self.fileList(scope,scope.landImprovement.id);

					mode(scope, row);
					
					scope.landImprovement.coaDescription = response.data.coa_code.code.toString();
					
				}, function myError(response) {
					
				  // error
				  
				});

			};

			municipalities(scope);
			lotNumbers(scope);
			coaCodes(scope);
			fileUpload(scope);
				
		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'landImprovement')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
		
			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/land-improvements/save.php',
					data: {landImprovement: scope.landImprovement}
				}).then(function mySuccess(response) {

					if(scope.landImprovement.id==0){
						scope.landImprovement.id = response.data;
					}

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.landImprovement.id==0) {
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
					url: 'handlers/land-improvements/delete.php',
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

		// CRUD END

		//FUNCTION TO FORMAT DATE
		function getFormattedDate(date) {
			var dateForwarded = new Date(date);
			var options = {  year: 'numeric', month: 'long', day: 'numeric' };

			return dateForwarded.toLocaleDateString("en-US", options);

		  };

		//FUNCTION TO FORMAT amount
		function getFormattedAmount(amount) {
			return amount.toLocaleString("en-US");
		  };
		
		function print(scope) {
			

			
			var doc = new jsPDF('l','mm',[279,215]);

			// var doc = new jsPDF('p', 'pt')


			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(266.7, 12.7, 'Appendix 54','right');
			//title
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(139.7, 25.4, 'PROPERTY CARD','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'LGU: Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(22, 38.9, 22 + textWidth + 2, 38.9)
			
			doc.text(266.7, 38.1, "Fund: "+scope.datas[0]['fund_name'],'right');
			textWidth = doc.getTextWidth(scope.datas[0]['fund_name']);
			doc.line(266.7, 38.9, 266.7 - textWidth -1, 38.9)

			
            doc.setFontSize(8);
			doc.rect(12.7, 42, 254, 15);
            doc.setFontSize(8);
            doc.setFont('helvetica','normal','normal');	
			doc.text(15, 48, "Property, Plant and Equipment: ");
            doc.text(15, 53, "Description: " );

            doc.setFont('helvetica','bold','bold');	
            textWidth = doc.getTextWidth("Property, Plant and Equipment: ");
            doc.text(15 + textWidth, 48, scope.datas[0]['article_name']);
            textWidth = doc.getTextWidth("Description: ");
            doc.text(15 + textWidth, 53, scope.datas[0]['property_description']);

			var rows = [];

		
			var counterPars=0;
			angular.forEach(scope.datas[0].pars, function(data,key) {
				var row = [];
				row.push(getFormattedDate(data.par_date));
				row.push(data.par_no);
				row.push('1');
				row.push('1');
				row.push(data.accountable_officer);
				row.push('1');
				row.push(getFormattedAmount(scope.datas[0].acquisition_cost));
				row.push(data.note);
				rows.push(row);
				counterPars++;
			});
			
			// //COLUMS
			let head = [
				[
					{content: 'Date', colSpan: 1, rowSpan: 2, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=30}}, 
					{content: 'Reference/ PAR No.', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle', cellWidth: number=35,fontSize: number = 8}},
					{content: 'Receipt', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=15}},
					{content: 'Issue/Transfer/Disposal', colSpan: 2,rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=15}},
					{content: 'Balance', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=20}},
					{content: 'Amount', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=25}},
					{content: 'Remarks', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=45}},
				],
				[
					{content: 'Qty.', styles: { halign: 'center',valign: 'middle',fontSize: number = 8 }}, 
					{content: 'Qty.', styles: { halign: 'center',valign: 'middle',fontSize: number = 8 }}, 
					{content: 'Office/Officer', styles: { halign: 'center',valign: 'middle',fontSize: number = 8 }}, 
					{content: 'Qty.', styles: { halign: 'center',valign: 'middle',fontSize: number = 8 }} ],
			];
			doc.autoTable({
				startY: 57.1,
				margin: Margin=12.7,
				tableWidth: number=254,
				showHead:'everyPage',
				tableLineWidth: number = 0,
				head: head,
				body: rows,
				theme: 'plain',
				styles: { lineWidth: number = .2, lineColor: Color = 10,fontSize: number = 8  },
				columnStyles: {
					0: { halign: 'center' },
					1: { halign: 'center' },
					2: { halign: 'center' },
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'center' },
					6: { halign: 'right' },
					7: { halign: 'center' },
				},
				
			})
			
			doc.setFontSize(8)
			doc.setFont('helvetica','italic','normal');
			// doc.setFontType('bolditalic');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(139.7,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			doc.text(139.7, 210, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};

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

		function lotNumbers(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/land-improvements/lot-numbers.php',
			}).then(function mySucces(response) {

				scope.lotNumbers = response.data;

			}, function myError(response) {
				
			});
			
		};

		function coaCodes(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/land-improvements/charts-of-accounts.php',
			}).then(function mySucces(response) {

				scope.coaDescription = response.data;

			}, function myError(response) {
				
			});
			
		};

		self.filterBarangay = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/land-improvements/filter-barangays.php',
			  data: {barangay_id: item.id}
			}).then(function mySucces(response) {

				scope.filteredBarangays = response.data;

			}, function myError(response) {
				
			});
			
		};

		//End / Api / Suggestions

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
			
			
			if ((typeof scope.landImprovement.latitude != 'undefined' ) || (typeof scope.landImprovement.longtitude != 'undefined')) {
				lat = scope.landImprovement.latitude;
				lng = scope.landImprovement.longtitude;
			}



				var onOk = function(scope){
					if(marker == null){
						growl.show('alert alert-danger',{from: 'top', amount: 55},'Click on the map to set property location.');
						return;
					}
					else {
						document.getElementById('latitude').value = coordinates.lat;
						document.getElementById('longtitude').value = coordinates.lng;
						scope.landImprovement.latitude = coordinates.lat;
						scope.landImprovement.longtitude = coordinates.lng
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
				if(scope.landImprovement.id == 0) {
					growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Submit Land Information first');
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
						url: 'handlers/land-improvements/upload-files.php',
						type: 'POST',
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(response) {

							scope.landImprovement.fileNames = response;
		
						},
						error: function(error) {
								console.error('Error:', error);
						}
				});
	
				setTimeout(function() {

					var moduleName = 'LAND IMPROVEMENT';
					
					var onOk = function() {

						$http({
							method: 'POST',
							url: 'handlers/file-uploads/save-file-names.php',
							data: {fileNames: scope.landImprovement.fileNames, landId: scope.landImprovement.id, module_name: moduleName}
						}).then(function mySucces(response) {
	
							self.fileList(scope,scope.landImprovement.id);
							
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

			var moduleName = 'LAND IMPROVEMENT';

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

			var fileUrl = './assets/files/land-improvements/';

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

			var fileUrl = './assets/files/land-improvements/';

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

			var moduleName = 'LAND IMPROVEMENT';

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