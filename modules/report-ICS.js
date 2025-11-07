angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment - Inventory Custodian Slip (ICS)";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.ICS = {}
			scope.ICS.id = 0;

			// List
			scope.ICSs = [];

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

			scope.ICS_id = 0;

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

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;

			scope.controls.edit.label = "Edit";
			
				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/report-ICS/list.php',
					data: scope.filter
				}).then(function mySucces(response) {
					
					scope.ICSs = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/report-ICS.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		//VIEW PAR REPORT PDF
		self.viewICS=function(scope,row){
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			$http({
				method: 'POST',
				url: 'handlers/report-ICS/viewICS.php',
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
					row.push(pars_equipment.par_machinery_equipment.amount);
					row.push(pars_equipment.par_machinery_equipment.amount);
					row.push(pars_equipment.par_machinery_equipment.description);
					row.push(pars_equipment.par_machinery_equipment.property_number);
					row.push(pars_equipment.par_machinery_equipment.useful_life);
					
					row.push("");
					// row.push('P '+scope.datas.total);
					rows.push(row);
				});
				 
				//COLUMS
				let head = [
					[
						{
							content: 'Quantity', 
							colSpan: 1, 
							rowSpan: 2, 
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
							rowSpan: 2, 
							styles: { 
								halign: 'center',
								valign: 'middle', 
								cellWidth: number=15,
								fontSize: number = 8
							}
						},

						{
							content: 'Amount', 
							colSpan: 2,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle', 
								// cellWidth: number=15,
								fontSize: number = 8
							}
						},




						{
							content: 'Description', 
							colSpan: 1,
							rowSpan: 2, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8, 
								cellWidth: number=60
							}
						},

						{
							content: 'Inventory Item No.', 
							colSpan: 1,
							rowSpan: 2, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=45.5
							}
						},
						{
							content: 'Estimated Useful Life', 
							colSpan: 1,
							rowSpan: 2, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=18
							}
						},
					],

					[
						{
							content: 'Unit Cost', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=18
							}
						},
						{
							content: 'Total Cost', 
							colSpan: 1,
							rowSpan: 1, 
							styles: { 
								halign: 'center',
								valign: 'middle',
								fontSize: number = 8,
								cellWidth: number=18
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
						2: { halign: 'right' },
						3: { halign: 'right' }, 
						4: { halign: 'center' },
						5: { halign: 'center' },
						6: { halign: 'center' }
	
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
				doc.text(12.75+5, startY_signatories + 10, "Received from: ");
				doc.line(12.75+15, startY_signatories+17, 80.26+12.75, startY_signatories+17,'FD');
				var AccountableOfficerSig=scope.datas.machinery_equipment_pars.accountable_officer.name;
				doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
				doc.text(scope.datas.machinery_equipment_pars.position.position_description,61, startY_signatories + 26, 'center');
	
				doc.setFont('helvetica','normal');
				doc.text("Signature over Printed Name",61, startY_signatories + 20, 'center');
				doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
				doc.text("Position/Office",61, startY_signatories + 30, 'center');
				doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
				doc.text("Date",61, startY_signatories + 40, 'center');			
	
	
				doc.setFont('helvetica','bold','bold');
				doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Received by: ");
				
				var issuedBySignatory=scope.datas.machinery_equipment_pars.property_custodian.name;
				doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
				doc.text(scope.datas.machinery_equipment_pars.property_custodian.position,155.3, startY_signatories + 26, 'center');
				
				doc.setFont('helvetica','normal');
				doc.line(12.75+109, startY_signatories+17, 176.15+12.75, startY_signatories+17,'FD');
				doc.text("Signature over Printed Name",155.3, startY_signatories + 20, 'center');
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

	};
	
	return new app();
	
});