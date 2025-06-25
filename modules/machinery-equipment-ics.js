angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment ICS";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipmentICS = {}
			scope.machineryEquipmentICS.id = 0;

			// List
			scope.machineryEquipmentsICS = [];

			// CRUD
			scope.partSerialNumber = {}
			scope.partSerialNumber.id = 0;

			// List
			scope.partSerialNumbers = [];

			scope.filteredArticle = [];
			scope.filteredBrand = [];
			scope.repairHistories = [];
			scope.equipmentHistories = [];

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

			scope.machineryEquipmentICS_id = 0;

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

		// CRUD Start
		
    // List Start
		self.list = function(scope) {
			
			scope.machineryEquipmentICS = {};
			scope.machineryEquipmentICS.id = 0;

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
			scope.partSerialNumber.part = "";
			scope.partSerialNumber.serial_number = "";
			
			scope.controls.edit.label="Edit";

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-ics/list.php',
					data: scope.machineryEquipmentsICS
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentsICS = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/machinery-equipments-ics.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};

		// Form Start
		self.machineryEquipmentICS = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			setTimeout(function(){
				(function($) {
					"use strict";
					// Single Search Select
					$("#js-example-basic-single").select2();
				})(jQuery);
			}
			,200);

			scope.machineryEquipmentICS = {};
			scope.machineryEquipmentICS.id = 0;

			scope.partSerialNumbers = [];
			scope.filteredArticle = [];
			scope.filteredBrand = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/machinery-equipment-ics.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			
			if (row != null) {
				
				scope.showAddButton = false;
				scope.showEditButton = true;

				if (scope.$id > 2) scope = scope.$parent;
				
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-ics/view.php',
					data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.machineryEquipmentICS);

					if (response.data.acquisition_date != null){scope.machineryEquipmentICS.acquisition_date = new Date(response.data.acquisition_date);}else{};
					
					self.filterArticle(scope,response.data.article_id);
					self.filterBrand(scope,response.data.article_id);
					self.listPartSerialNumber(scope);
					self.listPartSerialNumber(scope);
					self.fileList(scope,scope.machineryEquipmentICS.id);

					mode(scope, row);
					
				}, function myError(response) {
					
					// error
					
				});

			};

			setTimeout(function() {

				offices(scope);
				coaDescription(scope);
				brands(scope);
				articles(scope);
				funds(scope);
				suppliers(scope);
				brands(scope);
				fileUpload(scope);

			}, 500);
				
		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'machineryEquipmentICS')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			if (scope.machineryEquipmentICS.acquisition_cost >= 50000){
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Cost Above Php50,000.00 should be on PPE.');
				return;
			}

			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-ics/save.php',
					data: {machineryEquipmentICS: scope.machineryEquipmentICS}
				}).then(function mySuccess(response) {

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

							if(scope.machineryEquipmentICS.id==0){
									scope.machineryEquipmentICS.id = response.data;

							} else {

							};

							Swal.fire({
								title: "Data successfully saved!",
								html: `Do you want to add Serial Number?`,
								icon: "success",
								showDenyButton: true,
								showCancelButton: false,
								confirmButtonText: "No Thanks",
								denyButtonText: `Add Serial Number`
							}).then((result) => {
								/* Read more about isConfirmed, isDenied below */
								if (result.isConfirmed) {
									self.list(scope);
								} else if (result.isDenied) {
									document.querySelector('a[data-kt-countup-tabs="true"][href="#kt_user_view_overview_security"]').click();
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
					url: 'handlers/machinery-equipment-ics/delete.php',
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

    // List Start
		self.listPartSerialNumber = function(scope) {

			scope.showAddButton = false;
			scope.showEditButton = true;

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/part-serial-number/list.php',
					data: {machineryEquipmentId: scope.machineryEquipmentICS.id}
				}).then(function mySucces(response) {
					
					scope.partSerialNumbers = angular.copy(response.data);
					
				}, function myError(response) {

				});

		};
		
		// Form Start
		self.partSerialNumber = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.partSerialNumber = {};
			scope.partSerialNumber.id = 0;

			scope.showAddButton = false;

			mode(scope, row);

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/part-serial-number/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.partSerialNumber);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

		};
		// Form End

		// Add Function Start
		self.savePartSerialNumber = function(scope) {
			
			if (validate.form(scope,'partSerialNumber')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			if(scope.machineryEquipmentICS.id==0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add or save Machine/Equipment first!');
				return;
			}

			var spinner;
					spinner=document.querySelector("#spinner_form_submitt");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/part-serial-number/save.php',
					data: {partSerialNumber: scope.partSerialNumber, machineryEquipmentId: scope.machineryEquipmentICS.id}
				}).then(function mySuccess(response) {

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

							if(scope.partSerialNumber.id==0){
									scope.partSerialNumber.id = response.data;
									self.listPartSerialNumber(scope);
							} else {
									self.listPartSerialNumber(scope);
							};

							Swal.fire({
								title: "Serial Number Added Successfuly!",
								html: `Do you want to add more Serial Number or upload file?`,
								icon: "success",
								showDenyButton: true,
								showCancelButton: false,
								confirmButtonText: "Add Serial Number",
								denyButtonText: `Upload File`
							}).then((result) => {
								/* Read more about isConfirmed, isDenied below */
								if (result.isConfirmed) {
									self.listPartSerialNumber(scope);
								} else if (result.isDenied) {
									document.querySelector('a[data-kt-countup-tabs="true"][href="#kt_user_upload_files"]').click();
								}
							});	

							scope.partSerialNumber = {};
							scope.partSerialNumber.id = 0;
							
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
		self.deletePartSerialNumber = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete))
			return;

			var onOk = function() {

				$http({
					method: 'POST',
					url: 'handlers/part-serial-number/delete.php',
					data: {id: [row.id]}
				}).then(function mySucces(response) {
					
					self.listPartSerialNumber(scope);

				}, function myError(response) {
						
					// error
					
				});
			}

			bootstrapModal.confirmDelete(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});

		};
		// Delete End

		 // Equipment History List Start
		 self.equipmentHistory = function(scope, index) {

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/equipment-history.php',
					data: {equipmentHistories: scope.equipmentHistories, equipmentId: index.id}
				}).then(function mySucces(response) {
					
					scope.equipmentHistories = angular.copy(response.data);

					scope.showAddButton = false;
					
				}, function myError(response) {

				});

				setTimeout(function() {

					if(scope.equipmentHistories.length === 0) {
						$('#content').load('components/empty.html', function() {
							$timeout(function() { $compile($('#content')[0])(scope); },100);								
						});
					} else {
							$('#content').load('lists/equipment-history.html', function() {
								$timeout(function() { $compile($('#content')[0])(scope); },100);								
							});
					}

				},200)

		};
		 // Repair History List Start
		 self.repairHistory = function(scope, index) {

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/repair-history.php',
					data: {repairHistories: scope.repairHistories, equipmentId: index.id}
				}).then(function mySucces(response) {
					
					scope.repairHistories = angular.copy(response.data);

					scope.showAddButton = false;
					
				}, function myError(response) {

				});

				setTimeout(function() {

					if(scope.repairHistories.length === 0) {
						$('#content').load('components/empty.html', function() {
							$timeout(function() { $compile($('#content')[0])(scope); },100);								
						});
					} else {
						$('#content').load('lists/repair-history.html', function() {
							$timeout(function() { $compile($('#content')[0])(scope); },100);								
						});
					}

				},200)

		};

		 self.viewRepairHistory = function(scope, index) {

			var title = "Property Card";
			var dataThemeMode = localStorage.getItem('data-theme-mode');

			$timeout(function() {

				if (scope.$id > 2) scope = scope.$parent;
				
					$http({
						method: 'POST',
						url: 'handlers/machinery-equipment/view-repair-history.php',
						data: {id: index.id}
					}).then(function mySucces(response) {
						
						scope.viewRepairHistory = angular.copy(response.data);

						if(dataThemeMode == 'light'){
							scope.dataThemeMode = 'light';
						} else {
							scope.dataThemeMode = 'dark';
						}

					}, function myError(response) {
						
						// error
						
					});

			},500);

				var onOk = function(scope){}

				bootstrapModal.box7(scope,title,'components/modal/view-repair-history.html',onOk);
			

		};

		// CRUD END

		//VIEW PROPERTY CARD REPORT PDF
		self.viewPropertyCard=function(scope,row){
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment/propertycard.php',
				data: {id: row.id}

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

		// Filter Dropdown Start
		self.filterArticle = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment-ics/filter-articles.php',
			  data: {coaCodeArticle: item.code}
			}).then(function mySucces(response) {

				scope.filteredArticle = response.data;

			}, function myError(response) {
				
			});
			
		};

		self.filterBrand = function(scope,item) {

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment-ics/filter-brands.php',
			  data: {article_id: item.id}
			}).then(function mySucces(response) {

				scope.filteredBrand = response.data;

			}, function myError(response) {
				
			});
			
		};

		self.checkCost = function(scope,cost) {

			if(cost <= 49999) {
				scope.formHolder.machineryEquipmentICS.acquisition_cost.$invalid = false;
				scope.isError = false;
			} else {
				scope.formHolder.machineryEquipmentICS.acquisition_cost.$invalid = true;
				scope.isError = true;
			}
			
		};
		// Filter Dropdown End

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

		function articles(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/articles.php',
			}).then(function mySuccess(response) {
				
				scope.articles = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
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
				if(scope.machineryEquipmentICS.id == 0) {
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
						url: 'handlers/machinery-equipment-ics/upload-files.php',
						type: 'POST',
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(response) {

							scope.machineryEquipmentICS.fileNames = response;
		
						},
						error: function(error) {
								console.error('Error:', error);
						}
				});
	
				setTimeout(function() {

					var moduleName = 'MACHINERY AND EQUIPMENT ICS';
				
					$http({
						method: 'POST',
						url: 'handlers/file-uploads/save-file-names.php',
						data: {fileNames: scope.machineryEquipmentICS.fileNames, landId: scope.machineryEquipmentICS.id, module_name: moduleName}
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
									self.fileList(scope,scope.machineryEquipmentICS.id);
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

		//File List Start
		self.fileList = function(scope,land_ids) {

			var moduleName = 'MACHINERY AND EQUIPMENT ICS';

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			// scope.showAddButton = true;
			// scope.showEditButton = false;

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

			var fileUrl = './assets/files/machinery-equipment-ics/';

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

			var fileUrl = './assets/files/machinery-equipment-ics/';

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

			var moduleName = 'MACHINERY AND EQUIPMENT ICS';

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