angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment - Property Acknowledgment Receipt";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipment = {}
			scope.machineryEquipment.id = 0;

			// List
			scope.PARs = [];

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

			scope.machineryEquipment_id = 0;

			scope.notify = notify;

			scope.stopNotification = window.setInterval(function() {
				notify.notifications(scope);
			}, 2000);
			
			var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
			scope.filter = {
				start: new Date((m+1)+'/1/'+y),
				end: new Date(),
			};

		};

	// CRUD Start
	
	// List Start
	self.list = function(scope) {
		
		self.parList(scope);

	};

	self.parList = function(scope) {

		scope.currentPage = scope.views.currentPage;
		scope.pageSize = 10;
		scope.maxSize = 5;

		scope.showAddButton = true;
		scope.showEditButton = false;

		scope.controls.edit.label = "Edit";
		
			if (scope.$id > 2) scope = scope.$parent;

			$http({
				method: 'POST',
				url: 'handlers/report-PAR/list.php',
				data: scope.filter
			}).then(function mySucces(response) {
				
				scope.PARs = angular.copy(response.data);
				
			}, function myError(response) {

			});

		}
		
		//VIEW PAR REPORT PDF
		self.viewPAR=function(scope,row){
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
			
			$http({
				method: 'POST',
				url: 'handlers/report-PAR/viewPAR.php',
				data: {id: row.id}

			}).then(function mySucces(response) {
				scope.datas = response.data;
				// console.log(scope);
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
			
			doc.text(202.37, 43.1, "PAR No.: " + scope.datas[0].par_no,'right');
			textWidth = doc.getTextWidth("PAR No.: " + scope.datas[0].par_no);
			doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);
		
			var rows = [];
			var cancelled_equipments;
			angular.forEach(scope.datas[0].equipment, function(pars_equipment,key) {
			
				var row = [];
				row.push('1');
				row.push('1');
				row.push(pars_equipment.description);
				row.push(pars_equipment.property_number);
				row.push(pars_equipment.acquisition_date);
				row.push(getFormattedAmount(pars_equipment.acquisition_cost));				
				rows.push(row);

			

				if (scope.datas[0].cancelled === undefined || scope.datas[0].cancelled.length == 0) {

				}
				else 
				{
					if (scope.datas[0].equipment.length == key+1)
						{
						cancelled_equipments = "The following equipment(s) already had new PAR:   ";
						angular.forEach(scope.datas[0].cancelled, function(cancelledPar,key1) {

						cancelled_equipments = cancelled_equipments + cancelledPar.prop_no + "(" + cancelledPar.PAR_No + ")";
							if (key1 != scope.datas[0].cancelled.length-1)
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
			var AccountableOfficerSig=scope.datas[0].accountable_officer;
			doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
			doc.text(scope.datas[0].position_description,61, startY_signatories + 26, 'center');

			doc.setFont('helvetica','normal');
			doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
			doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
			doc.text("Position/Office",61, startY_signatories + 30, 'center');
			doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
			doc.text("Date",61, startY_signatories + 40, 'center');			

			doc.setFont('helvetica','bold','bold');
			doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");

			var issuedBySignatory=scope.datas[0].PropCustodian[0].signatoryName;
			doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
			doc.text(scope.datas[0].PropCustodian[0].position,155.3, startY_signatories + 26, 'center');
			
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
			
			// doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');

			doc.setFontSize(6);
			doc.text(12.7, 274, 'Report generated by ' + scope.datas[0]['userFullName'] + ' at ' + scope.datas[0]['reportDate'],'left');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};


		//Start Notification Start/Stop
		
		self.stopNotification = function(scope){
			clearInterval(scope.stopNotification);
		}
		self.startNotification = function(scope){
			scope.stopNotification = window.setInterval(function() {
				notify.notifications(scope);
			}, 2000);
		}

		//End Notification Start/Stop

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