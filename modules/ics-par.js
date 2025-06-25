angular.module('app-module',['notify','my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access,notify) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "ICS PAR";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.icsPar = {}
			scope.icsPar.id = 0;

			// List
			scope.icsPars = [];

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

			scope.icsParId = 0;

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

		// CRUD ICS PAR Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;
			scope.showNote = true;
			scope.disableAddEquipment = false;
			
			scope.icsData = [];
			scope.ics = [];

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/ics-pars/list.php',
					data: scope.icsPars
				}).then(function mySucces(response) {
					
					scope.icsPars = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/ics-pars.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.icsPar = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.icsPar = {};
			scope.icsPar.id = 0;

			scope.fileList = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/ics-par.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/ics-pars/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.icsPar);

					if (response.data.par_date != null){scope.icsPar.par_date = new Date(response.data.par_date);}else{};

					icsData(scope,row.id);
					self.filterOfficer(scope,scope.icsPar.office_id);
					self.fileList(scope,scope.icsPar.id);

					mode(scope, row);

					if(scope.icsPar.id != 0) {
						scope.disableAddEquipment = true;
					}
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			ics(scope);
			fileUpload(scope);
			offices(scope);

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'icsPar')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
			if(scope.icsData.length == 0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add Equipment.');
				return;
			}
		
			var accountable_officer = scope.icsPar.accountable_officer.name;
			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/ics-pars/save.php',
					data: {icsPar: scope.icsPar, icsData: scope.icsData}
				}).then(function mySuccess(response) {

					
					if(scope.icsPar.id==0) {
							scope.icsPar.id = response.data;
					} else {

					};

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

							Swal.fire({
								title: "The equipment has been successfully added to " + accountable_officer,
								html: `Do you want to Print Report or Upload File?`,
								icon: "success",
								showDenyButton: true,
								showCancelButton: true,
								confirmButtonText: "No Thanks",
								denyButtonText: `Print Report`,
								cancelButtonText: `Upload File`,
							}).then((result) => {
								/* Read more about isConfirmed, isDenied below */
								if (result.isConfirmed) {
									self.list(scope);
								} else if (result.isDenied) {
									viewICS(response.data,scope);
									self.list(scope);
								} else if (result.isDismissed) {
									document.querySelector('a[data-kt-countup-tabs="true"][href="#kt_user_view_overview_security"]').click();
								}
							});

					}, 500);

				}, function myError(response) {
					
					// error
					
				});

		}

		//MODAL Start
		self.viewIcsPar = function(scope,row) {

			var title = "Inventory Custodian Slip";
			var dataThemeMode = localStorage.getItem('data-theme-mode');

			$timeout(function() {

				if (scope.$id > 2) scope = scope.$parent;
				
					$http({
						method: 'POST',
						url: 'handlers/ics-pars/view-par.php',
						data: {id: row.id}
					}).then(function mySucces(response) {
						
						scope.viewPAR = angular.copy(response.data);

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

				bootstrapModal.box8(scope,title,'components/modal/view-ics.html',onOk);
			
		};
		// MODAL END

				                                            // CRUD Machinery Equipment PAR END
		//Start / Api / Suggestions
		function ics(scope) {

			scope.currentPageAdd = scope.viewsAdd.currentPageAdd;
			scope.pageSizeAdd = 10;
			scope.maxSizeAdd = 5;

			scope.currentPageRemove = scope.viewsRemove.currentPageRemove;
			scope.pageSizeRemove = 10;
			scope.maxSizeRemove = 5;
	
			$http({
				method: 'POST',
				url: 'api/suggestions/ics-pars.php',
			}).then(function mySuccess(response) {
				
				scope.ics = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});				
			
		};

		function icsData(scope,row) {

			$http({
				method: 'POST',
				url: 'handlers/ics-pars/icsData.php',
				data: {id: row}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.icsData);

			}, function myError(response) {
				
				// error
				
			});


		}
		//End / Api / Suggestions

		//Others
		self.addFunction = function(scope,item) {

			let index = scope.ics.findIndex(
				x => x.property_number == item.property_number && x.article.name == item.article.name
			);

			scope.icsData.push(scope.ics[index]);
			scope.ics.splice(index, 1);

		}

		self.removeFunction = function(scope,item) {

				let index = scope.icsData.findIndex(
					x => x.property_number == item.property_number && x.article.name == item.article.name
					);
	
				scope.ics.push(scope.icsData[index]);
				scope.icsData.splice(index, 1);

		}

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

		self.filterOfficer = function(scope, item) {
	
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-pars/filter-officer.php',
				data: {officeId: item.id}
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});	
			
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
		
			// scope.disableUpload = true;
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
				
				if(scope.icsPar.id == 0) {
					growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Submit PAR first');
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
						url: 'handlers/ics-pars/upload-files.php',
						type: 'POST',
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(response) {
		
							scope.icsPar.fileNames = response;
		
						},
						error: function(error) {
								console.error('Error:', error);
						}
				});
		
				setTimeout(function() {
		
					var moduleName = 'ICS PAR';
				
					$http({
						method: 'POST',
						url: 'handlers/file-uploads/save-file-names.php',
						data: {fileNames: scope.icsPar.fileNames, landId: scope.icsPar.id, module_name: moduleName}
					}).then(function mySucces(response) {
						
						setTimeout(function() {
		
								Swal.fire({
									title: "Uploaded successfully!",
									html: `Do you want to Upload more files?`,
									icon: "success",
									showDenyButton: true,
									showCancelButton: false,
									confirmButtonText: "No Thanks",
									denyButtonText: `Upload File`
								}).then((result) => {
									/* Read more about isConfirmed, isDenied below */
									if (result.isConfirmed) {
										self.list(scope);
									} else if (result.isDenied) {
										self.fileList(scope,scope.icsPar.id);
									}
								});	
		
						}, 500);
						
		
					}, function myError(response) {
						
						// error
						
					});
							
				}, 200);
		
		});
		
			}, 500);
		}

		self.fileList = function(scope,land_ids) {

			var moduleName = 'ICS PAR';
		
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
		
			var fileUrl = './assets/files/ics-pars/';
		
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
		
			var fileUrl = './assets/files/ics-pars/';
		
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
		
			var moduleName = 'ICS PAR';
		
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

		//------

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




			
		//VIEW PAR REPORT PDF
		function viewICS(ICSid,scope){
			$http({
				method: 'POST',
				url: 'handlers/report-ICS/viewICS.php',
				data: {id: ICSid}

			}).then(function mySucces(response) {
				scope.datas = response.data;
				print(scope);
		}, function myError(response) {
			// error
			});
		};

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
		
			var doc = new jsPDF('p','mm',[215.9,279]);

			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(202.3, 22, 'Appendix 52','right');

			//title
			doc.line(12.7,25.4,202.3,25.4);	//Upper line
			doc.line(12.7,25.4,12.7,48);	//left line
			doc.line(202.3,25.4,202.3,48);	//right line


			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 30, 'INVENTORY CUSTODIAN SLIP','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(13, 38.1, 'LGU: Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(22, 39, 22 + textWidth + 2, 39);

			doc.text(13, 43.1, 'Fund: ');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(22,44, 22 + textWidth + 2 , 44);
			
			doc.text(201, 43.1, "ICS No.: " + scope.datas.machinery_equipment_pars.par_no,'right');
			textWidth = doc.getTextWidth("ICS No.: " + scope.datas.machinery_equipment_pars.par_no);
			doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);
		
			var rows = [];
			angular.forEach(scope.datas.par_machinery_equipments, function(pars_equipment,key) {
			
				var row = [];
				row.push('1');
				row.push('1');
				row.push(pars_equipment.par_machinery_equipment.description);
				row.push(pars_equipment.par_machinery_equipment.property_number);
				row.push(getFormattedDate(pars_equipment.par_machinery_equipment.acquisition_date));
				row.push(pars_equipment.par_machinery_equipment.acquisition_cost);
				rows.push(row);
			});
			 
			//COLUMS
			let head = [
				[
					{
						content: 'Quantity', 
						colSpan: 1, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=15
						}
					}, 
					{
						content: 'Unit', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=15,
							fontSize: number = 8
						}
					},
					{
						content: 'Description', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8, 
							cellWidth: number=64.8
						}
					},
					{
						content: 'Property Number', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=34.8
						}
					},
					{
						content: 'Date Aquired', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=35
						}
					},
					{
						content: 'Amount', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=25
						}
					},
				],
			];

			let foots = [
				[
					{
						content: 'Received by:', 
						colSpan: 3,
						rowsSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							minCellHeight: number = 50
							
						}
					}, 
					{
						content: 'Issued by:', 
						colSpan: 3,
						rowsSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							
						}
					}, 
				],
				[
					{
						content: 'Signature over Printed Name of End User', 
						colSpan: 3,
						rowsSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							
						}
					}, 
					{
						content: 'Signature over Printed Name of Supply and/or Property Custodian', 
						colSpan: 3,
						rowsSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							
						}
					}, 
				]
			];

			doc.autoTable({
				startY: 48,
				margin: Margin = 12.7,
				tableWidth: number = 189.6,
				showHead:'everyPage',
				tableLineWidth: number = 0,
				head: head,
				body: rows,
				theme: 'plain',
				styles: { 
					lineWidth: number = .2, 
					lineColor: Color = 10,
					fontSize: number = 8  
				},
				columnStyles: {
					0: { halign: 'center' },
					1: { halign: 'center' },
					2: { halign: 'left' },
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'right' }

				},
				// foot: foots,



				
			});
			
			let signatory_header = [
				[
					{
						// content: 'Quantity', 
						colSpan: 1, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=doc.lastAutoTable.settings.tableWidth/2,
						}
					}, 
					{
						// content: 'Unit', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=doc.lastAutoTable.settings.tableWidth/2,
							fontSize: number = 8
						}
					},
					
				],
			];
			var nestedTableCell = {
				content: '',
				// Dynamic height of nested tables are not supported right now
				// so we need to define height of the parent cell
				styles: { minCellHeight: 45 },
			} 
			const  startY_signatories=doc.lastAutoTable.finalY;
			const  margin_signatories=doc.lastAutoTable.settings.tableWidth;
			var signatory_rows = 
				[
					{
						content: 'Received by:', 

					}, 
					{
						content: 'Received by:', 

					}, 
	
				];

			
			// RECEIVED BY SIGNATORY
			doc.autoTable({
				body: [[nestedTableCell]],
				startY: startY_signatories,
				theme: 'grid',
				tableWidth: number = doc.lastAutoTable.settings.tableWidth,
				margin: Margin = 12.7,
				styles: { 
					lineWidth: number = .2, 
					lineColor: Color = 10,
					fontSize: number = 8  
				},

					});

			doc.setFontSize(8);
			
			doc.setFillColor(0);
			doc.setDrawColor(0);
			doc.setLineWidth(.2);
			doc.line(94.75+12.75, startY_signatories, 94.8+12.75, startY_signatories+45,'FD');
			doc.setFont('helvetica','bold','bold');
			doc.text(12.75+5, startY_signatories + 10, "Received by: ");
			doc.line(12.75+15, startY_signatories+17, 80.26+12.75, startY_signatories+17,'FD');
			var AccountableOfficerSig=scope.datas.machinery_equipment_pars.accountable_officer.name;
			doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
			doc.text(scope.datas.machinery_equipment_pars.position.position_description,61, startY_signatories + 26, 'center');

			doc.setFont('helvetica','normal');
			doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
			doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
			doc.text("Position/Office",61, startY_signatories + 30, 'center');
			doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
			doc.text("Date",61, startY_signatories + 40, 'center');			


			doc.setFont('helvetica','bold','bold');
			doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");
			
			var issuedBySignatory=scope.datas.machinery_equipment_pars.property_custodian.name;
			doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
			doc.text(scope.datas.machinery_equipment_pars.property_custodian.position,155.3, startY_signatories + 26, 'center');
			
			doc.setFont('helvetica','normal');
			doc.line(12.75+98, startY_signatories+17, 187.15+12.75, startY_signatories+17,'FD');
			doc.text("Signature over Printed Name of Supply and/or Property Custodian",155.3, startY_signatories + 20, 'center');
			doc.line(12.75+118, startY_signatories+27, 167.15+12.75, startY_signatories+27,'FD');
			doc.text("Position/Office",155.3, startY_signatories + 30, 'center');
			doc.line(12.75+128, startY_signatories+37, 157.15+12.75, startY_signatories+37,'FD');
			doc.text("Date",155.3, startY_signatories + 40, 'center');
			
			doc.setFontSize(8)
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(107.5,274, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};

	};
	
	return new app();
	
});