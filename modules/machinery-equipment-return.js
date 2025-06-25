angular.module('app-module',['notify','my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access,notify) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery Equipment RETURN";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipmentReturn = {}
			scope.machineryEquipmentReturn.id = 0;

			// List
			scope.machineryEquipmentReturns = [];

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

			//for Hidding Elements
			scope.disabledReturnedToGSO = true;

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

		// CRUD Machinery Equipment RETURN Start
		
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
			scope.machineryEquipmentDataReturn = [];

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-returns/list.php',
					data: scope.machineryEquipmentReturns
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentReturns = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/machinery-equipment-returns.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		// Form Start
		self.machineryEquipmentReturn = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.machineryEquipmentReturn = {};
			scope.machineryEquipmentReturn.id = 0;

			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/machinery-equipment-return.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/machinery-equipment-returns/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.machineryEquipmentReturn);

					machineryEquipmentData(scope,row.id);

					mode(scope, row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

			accountableOfficer(scope);

		};
		// Form End

		// Add Function Start
		self.save = function(scope) {
			
			if (validate.form(scope,'machineryEquipmentReturn')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			if(scope.machineryEquipmentDataReturn.length == 0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add Equipment.');
				return;
			}

			var accountable_officer;
			var modalTitle;
			if(typeof scope.machineryEquipmentReturn.new_accountable_officer !== 'undefined'){
				accountable_officer = scope.machineryEquipmentReturn.new_accountable_officer.name;
				modalTitle = 'The equipment has been successfully returned to ';
			} else {
				accountable_officer = '';
				modalTitle = 'The equipment has been returned for repair ';
			};

			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-returns/save.php',
					data: {machineryEquipmentReturn: scope.machineryEquipmentReturn, machineryEquipmentDataReturn: scope.machineryEquipmentDataReturn}
				}).then(function mySuccess(response) {

					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

							scope.machineryEquipmentReturn.id = response.data;

							Swal.fire({
								title: modalTitle + accountable_officer,
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
									self.viewReturnReport(scope, response.data);
									self.list(scope);
								}
							});
							
					}, 500);

				}, function myError(response) {
					
					// error
					
				});

		}

		//MODAL Start
	
		// MODAL END

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
			  url: 'handlers/machinery-equipment-returns/machinery-equipment-data.php',
			  data: {par_id: id}
			}).then(function mySucces(response) {
				
				scope.machineryEquipmentData = response.data;
				
				if(scope.machineryEquipmentData.length == 0) {
					scope.returnDisabled = true;
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No Item to be return');
					return;
				} else {
					scope.returnDisabled = false;
				}
				
			}, function myError(response) {
				 
			});
			
		};

		function accountableOfficer(scope) {
	
			$http({
				method: 'POST',
				url: 'api/suggestions/gso-employees.php',
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = angular.copy(response.data);

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

		scope.machineryEquipmentDataReturn.push(scope.machineryEquipmentData[index]);
		scope.machineryEquipmentData.splice(index, 1);

	}

	self.removeFunction = function(scope,item) {

			let index = scope.machineryEquipmentDataReturn.findIndex(
				x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
				);

			scope.machineryEquipmentData.push(scope.machineryEquipmentDataReturn[index]);
			scope.machineryEquipmentDataReturn.splice(index, 1);

	}
	//------

		//Show and Hide Element with Condition Start

		
		self.checkPurpose = function(scope) {

			if(scope.machineryEquipmentReturn.purpose == "REPAIR") {
				scope.disabledReturnedToGSO = true;
			} else {
				scope.disabledReturnedToGSO = false;
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

		self.viewReturnReport = function(scope, row){

			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-returns/reports/return-report.php',
				data: {id: row}

			}).then(function mySucces(response) {
				scope.datas = response.data;
				print(scope);
			}, function myError(response) {
				// error
			});

		};

		function getFormattedDate(date) {
			var dateForwarded = new Date(date);
			var options = {  year: 'numeric', month: 'long', day: 'numeric' };

			return dateForwarded.toLocaleDateString("en-US", options);

		  };

			function getFormattedAmount(amount) {
				return amount.toLocaleString("en-US");
			};
			
			function print(scope) {
		
				var doc = new jsPDF('p','mm',[215.9,279]);
	
				//APPENDIX
				doc.setFontSize(8);
				doc.setFont('helvetica','italic','normal');
				doc.text(12.7, 12.7, 'LGU Form No. 12','left');
				//title
				doc.setFontSize(10);
				doc.setFont('helvetica','bold','bold');
				doc.text(107.5, 25.4, 'PROPERTY RETURN SLIP','center');
				doc.setFontSize(10);
				doc.setFont('helvetica','bold','bold');	
	
				doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
				textWidth = doc.getTextWidth('Provincial Government of La Union');
				doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
	
				doc.text(12.7, 43.1, 'Purpose:    Disposal('+scope.datas.for_disposal+')  Repair('+scope.datas.for_repair+')  Returned to Stock('+scope.datas.for_return_to_stock+')  Others('+scope.datas.for_others+')');
				textWidth = doc.getTextWidth('Provincial Government of La Union');
			
				var rows = [];
				var totalCost = 0; // Initialize the total cost variable

				angular.forEach(scope.datas.par_machinery_equipment, function(returnEquipment, key) {
					
					var row1 = [
						'1',
						'1',
						returnEquipment.machinery_equipment.description,
						returnEquipment.machinery_equipment.property_number,
						returnEquipment.machinery_equipment.acquisition_date,
						returnEquipment.machinery_equipment.accountable_officer.accountable_officer,
						getFormattedAmount(returnEquipment.machinery_equipment.acquisition_cost),
						getFormattedAmount(returnEquipment.machinery_equipment.acquisition_cost)
					];

					totalCost += parseFloat(returnEquipment.machinery_equipment.acquisition_cost); // Accumulate the total cost

					rows.push(row1);
				});

				var row2 = [
					'', // Add your data here
					'',
					{
						content: '*****nothing follows*****',
						styles: { fontStyle: 'bold' } // Use styles to make text bold
					},
					'',
					'',
					'',
					'',
					''
				];
				rows.push(row2);
				
				var row3 = [
					'', // Add your data here
					'',
					'Note:  '+ scope.datas.note +'',
					'',
					'',
					'',
					'',
					''
				];
				rows.push(row3);
				
				var row4 = [
					'', // Add your data here
					'',
					'',
					'',
					'',
					'Total',
					{
						content: 'P',
						styles: {
							halign: 'right' // Align "P" to the right
						} // Use styles to make text bold
					},
					{
						content: getFormattedAmount(totalCost)+'.00', // Display the total cost with two decimal places
						styles: { fontStyle: 'bold' } // Use styles to make text bold
					}
				];
				rows.push(row4);
				
				var row5 = [
					{
						content: 'CERTIFICATION', // Display the total cost with two decimal places
						colSpan: 8, // Use colSpan to create a single cell that spans 6 columns
						styles: {
							halign: 'center' // Align the cell content to the center
						}
					} // Add your data here
				];
				rows.push(row5);
				

				//COLUMS
				let head = [
					
					[
						{
							content: 'Qty', 
							colSpan: 1, 
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle' ,
								fontSize: number = 8,
								cellWidth: number=10
							}
						},
						{
							content: 'Unit', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle', 
								cellWidth: number=10,
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
								cellWidth: number=50
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
								cellWidth: number=20
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
								cellWidth: number=20
							}
						},
						{
							content: 'Name of End-User', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=39.6
							}
						},
						{
							content: 'Unit Value', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=20
							}
						},
						{
							content: 'Total Value', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=20
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
	
				doc.setFontSize(9.5);
				doc.setFillColor(0);
				doc.setDrawColor(0);
				doc.setLineWidth(.2);
				doc.line(94.75+12.75, startY_signatories, 94.8+12.75, startY_signatories+45,'FD');
				doc.setFont('helvetica', 'normal');
				doc.text(9+5, startY_signatories + 4, "I HEREBY CERTIFY that the items/articles described above");
				// Create a new line of text below the existing text
				var newX = 9 + 5; // You can adjust the X coordinate as needed
				var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				doc.text(newX, newY, "returned to the");
				// Create a new line of text below the existing text
				var newX = 18.5 + 18; // You can adjust the X coordinate as needed
				var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				doc.setFont('helvetica', 'bold');
				doc.text(newX, newY, "Provincial General Services Office");
				doc.line(36.4, startY_signatories+8, 20 + textWidth + 24, startY_signatories+8);

				doc.setFont('helvetica', 'normal');
				var newX = 9 + 5; // You can adjust the X coordinate as needed
				var newY = startY_signatories + 11; // Increase the Y coordinate to move to the next line
				doc.text(newX, newY, "this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".");

				doc.setFont('helvetica', 'bold');
				doc.text(scope.datas.office.office_head_name.office_head_name,61, startY_signatories + 26, 'center');

				doc.setFont('helvetica', 'normal');
				doc.line(12.75+21, startY_signatories+27, 70.26+17, startY_signatories+27,'FD');
				doc.text(scope.datas.office.office_head_name.position_name,61, startY_signatories + 30, 'center');
	
				doc.setFontSize(9.5);
				doc.setFillColor(0);
				doc.setDrawColor(0);
				doc.setLineWidth(.2);
				doc.line(94.75+12.75, startY_signatories, 94.8+12.75, startY_signatories+45,'FD');
				doc.setFont('helvetica', 'normal');
				doc.text(11+98, startY_signatories + 4, "I HEREBY CERTIFY that the items/articles described above");
				// Create a new line of text below the existing text
				var newX = 11+98; // You can adjust the X coordinate as needed
				var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				doc.text(newX, newY, "received from");
				// Create a new line of text below the existing text
				var newX = 33.5+98; // You can adjust the X coordinate as needed
				var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				doc.setFont('helvetica', 'bold');
				doc.text(newX, newY, ''+scope.datas.office.name);
				doc.line(33.5+98, startY_signatories+8, 20 + textWidth + 120, startY_signatories+8);

				doc.setFont('helvetica', 'normal');
				var newX = 94.75+14; // You can adjust the X coordinate as needed
				var newY = startY_signatories + 11; // Increase the Y coordinate to move to the next line
				doc.text(newX, newY, "this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".");

				doc.setFont('helvetica','bold');
				doc.text("RIO O. GARCIA",155.3, startY_signatories + 18, 'center');
				doc.setFont('helvetica','normal');
				doc.line(12.75+111, startY_signatories+19, 170+17, startY_signatories+19,'FD');
				doc.text("Administrative Officer II",155.3, startY_signatories + 22, 'center');

				doc.setFont('helvetica','bold');
				doc.text("ARVIN C. CAMACHO",155.3, startY_signatories + 30, 'center');
				doc.setFont('helvetica','normal');
				doc.line(12.75+111, startY_signatories+31, 170+17, startY_signatories+31,'FD');
				doc.text("Acting Provincial General Services Officer",155.3, startY_signatories + 35, 'center');
	
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