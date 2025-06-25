angular.module('app-module',['notify','my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access,notify) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery Equipment Transfer";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipmentTransfer = {}
			scope.machineryEquipmentTransfer.id = 0;

			// List
			scope.machineryEquipmentTransfers = [];

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

			scope.disabledAccountableOfficer = true;
			scope.disableBeneficiary = true;

			scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
				add: {btn: false, label: 'New'},
				edit: {btn: false, label: 'Edit'},
				icon: {label: 'fa-eye'}
			};

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

		// CRUD Machinery Equipment Transfer Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;
			
			scope.controls.edit.label = "Edit";
			
			scope.machineryEquipmentData = [];
			scope.machineryEquipmentDataTransfer = [];

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-transfers/list.php',
					data: scope.machineryEquipmentTransfers
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentTransfers = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/machinery-equipment-transfers.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.machineryEquipmentTransfer = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.machineryEquipmentTransfer = {};
			scope.machineryEquipmentTransfer.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/machinery-equipment-transfer.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/machinery-equipment-transfers/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.machineryEquipmentTransfer);

					machineryEquipmentData(scope,row.id);
					
					if (response.data.par_date != null){scope.machineryEquipmentTransfer.par_date = new Date(response.data.par_date);}else{};

					mode(scope, row);

				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			offices(scope);

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'machineryEquipmentTransfer')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			if(scope.machineryEquipmentDataTransfer.length == 0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add Equipment.');
				return;
			}

			var accountable_officer = scope.machineryEquipmentTransfer.new_accountable_officer.name;

			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-transfers/save.php',
					data: {machineryEquipmentTransfer: scope.machineryEquipmentTransfer, machineryEquipmentDataTransfer: scope.machineryEquipmentDataTransfer}
				}).then(function mySuccess(response) {

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

						scope.machineryEquipmentTransfer.id = response.data;

						Swal.fire({
							title: "The equipment has been successfully added to " + accountable_officer,
							html: `Do you want to Print Report?`,
							icon: "success",
							showDenyButton: true,
							confirmButtonText: "No Thanks",
							denyButtonText: `Print Report`,
						}).then((result) => {
							/* Read more about isConfirmed, isDenied below */
							if (result.isConfirmed) {
								self.list(scope);
							} else if (result.isDenied) {
								viewPARreport(response.data,scope);
								self.list(scope);
							}
						});
							
					}, 500);

				}, function myError(response) {
					
					// error
					
				});

			}
				                                            // CRUD Machinery Equipment PAR END
		//Start / Api / Suggestions
		function machineryEquipmentData(scope,id){
			
			scope.currentPageAdd = scope.viewsAdd.currentPageAdd;
			scope.pageSizeAdd = 10;
			scope.maxSizeAdd = 5;

			scope.currentPageRemove = scope.viewsRemove.currentPageRemove;
			scope.pageSizeRemove = 10;
			scope.maxSizeRemove = 5;

			$http({
			  method: 'POST',
			  url: 'handlers/machinery-equipment-transfers/machinery-equipment-data.php',
			  data: {par_id: id}
			}).then(function mySucces(response) {
				
				scope.machineryEquipmentData = response.data;
				
			}, function myError(response) {
				 
			});
			
		};
		
		self.filterOfficer = function(scope, item) {
	
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-transfers/filter-officer.php',
				data: {officeId: item.id}
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});	
			
		};

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

		//End / Api / Suggestions

	//Others
	self.addFunction = function(scope,item) {

		let index = scope.machineryEquipmentData.findIndex(
			x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
		);

		scope.machineryEquipmentDataTransfer.push(scope.machineryEquipmentData[index]);
		scope.machineryEquipmentData.splice(index, 1);

	}

	self.removeFunction = function(scope,item) {

			let index = scope.machineryEquipmentDataTransfer.findIndex(
				x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
				);

			scope.machineryEquipmentData.push(scope.machineryEquipmentDataTransfer[index]);
			scope.machineryEquipmentDataTransfer.splice(index, 1);

	}
	//------

		//Show and Hide Element with Condition Start

		self.checkAccountableOfficer = function(scope) {

			if(scope.machineryEquipmentTransfer.accountable_officer.id == scope.machineryEquipmentTransfer.new_accountable_officer.id) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'New Accountable Officer cannot be same as Previous Accountable Officer!');
				scope.reparDisableSave = true;
				return;
			} else {
				scope.reparDisableSave = false;
			}

		}

				
		self.checkPurpose = function(scope) {
			if(scope.machineryEquipmentTransfer.purpose == "DONATION") {
				scope.disabledAccountableOfficer = true;
				scope.disableBeneficiary = false;
				scope.machineryEquipmentTransfer.office_id = "";
				scope.machineryEquipmentTransfer.new_accountable_officer = "";
			} else {
				scope.disabledAccountableOfficer = false;
				scope.disableBeneficiary = true;
				scope.machineryEquipmentTransfer.beneficiary = "";
			}
			
		}

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

		function viewPARreport(parId){

			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-transfers/reports/view-report.php',
				data: {id: parId}
			}).then(async function mySucces(response) {

				const container1 = document.createElement('div');
				const container2 = document.createElement('div');

				document.body.appendChild(container1);
				document.body.appendChild(container2);

				await Promise.all([
						ptrReport(response.data, container1),
						parReport(response.data, container2)
				]);

				document.body.removeChild(container1);
				document.body.removeChild(container2);

				self.list(scope);
			
			async function ptrReport(data) {
					//FUNCTION TO FORMAT amount
				function getFormattedAmount(amount) {
					return amount.toLocaleString("en-US");
				};
					
				var doc = new jsPDF('p','mm',[215.9,279]);

				//APPENDIX
				doc.setFontSize(8);
				doc.setFont('helvetica','italic','normal');
				doc.text(202.3, 12.7, 'Appendix 76','right');
				//title
				doc.setFontSize(12);
				doc.setFont('helvetica','bold','bold');
				doc.text(107.5, 25.4, 'PROPERTY TRANSFER REPORT','center');
				doc.setFontSize(10);
				doc.setFont('helvetica','bold','bold');	

				doc.text(12.7, 38.1, 'Entity Name: Provincial Government of La Union');
				// textWidth = doc.getTextWidth('Provincial Government of La Union');
				// doc.line(22, 38.9, 22 + textWidth + 2, 38.9);

				doc.text(202.3, 38.1, 'Fund Cluster: _____________ ','right');
				// textWidth = doc.getTextWidth('Provincial Government of La Union');
				// doc.line(22,43.9, 22 + textWidth + 2 , 43.9);
				// doc.text(202.37, 43.1, "PAR No.: " + scope.datas[0].par_no,'right');
				// textWidth = doc.getTextWidth("PAR No.: " + scope.datas[0].par_no);
				// doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);
				doc.line(12.7, 41, 202.3 , 41);
				doc.setFont('helvetica','normal','normal');	
				doc.text(14, 45, 'From Accountable Officer/Agency/Fund Cluster:');
				doc.text(14, 50, data.prev_accountable_officer.prev_accountable_officer);
				doc.text(14, 55, 'To Accountable Officer/Agency/Fund Cluster:');
				doc.text(14, 60, data.accountable_officer.accountable_officer);
				doc.line(12.7, 41, 12.7 , 62);
				doc.line(12.7, 62, 202.3 , 62);
				doc.line(155, 41, 155 , 62);
				doc.line(202.3, 41, 202.3 , 62);

				doc.text(156, 50, "PTR No.:");
				doc.text(201, 50, data.ptr_no,'right');

				doc.text(156, 60, "Date:");
				doc.text(201, 60, data.par_date,'right');

				doc.line(12.7, 62, 12.7 , 80);
				doc.text(14, 66, "Transfer Type: (check only one)");
				doc.line(202.3, 62, 202.3 , 80);

				doc.rect(48,70,3,3);
				doc.text(55, 72.5, "Donation");
				doc.rect(95,70,3,3);
				doc.text(102, 72.5, "Relocate");

				doc.rect(48,75,3,3);
				doc.text(55, 77.5, "Reassignment");
				doc.rect(95,75,3,3);
				doc.text(102, 77.5, "Others");

				switch(data.status)
				{
					case 'DONATION':
						doc.text(48.5, 72.5, "x");
						break;

					case 'REASSIGN':
						doc.text(48.5, 77.5, "x");
						
						break;

					case 'RELOCATE':
						doc.text(95.5, 72.5, "x");
						break;

					case 'OTHERS':
						doc.text(95.5, 77.5, "x");
						break;
				};

				
				var rows = [];
				angular.forEach(data.par_machinery_equipment, function(equipmentList,key) {
				
					var row = [];

					row.push(equipmentList.machinery_equipment.acquisition_date);
					row.push(equipmentList.machinery_equipment.property_number);
					row.push(equipmentList.machinery_equipment.description);
					row.push(equipmentList.machinery_equipment.acquisition_cost);				
					row.push(equipmentList.machinery_equipment.equipment_condition);	
					rows.push(row);
					
				});
				
				//COLUMS
				let head = [
					[
						{
							content: 'Date Acquired', 
							colSpan: 1, 
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle' ,
								fontSize: number = 8,
								cellWidth: number=26,
								fontStyle: 'bold',
							}
						}, 
						{
							content: 'Property No.', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle', 
								cellWidth: number=44,
								fontSize: number = 8,
								
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
								cellWidth: number=70,
								fontStyle: 'bold',
							}
						},
						{
							content: 'Amount', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle' ,
								fontSize: number = 8,
								cellWidth: number=21.1
							}
						},
						{
							content: 'Condition of PPE', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=28.5
							}
						},

					],
				];

				doc.autoTable({
					startY: 80,
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
						fontSize: number = 8,  
						
					},
					columnStyles: {
						0: { halign: 'center' },
						1: { halign: 'center' },
						2: { halign: 'left' },
						3: { halign: 'right' }, 
						4: { halign: 'center' },
					},
					// foot: foots,
				});

				//REASON FOR TRANSFER
				const lastRowCoord = doc.lastAutoTable.finalY;
				doc.setFontSize(8);
				doc.setDrawColor(0);
				doc.setLineWidth(.2);
				doc.setFont('helvetica','normal','normal');	
				
				doc.line(12.7, lastRowCoord, 12.7 , lastRowCoord+10);
				doc.line(202.3, lastRowCoord, 202.3 , lastRowCoord+10);
				doc.line(12.7, lastRowCoord+10, 202.3 , lastRowCoord+10);
				doc.text(14, lastRowCoord+4, "Reason for Transfer:");
				doc.line(40, lastRowCoord+8, 201 , lastRowCoord+8);

				doc.text(43,lastRowCoord+7,'note');

				//SIGNATORIES

				doc.rect(12.7,lastRowCoord+10,189.6,35);
				doc.text(62.265,lastRowCoord+15,"Approved",'center');
				doc.text(62.265,lastRowCoord+28,'approve_by','center');
				doc.text(62.265,lastRowCoord+35,data.approved_by.signatory_name,'center');

				doc.text(119.80,lastRowCoord+15,"Released/Issued by:",'center');
				doc.text(119.80,lastRowCoord+28,'released_by','center');
				doc.text(119.80,lastRowCoord+35,data.signatory.signatory_name,'center');

				doc.text(175.33,lastRowCoord+15,"Received by:",'center');
				doc.text(175.33,lastRowCoord+28,'accountable_officer','center');
				doc.text(175.33,lastRowCoord+35,data.accountable_officer.accountable_officer,'center');

				doc.text(14,lastRowCoord+23,'Signature:');
				doc.line(38,lastRowCoord+23,90.53,lastRowCoord+23);
				doc.line(93.53,lastRowCoord+23,146.06,lastRowCoord+23);
				doc.line(149.06,lastRowCoord+23,201.59,lastRowCoord+23);

				doc.text(14,lastRowCoord+30,'Printed Name:');
				doc.line(38,lastRowCoord+30,90.53,lastRowCoord+30);
				doc.line(93.53,lastRowCoord+30,146.06,lastRowCoord+30);
				doc.line(149.06,lastRowCoord+30,201.59,lastRowCoord+30);

				doc.text(14,lastRowCoord+37,'Designation:');
				doc.line(38,lastRowCoord+37,90.53,lastRowCoord+37);
				doc.line(93.53,lastRowCoord+37,146.06,lastRowCoord+37);
				doc.line(149.06,lastRowCoord+37,201.59,lastRowCoord+37);

				doc.text(14,lastRowCoord+42,'Date:');
				doc.line(38,lastRowCoord+42,90.53,lastRowCoord+42);
				doc.line(93.53,lastRowCoord+42,146.06,lastRowCoord+42);
				doc.line(149.06,lastRowCoord+42,201.59,lastRowCoord+42);


				//PAGE NUMBER
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
		
			}
			
			async function parReport(data) {

				function getFormattedDate(date) {
					var dateForwarded = new Date(date);
					var options = {  year: 'numeric', month: 'long', day: 'numeric' };
				
					return dateForwarded.toLocaleDateString("en-US", options);
				
				};
				
				//FUNCTION TO FORMAT amount
				function getFormattedAmount(amount) {
					return amount.toLocaleString("en-US");
				};
				
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
				
				doc.text(202.37, 43.1, "PAR No.: " + data.par_no,'right');
				textWidth = doc.getTextWidth("PAR No.: " + data.par_no);
				doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);
			
				var rows = [];
				var cancelled_equipments;
				angular.forEach(data.par_machinery_equipment, function(pars_equipment,key) {
				
					var row = [];
					row.push('1');
					row.push('1');
					row.push(pars_equipment.machinery_equipment.description);
					row.push(pars_equipment.machinery_equipment.property_number);
					row.push(pars_equipment.machinery_equipment.acquisition_date);
					row.push(getFormattedAmount(pars_equipment.machinery_equipment.acquisition_cost));				
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
				doc.text(data.accountable_officer.accountable_officer,61, startY_signatories + 16, 'center');
				doc.text(data.accountable_officer.position.position_description,61, startY_signatories + 26, 'center');
			
				doc.setFont('helvetica','normal');
				doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
				doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
				doc.text("Position/Office",61, startY_signatories + 30, 'center');
				doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
				doc.text("Date",61, startY_signatories + 40, 'center');			
			
				doc.setFont('helvetica','bold','bold');
				doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");
			
				doc.text(data.signatory.signatory_name,155.3, startY_signatories + 16, 'center');
				doc.text(data.signatory.position,155.3, startY_signatories + 26, 'center');
				
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
			}
				
			}, function myError(response) {
				// error
			});
			
		};

	};
	
	return new app();
	
});