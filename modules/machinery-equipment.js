angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipment = {}
			scope.machineryEquipment.id = 0;

			// List
			scope.machineryEquipments = [];

			// List
			scope.machineryEquipmentsSemiExpandable = [];

			// CRUD
			scope.partSerialNumber = {}
			scope.partSerialNumber.id = 0;

			// List
			scope.partSerialNumbers = [];

			// CRUD
			scope.assignTo = {}
			scope.assignTo.id = 0;

			scope.filteredArticle = [];
			scope.filteredBrand = [];
			scope.repairHistories = [];
			scope.equipmentHistories = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

			// for Pagination
			scope.viewsSE = {};
			scope.viewsSE.currentPageSE = 1;
			scope.viewsSE.list = true;

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

			scope.machineryEquipment_id = 0;

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
			
			scope.partSerialNumber.part = "";
			scope.partSerialNumber.serial_number = "";

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/list.php',
				}).then(function mySucces(response) {
					
					scope.machineryEquipments = angular.copy(response.data);

				}, function myError(response) {

				});

				$('#content').load('lists/machinery-equipments.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

				semiExpandablelist(scope);
				
		};
		
    // List Start
		function semiExpandablelist(scope) {

			scope.currentPageSE = scope.viewsSE.currentPageSE;
			scope.pageSizeSE = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
			scope.partSerialNumber.part = "";
			scope.partSerialNumber.serial_number = "";

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/semi-expandable-list.php',
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentsSemiExpandable = angular.copy(response.data);
					
				}, function myError(response) {

				});

		};
		
		// Form Start
		self.machineryEquipment = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.machineryEquipment = {};
			scope.machineryEquipment.id = 0;

			scope.assignTo = {};
			scope.assignTo.id = 0;

			scope.checkSerial = {};
			// scope.checkSerial.id = 0;
			
			scope.assignTo.par_date = new Date();

			scope.partSerialNumbers = [];
			scope.filteredArticle = [];
			scope.filteredBrand = [];
			scope.fileList = [];

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/machinery-equipment.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;

				scope.isError = false;

				$http({
				  method: 'POST',
				  url: 'handlers/machinery-equipment/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.machineryEquipment);
					
					if (response.data.acquisition_date != null){scope.machineryEquipment.acquisition_date = new Date(response.data.acquisition_date);}else{};
					
					self.fileList(scope,scope.machineryEquipment.id);
					self.filterArticle(scope,response.data.article_id);
					self.filterBrand(scope,response.data.article_id);
					self.filterOfficer(scope, response.data.office_id);
					self.listPartSerialNumber(scope);
					self.assignedTo(scope, row);
					
					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});

			};
				articles(scope);
				locations(scope);
				funds(scope);
				suppliers(scope);
				brands(scope);
				coaDescription(scope);
				offices(scope);
				fileUpload(scope);
				
		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'machineryEquipment')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/save.php',
					data: {machineryEquipment: scope.machineryEquipment}
				}).then(function mySuccess(response) {

					if(scope.machineryEquipment.id==0){
						scope.machineryEquipment.id = response.data;
					}

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.machineryEquipment.id==0) {
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
					url: 'handlers/machinery-equipment/delete.php',
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
					data: {machineryEquipmentId: scope.machineryEquipment.id}
				}).then(function mySucces(response) {
					
					scope.partSerialNumbers = angular.copy(response.data);
					
				}, function myError(response) {

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

		// self.assignToOffice = function(scope,MEOffice) {
	
		// 	$http({
		// 		method: 'POST',
		// 		url: 'handlers/machinery-equipment/offices.php',
		// 		data: {office: MEOffice.id}
		// 	}).then(function mySuccess(response) {
				
		// 		scope.officesList = angular.copy(response.data);
			
		// 		scope.assignTo = {};
		// 		scope.assignTo.office_id = MEOffice;
				
		// 	}, function myError(response) {
				
		// 		// error
				
		// 	});
			
		// };
// Form Start
	self.assignedTo = function(scope,row) {

		if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
		return;

		scope.assignTo = {};
		scope.assignTo.id = 0;

		scope.showAddButton = false;

		mode(scope, row);
			
			if (scope.$id > 2) scope = scope.$parent;

			scope.showAddButton = false;
			
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment/view-assign.php',
				data: {id: row.id}
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
	// Form End
		self.assignTo = function(scope) {

			if (validate.form(scope,'assignTo')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			if(scope.machineryEquipment.id==0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add or save Machine/Equipment first!');
				return;
			}

			if(scope.machineryEquipment.status=='Not Available') {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'This Equipment is already assigned!');
				return;
			}

			if(scope.machineryEquipment.status=='DISPOSED') {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'This Equipment is already DISPOSED!');
				return;
			}

			var spinner;
					spinner=document.querySelector("#spinner_form_submittt");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment/assign-to.php',
					data: {assignTo: scope.assignTo, machineryEquipment: scope.machineryEquipment}
				}).then(function mySuccess(response) {

					var accountableOfficer = scope.assignTo.accountable_officer.name;

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

							if(scope.assignTo.id==0){
									scope.assignTo.id = response.data;
							} else {
							};

							Swal.fire({
								title: "Equipment has been Assigned to " +accountableOfficer,
								html: `Do you want to Print Report?`,
								icon: "success",
								showDenyButton: true,
								showCancelButton: false,
								confirmButtonText: "No Thanks",
								denyButtonText: `Print Report`,
							}).then((result) => {
								/* Read more about isConfirmed, isDenied below */
								if (result.isConfirmed) {
									
								} else if (result.isDenied) {

									if(scope.machineryEquipment.acquisition_cost >= 50000) {
										viewPARreport(response.data,scope);
										self.list(scope);
									} else {
										viewICS(response.data,scope);
										self.list(scope);
									}
									
								}
							});
							
					}, 500);

				}, function myError(response) {
					
					// error
					
				});
		}
		
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

			if(scope.machineryEquipment.id==0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add or save Machine/Equipment first!');
				return;
			}

			if (scope.checkSerial.length != 0){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Duplicate Entry!');
				return;
			}
			
			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/part-serial-number/save.php',
					data: {partSerialNumber: scope.partSerialNumber, machineryEquipmentId: scope.machineryEquipment.id}
				}).then(function mySuccess(response) {

					setTimeout(function() {

							if(scope.partSerialNumber.id==0){
									scope.partSerialNumber.id = response.data;
									self.listPartSerialNumber(scope);
							} else {
									self.listPartSerialNumber(scope);
							};
							scope.partSerialNumber = {};
							scope.partSerialNumber.id = 0;
							
					}, 500);

				}, function myError(response) {
					
					// error
					
				});
			}
			if(scope.partSerialNumber.id==0) {
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

				bootstrapModal.box7(scope,title,'components/modal/view-repair-history.html');
			

		};

		self.requestForPreInspection = function(scope, itemId) {

			// console.log(itemId);
			if(scope.me.status == 'Available') {
				alert("Availalbe");
			}

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
							url: 'handlers/machinery-equipment/pir-request/save.php',
							data: { officeEquipment: scope.me, note: remarks, equipmentId: itemId.id }
						});
						return response.data;
					} catch (error) {
							// Handle error
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
						self.list(scope);
						} else {
							Swal.fire({
								position: "center",
								icon: "error",
								title: "You've already requested!",
								showConfirmButton: false,
								timer: 1500
							});
						}
							
					}
				});
		}

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
			  url: 'handlers/machinery-equipment/filter-articles.php',
			  data: {coaCodeArticle: item.code}
			}).then(function mySucces(response) {

				scope.filteredArticle = response.data;

			}, function myError(response) {
				
			});
			
		};

		// Filter Dropdown Start
		function locations(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment/locations.php',
			}).then(function mySucces(response) {

				scope.locations = response.data;

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

		self.checkSerial = function(scope,serialNumber) {

			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment/check-serial.php',
				data: {serialNumber: serialNumber}
			}).then(function mySuccess(response) {
				
				scope.checkSerial = angular.copy(response.data);

				if(scope.checkSerial.length != 0) {
					scope.formHolder.partSerialNumber.serial_number.$invalid = true;
					scope.isError = true;
				} else {
					scope.formHolder.partSerialNumber.serial_number.$invalid = false;
					scope.isError = false;
				}
				
			}, function myError(response) {
				
				// error
				
			});

			// if(cost >= 50000) {
			// 	scope.formHolder.machineryEquipment.acquisition_cost.$invalid = false;
			// 	scope.isError = false;
			// } else {
			// 	scope.formHolder.machineryEquipment.acquisition_cost.$invalid = true;
			// 	scope.isError = true;
			// }
			
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
				if(scope.machineryEquipment.id == 0) {
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
						url: 'handlers/machinery-equipment/upload-files.php',
						type: 'POST',
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,
						success: function(response) {

							scope.machineryEquipment.fileNames = response;
		
						},
						error: function(error) {

						}
				});
	
				setTimeout(function() {

					var moduleName = 'MACHINERY AND EQUIPMENT';

					var onOk = function() {
						$http({
							method: 'POST',
							url: 'handlers/file-uploads/save-file-names.php',
							data: {fileNames: scope.machineryEquipment.fileNames, landId: scope.machineryEquipment.id, module_name: moduleName}
						}).then(function mySucces(response) {
							
								self.fileList(scope,scope.machineryEquipment.id);
							
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

			var moduleName = 'MACHINERY AND EQUIPMENT';

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

			var fileUrl = './assets/files/machinery-equipment/';

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

			var fileUrl = './assets/files/machinery-equipment/';

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

			var moduleName = 'MACHINERY AND EQUIPMENT';

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
		//PRINT PROPERTY STICKER
		self.printPropSticker = function(details) {
			
			new QRCode("qr_code", {
				text: "http://10.10.26.160/ppe-new/qr-machinery-furniture-physical-count.php?type=%27Machinery%20Equipment%27&id=" + details.me.id,
				width: 75,
				height: 75,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			});
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment/propertySticker.php',
				data: {ppe_id: details.me.id}
			  }).then(function mySucces(response) {
  
				printQR(response.data)
  
			  }, function myError(response) {
				  
			  });


		}



function printQR(list) {

var doc = new jsPDF('p','mm',[215.9,279]);
var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQzNDBFNzZBRUU2MTFFN0JEODlFQTI4Q0RCRUUwRDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQzNDBFNzdBRUU2MTFFN0JEODlFQTI4Q0RCRUUwRDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDM0MEU3NEFFRTYxMUU3QkQ4OUVBMjhDREJFRTBEMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NDM0MEU3NUFFRTYxMUU3QkQ4OUVBMjhDREJFRTBEMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmNlVY0AA0h6SURBVHja7H0HgFxl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";
	//BORDERLINE
	doc.line(4, 4, 96, 4);
	doc.line(4, 4, 4, 70);
	doc.line(96, 4, 96, 70);
	doc.line(4, 70, 96, 70);
	//title
	doc.setFontSize(7);
	doc.setFont('helvetica','bold','bold');
	doc.text(50, 13, 'REPUBLIC OF THE PHILIPPINES','center');
	doc.text(50, 16, 'Province of La Union','center');
	doc.setFontSize(10);
	doc.text(50, 22, 'GOVERNMENT PROPERTY','center');


	let base64Image = $('#qr_code img').attr('src');
	doc.addImage(base64Image, 'png', 6, 6);
	doc.addImage(logo, 'PNG', 74, 6, 20, 20);

	doc.setFontSize(8);
	doc.setFont('helvetica','normal','normal');
	doc.text(6, 33, 'PROPERTY NO.' );
	doc.setFont('helvetica','bold','bold');
	doc.setFontSize(10);

	//RESIZE PROPERTY NUMBER FONTSIZE BASED ON TEXT WIDTH
	if ((doc.getStringUnitWidth(list.property_number) * 10)/2.8125 > 64 ) 
	{
		
		for (let fontSize=10; fontSize>4;fontSize-- )
		{
			
			if ((doc.getStringUnitWidth(list.property_number) * fontSize)/2.8125 < 64)
			{
				doc.setFontSize(fontSize);
				doc.text(30, 33,  list.property_number,({maxWidth: 0, align:	'left',}));
				break;
			}
		}
	}
	else
	{
		doc.setFontSize(10);
		doc.text(30, 33,  list.property_number,({maxWidth: 0, align:	'left',}));
	}

	doc.setFontSize(8);
	doc.setFont('helvetica','normal','normal');
	doc.text(6, 37, 'ARTICLE' );
	doc.setFont('helvetica','bold','bold');
	doc.text(30, 37,  list.article_name);

	//LIMIT PROPERTY DESCRIPTION TEXT TO 3 ROWS
	doc.setFont('helvetica','normal','normal');
	doc.text(6, 41, 'DESCRIPTION' );
	doc.setFont('helvetica','bold','bold');
	let propertyDescription = list.description;
	doc.text(30, 41,  propertyDescription.substring(0,133), ({
		maxWidth:	64,
		align:	'justify',
	}));

	let noOfLines = doc.getTextWidth(propertyDescription.substring(0,133));
	let someRow = 0;
	someRow = noOfLines/64;
	for (let noOfRows=1; noOfRows<=3; noOfRows++ ) 
	{
		
		if (someRow <= noOfRows)
		{
			someRow = noOfRows;
			break;
		}
	}

	// SERIAL NOS
	let serialArray = list.serialNo;
	let serialNumbers='';
	if ( serialArray.length ==0)
	{
		serialNumbers='n/a'
	}
	
	angular.forEach(serialArray, function(serials,key) {
		serialNumbers = serialNumbers + serials.part + '-' + serials.serial_number + '; '
	});
	let serialNumber=serialNumbers;
	doc.setFont('helvetica','normal','normal');
	doc.text(6, 45 + (2*someRow),'SERIAL NO(s).')
	doc.setFont('helvetica','bold','bold');
	doc.text(30, 45 + (2*someRow),  serialNumber.substring(0,133), ({
		maxWidth:	64,
		align:	'justify',
	}));

	//ACQUISITION DATE AND COST
	doc.setFont('helvetica','normal','normal');
	doc.text(6,45 + (2*someRow)+4, 'ACQ. COST',({
		maxWidth:	0,
		align:	'left',
	}));
	doc.text(55,45 + (2*someRow)+4, 'ACQ. DATE',({
		maxWidth:	0,
		align:	'left',
	}));
	doc.setFont('helvetica','bold','bold');
	doc.text(30,45 + (2*someRow)+4, list.acquisition_cost,({
		maxWidth:	0,
		align:	'left',
	}));
	doc.text(73,45 + (2*someRow)+4, list.acquisition_date,({
		maxWidth:	0,
		align:	'left',
	}));

	// SIGNATORIES
	doc.setFont('helvetica','bold','bold');
	doc.text(18,65, list.prop_custodian.signatory_name,({
		maxWidth:	0,
		align:	'center',
	}));
	doc.text(50,65, list.pgso_officer.signatory_name,({
		maxWidth: 0, 
		align:	'center',
	}));
	doc.text(82,65, list.coa_rep.signatory_name,({
		maxWidth: 0, 
		align:	'center',
	}));

	doc.setFont('helvetica','normal','normal');
	doc.text(18,68, list.prop_custodian.title,({
		maxWidth: 0, 
		align:	'center',
	}));
	doc.text(50,68, list.pgso_officer.title,({
		maxWidth: 0, 
		align:	'center',
	}));
	doc.text(82,68, list.coa_rep.title,({
		maxWidth: 0, 
		align:	'center',
	}));

	
	var blob = doc.output('blob');
	window.open(URL.createObjectURL(blob));

};

function viewPARreport(PARid){
	
	$http({
		method: 'POST',
		url: 'handlers/report-PAR/viewPAR.php',
		data: {id: PARid}

	}).then(function mySucces(response) {
		// scope.datas = response.data;
		printPAR(response.data);
}, function myError(response) {
	// error
	});
};

function getFormattedDate(date) {
	var dateForwarded = new Date(date);
	var options = {  year: 'numeric', month: 'long', day: 'numeric' };

	return dateForwarded.toLocaleDateString("en-US", options);

};

//FUNCTION TO FORMAT amount
function getFormattedAmount(amount) {
	return amount.toLocaleString("en-US");
};

function printPAR(list) {

	var doc = new jsPDF('p','mm',[215.9,279]);

	//APPENDIX
	doc.setFontSize(8);
	doc.setFont('helvetica','italic','normal');
	doc.text(202.3, 12.7, 'Appendix 51','right');
	//title
	doc.setFontSize(10);
	doc.setFont('helvetica','bold','bold');
	doc.text(107.5, 25.4, 'PROPERTY ACKNOWLEDGEMENT RECEIPT','center');
	doc.setFontSize(10);
	doc.setFont('helvetica','bold','bold');	

	doc.text(12.7, 38.1, 'LGU: Provincial Government of La Union');
	textWidth = doc.getTextWidth('Provincial Government of La Union');
	doc.line(22, 38.9, 22 + textWidth + 2, 38.9);

	doc.text(12.7, 43.1, 'Fund: ');
	textWidth = doc.getTextWidth('Provincial Government of La Union');
	doc.line(22,43.9, 22 + textWidth + 2 , 43.9);
	
	doc.text(202.37, 43.1, "PAR No.: " + list[0].par_no,'right');
	textWidth = doc.getTextWidth("PAR No.: " + list[0].par_no);
	doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);

	var rows = [];
	var cancelled_equipments;
	angular.forEach(list[0].equipment, function(pars_equipment,key) {
	
		var row = [];
		row.push('1');
		row.push('1');
		row.push(pars_equipment.description);
		row.push(pars_equipment.property_number);
		row.push(pars_equipment.acquisition_date);
		row.push(getFormattedAmount(pars_equipment.acquisition_cost));				
		rows.push(row);

	

		if (list[0].cancelled === undefined || list[0].cancelled.length == 0) {

		}
		else 
		{
			if (list[0].equipment.length == key+1)
				{
				cancelled_equipments = "The following equipment(s) already had new PAR:   ";
				angular.forEach(list[0].cancelled, function(cancelledPar,key1) {

				cancelled_equipments = cancelled_equipments + cancelledPar.prop_no + "(" + cancelledPar.PAR_No + ")";
					if (key1 != list[0].cancelled.length-1)
					{
						cancelled_equipments = cancelled_equipments + ", ";
					}

				});
				var row = [];
				row.push('1');
				row.push('1');
				row.push(pars_equipment.description);
				row.push(pars_equipment.property_number);
				row.push(pars_equipment.acquisition_date);
				row.push(getFormattedAmount(pars_equipment.acquisition_cost));
				rows.push(row);
				row.unshift({
					colSpan: 6,
					content: cancelled_equipments,
					styles: { valign: 'middle', halign: 'left' },
				})
			}
		}

		
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

	var nestedTableCell = {
		content: '',
		// Dynamic height of nested tables are not supported right now
		// so we need to define height of the parent cell
		styles: { minCellHeight: 45 },
	} 
	const  startY_signatories=doc.lastAutoTable.finalY;
	const  margin_signatories=doc.lastAutoTable.settings.tableWidth;
	
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
	var AccountableOfficerSig=list[0].accountable_officer;
	doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
	doc.text(list[0].position_description,61, startY_signatories + 26, 'center');

	doc.setFont('helvetica','normal');
	doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
	doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
	doc.text("Position/Office",61, startY_signatories + 30, 'center');
	doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
	doc.text("Date",61, startY_signatories + 40, 'center');			

	doc.setFont('helvetica','bold','bold');
	doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");

	var issuedBySignatory=list[0].PropCustodian[0].signatoryName;
	doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
	doc.text(list[0].PropCustodian[0].position,155.3, startY_signatories + 26, 'center');
	
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

	//VIEW PAR REPORT PDF
	function viewICS(ICSid,scope){
		$http({
			method: 'POST',
			url: 'handlers/report-ICS/viewICS.php',
			data: {id: ICSid}

		}).then(function mySucces(response) {
			scope.datas = response.data;
			printICS(scope);
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
	
	function printICS(scope) {
	
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

	self.hideEditButton = function(scope) {
		console.log(scope);
		if(scope.assignTo.id == 0 || scope.assignTo.office_id == 33) {
			scope.disableAssignTo = false;
			scope.disableAssignButton = false;
		} else {
			scope.disableAssignTo = true;
			scope.disableAssignButton = true;
		}
		
	}
	self.showEditButton = function(scope) {
		scope.showEditButton = true;
	}

};
	
	return new app();
	
});