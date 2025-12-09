angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Physical Count of Equipment, Furnitures and Fixtures and Other PPE";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.PCEFFOPPE = {}
			scope.PCEFFOPPE.id = 0;

			// List
			scope.PCEFFOPPEs = [];

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

			scope.PCEFFOPPE_id = 0;

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

	// CRUD Brand Start
		
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
					url: 'handlers/report-PCEFFOPPE/list.php',
					data: scope.PCEFFOPPEs
				}).then(function mySucces(response) {
					
					scope.PCEFFOPPEs = angular.copy(response.data);
				}, function myError(response) {

				});

				$('#content').load('lists/report-PCEFFOPPE.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		}; 
		
	
		self.genReport = function(scope) {

			if (validate.form(scope,'PCEFFOPPEs')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
		
				$http({
					method: 'POST',
					url: 'handlers/report-PCEFFOPPE/generate-report.php',
					data: {PCEFFOPPEs: scope.PCEFFOPPEs}
				}).then(function mySucces(response) {

					scope.physicalCount = response.data;

					if(scope.PCEFFOPPEs.equipment_type == "MACHINERY AND EQUIPMENT") {
						print(scope);
						
					} else if(scope.PCEFFOPPEs.equipment_type == "BUILDING AND OTHER STRUCTURES") {
						printBs(scope);
					} else if(scope.PCEFFOPPEs.equipment_type == "INFRASTRUCTURE ASSET") {
						printIa(scope);
					} else if(scope.PCEFFOPPEs.equipment_type == "LAND AND LAND IMPROVEMENTS") {
						printLi(scope);
					}
					
				}, function myError(response) {
										
				});

		}
		
		self.checkEquipmentType = function(scope) {

			if(scope.PCEFFOPPEs.equipment_type == "MACHINERY AND EQUIPMENT") {
				scope.disableFund = false;
			} else {
				scope.disableFund = true;
				scope.PCEFFOPPEs.fund = {};
			}

		}

		self.checkFund = function(scope) {

			$http({
			  method: 'POST',
			  url: 'api/suggestions/check-fund.php',
			  data: {checkFund: scope.PCEFFOPPEs.fund.id}
			}).then(function mySucces(response) {

				scope.checkFund = response.data;

				if(scope.checkFund.length == 0) {
					scope.formHolder.PCEFFOPPEs.fund.$invalid = true;
					scope.isError = true;
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No Data Found!');
					scope.disableButtonReport = true;
				} else {
					scope.isError = false;
					scope.disableButtonReport = false;
				}

			}, function myError(response) {
				
			});

		}

		self.checkYear = function(scope) {

			$http({
			  method: 'POST',
			  url: 'api/suggestions/check-year.php',
			  data: {checkYear: scope.PCEFFOPPEs}
			}).then(function mySucces(response) {

				scope.checkYear = response.data;

				if(scope.checkYear.length == 0) {
					scope.formHolder.PCEFFOPPEs.year.$invalid = true;
					scope.isError = true;
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No Data Found!');
					scope.disableButtonReport = true;
				} else {
					scope.isError = false;
					scope.disableButtonReport = false;
				}

			}, function myError(response) {
				
			});

		}

		function print(scope) {
						
			var doc = new jsPDF('l','mm',[330,215]);

			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(317, 12.7, 'Appendix 66','right');
			//title
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 25.4, 'REPORT ON THE PHYSICAL COUNT OF EQUIPMENT, FURNITURES AND FIXTURES, AND OTHER PPE','center');
			
		
			doc.setFontSize(8);
			doc.line(125, 31, 205, 31);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 30, scope.PCEFFOPPEs.equipment_type, 'center');
			doc.setFont('helvetica','normal','normal');
			doc.text(165, 34, "(Type of Equipment, furniture and fixtures, other PPE)",'center');

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');	
			doc.text(139, 41, "As at ");
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 41, scope.physicalCount.as_of_date, 'center');
			doc.line(146, 42, 194, 42);

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(12.7, 49, 'Fund: ');
			doc.setFont('helvetica','bold','bold');
			doc.text(23, 49, scope.physicalCount.fund_name.name);
			doc.line(22, 50, 69 ,50);

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(12.7, 59, 'For which ');	
			doc.line(28, 60, 82 ,60);	
			doc.setFont('helvetica','bold','bold');
			doc.text(54, 59, scope.physicalCount.accountable_officer, 'center');
			doc.text(82, 60, ' , ');
			doc.line(84, 60, 119 ,60);
			doc.text(101, 59, scope.physicalCount.position, 'center');
			doc.text(119, 60, ' , ');
			doc.line(121, 60, 176 ,60);
			doc.text(148, 59, 'Provincial Government of La Union', 'center');
			doc.setFont('helvetica','normal','normal');
			doc.text(177, 59, 'is accountable, having assumed such accountability on');
			doc.line(247, 60, 287 ,60);
			doc.text(288, 60, '.');
			doc.setFont('helvetica','bold','bold');
			doc.text(267, 59, scope.physicalCount.position, 'center');

			var rows = [];

		

			angular.forEach(scope.physicalCount.machinery_equipment, function(data,key) {
			
				var row = [];
				row.push(data.article_id.name);
				row.push(data.description);
				row.push(data.property_number);
				row.push(data.acquisition_cost);
				row.push(data.location);
				row.push(data.equipment_condition);
				row.push(data.remarks);
				rows.push(row);
	
			});

			angular.forEach(scope.physicalCount.furniture_fixture, function(data,key) {
			
				var row = [];
				row.push(data.article_id.name);
				row.push(data.description);
				row.push(data.property_number);
				row.push(data.carrying_amount);
				row.push(data.location);
				row.push(data.equipment_condition);
				row.push(data.remarks);
				rows.push(row);
	
			});
			

			
			// //COLUMS
			let head = [
				[
					{content: 'ARTICLE', colSpan: 1, rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=35}}, 
					{content: 'DESCRIPTION', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle', cellWidth: number=64,fontSize: number = 8}},
					{content: 'PROPERTY No.', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=38}},
					{content: 'COST', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=29}},
					{content: 'LOCATION', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=43}},
					{content: 'CONDITION', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=39}},
					{content: 'REMARKS', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=57}},
				],
	
			];
			doc.autoTable({
				startY: 64,
				margin: Margin=12.7,
				tableWidth: 'auto',
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
					3: { halign: 'right' }, 
					4: { halign: 'center' },
					5: { halign: 'center' },
					6: { halign: 'center' },
					7: { halign: 'center' },
				},
				
			});



			//signatories
			const  startY_signatories=doc.lastAutoTable.finalY + 5;

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(25, startY_signatories, 'Certified Correct by:');
			doc.text(130, startY_signatories, 'Approved by:');
			doc.text(225, startY_signatories, 'Verified by:');

			doc.setFillColor(0);
			doc.setDrawColor(0);
			doc.setLineWidth(.2);
			
			doc.line(38, startY_signatories + 10, 98 ,startY_signatories + 10);
			doc.line(134, startY_signatories + 10, 194 ,startY_signatories + 10);
			doc.line(230, startY_signatories + 10, 290 ,startY_signatories + 10);

			doc.text(68, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(164, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(260, startY_signatories +13, 'Signature over Printed Name', 'center');

			doc.text(68, startY_signatories +16, 'Inventory Committee Chair and Members', 'center');
			doc.text(164, startY_signatories +16, 'Head of Agency/Entity or Authorized Representative', 'center');
			doc.text(260, startY_signatories +16, 'COA Representative', 'center');

			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(165,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			// doc.text(165, 210, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');

			doc.setFontSize(6);
			doc.text(12.7, 210, 'Report generated by ' + scope.physicalCount['userFullName'] + ' at ' + scope.physicalCount['reportDate'],'left');		
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};

		function printBs(scope) {
						
			var doc = new jsPDF('l','mm',[330,215]);

			// var doc = new jsPDF('p', 'pt')

			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(317, 12.7, '65','right');
			//title
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 25.4, 'REPORT ON THE PHYSICAL COUNT OF LAND & LAND IMPROVEMENTS','center');

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');	
			doc.text(139, 31, "As at ");
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 31, scope.physicalCount.as_of_date, 'center');
			doc.line(146, 32, 194, 32);

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(12.7, 45, 'For which ');	
			doc.line(28, 46, 82 ,46);	
			doc.setFont('helvetica','bold','bold');
			doc.text(54, 45, scope.physicalCount.accountable_officer, 'center');
			doc.text(82, 46, ' , ');
			doc.line(84, 46, 119 ,46);
			doc.text(101, 45, scope.physicalCount.position, 'center');
			doc.text(119, 46, ' , ');
			doc.line(121, 46, 176 ,46);
			doc.text(148, 45, 'Provincial Government of La Union', 'center');
			doc.setFont('helvetica','normal','normal');
			doc.text(177, 45, 'is accountable, having assumed such accountability on');
			doc.line(247, 46, 287 ,46);
			doc.text(288, 46, '.');
			doc.setFont('helvetica','bold','bold');
			doc.text(267, 45, scope.physicalCount.position, 'center');

			var rows = [];

			angular.forEach(scope.physicalCount.building_structure, function(data,key) {
			
				var row = [];
				row.push(data.building_and_structure_id);
				row.push(data.building_and_structure_location);
				row.push(data.building_and_structure_component);
				row.push(data.building_and_structure_property_no);
				row.push(data.carrying_amount);
				row.push(data.equipment_condition);
				row.push(data.remarks);
				rows.push(row);
	
			});
			
			// //COLUMS
			let head = [
				[
					{content: 'Building/ Structure ID No.', colSpan: 1, rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=35}}, 
					{content: 'Location', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle', cellWidth: number=64,fontSize: number = 8}},
					{content: 'Component.', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=38}},
					{content: 'Component Property No.', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=29}},
					{content: 'Carrying Amount', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=43}},
					{content: 'Condition', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=39}},
					{content: 'Remarks', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=57}},
				],
	
			];
			doc.autoTable({
				startY: 50,
				margin: Margin=12.7,
				tableWidth: 'auto',
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
					3: { halign: 'right' }, 
					4: { halign: 'center' },
					5: { halign: 'center' },
					6: { halign: 'center' },
					7: { halign: 'center' },
				},
				
			});



			//signatories
			const  startY_signatories=doc.lastAutoTable.finalY + 5;

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(25, startY_signatories, 'Certified Correct by:');
			doc.text(130, startY_signatories, 'Approved by:');
			doc.text(225, startY_signatories, 'Verified by:');

			doc.setFillColor(0);
			doc.setDrawColor(0);
			doc.setLineWidth(.2);
			
			doc.line(38, startY_signatories + 10, 98 ,startY_signatories + 10);
			doc.line(134, startY_signatories + 10, 194 ,startY_signatories + 10);
			doc.line(230, startY_signatories + 10, 290 ,startY_signatories + 10);

			doc.text(68, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(164, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(260, startY_signatories +13, 'Signature over Printed Name', 'center');

			doc.text(68, startY_signatories +16, 'Inventory Committee Chair and Members', 'center');
			doc.text(164, startY_signatories +16, 'Local Chief Executive/Authorized Representative', 'center');
			doc.text(260, startY_signatories +16, 'COA Representative', 'center');

			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(165,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			doc.text(165, 210, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};

		function printIa(scope) {
						
			var doc = new jsPDF('l','mm',[330,215]);

			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(317, 12.7, '64','right');
			//title
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 25.4, 'REPORT ON THE PHYSICAL COUNT OF OTHER PUBLIC INFRASTRUCTURE','center');

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');	
			doc.text(139, 31, "As at ");
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 31, scope.physicalCount.as_of_date, 'center');
			doc.line(146, 32, 194, 32);

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(12.7, 45, 'For which ');	
			doc.line(28, 46, 82 ,46);	
			doc.setFont('helvetica','bold','bold');
			doc.text(54, 45, scope.physicalCount.accountable_officer, 'center');
			doc.text(82, 46, ' , ');
			doc.line(84, 46, 119 ,46);
			doc.text(101, 45, scope.physicalCount.position, 'center');
			doc.text(119, 46, ' , ');
			doc.line(121, 46, 176 ,46);
			doc.text(148, 45, 'Provincial Government of La Union', 'center');
			doc.setFont('helvetica','normal','normal');
			doc.text(177, 45, 'is accountable, having assumed such accountability on');
			doc.line(247, 46, 287 ,46);
			doc.text(288, 46, '.');
			doc.setFont('helvetica','bold','bold');
			doc.text(267, 45, scope.physicalCount.position, 'center');

			var rows = [];

			angular.forEach(scope.physicalCount.infrastructure_asset, function(data,key) {
			
				var row = [];
				row.push(data.infrastructure_id_number);
				row.push(data.type_of_infrastructure);
				row.push(data.infrastructure_location);
				row.push(data.infrastructure_component);
				row.push(data.component_property_no);
				row.push(data.carrying_amount);
				row.push(data.equipment_condition);
				row.push(data.remarks);
				rows.push(row);
	
			});
			
			// //COLUMS
			let head = [
				[
					{content: 'Public Infrastructure ID/No.', colSpan: 1, rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=35}}, 
					{content: 'Type of Public Infrastructure', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle', cellWidth: number=64,fontSize: number = 8}},
					{content: 'Location.', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=38}},
					{content: 'Component', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=31}},
					{content: 'Component Property Number', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=45}},
					{content: 'Carrying Amount', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
					{content: 'Condition', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
					{content: 'Remarks', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
				],
	
			];
			doc.autoTable({
				startY: 50,
				margin: Margin=12.7,
				tableWidth: 'auto',
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
					3: { halign: 'right' }, 
					4: { halign: 'center' },
					5: { halign: 'center' },
					6: { halign: 'center' },
					7: { halign: 'center' },
				},
				
			});

			//signatories
			const  startY_signatories=doc.lastAutoTable.finalY + 5;

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(25, startY_signatories, 'Certified Correct by:');
			doc.text(130, startY_signatories, 'Approved by:');
			doc.text(225, startY_signatories, 'Verified by:');

			doc.setFillColor(0);
			doc.setDrawColor(0);
			doc.setLineWidth(.2);
			
			doc.line(38, startY_signatories + 10, 98 ,startY_signatories + 10);
			doc.line(134, startY_signatories + 10, 194 ,startY_signatories + 10);
			doc.line(230, startY_signatories + 10, 290 ,startY_signatories + 10);

			doc.text(68, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(164, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(260, startY_signatories +13, 'Signature over Printed Name', 'center');

			doc.text(68, startY_signatories +16, 'Inventory Committee Chair and Members', 'center');
			doc.text(164, startY_signatories +16, 'Local Chief Executive/Authorized Representative', 'center');
			doc.text(260, startY_signatories +16, 'COA Representative', 'center');

			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(165,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			doc.text(165, 210, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};

		function printLi(scope) {
						
			var doc = new jsPDF('l','mm',[330,215]);

			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(317, 12.7, '62','right');
			//title
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 25.4, 'REPORT ON THE PHYSICAL COUNT OF LAND & LAND IMPROVEMENTS','center');

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');	
			doc.text(139, 31, "As at ");
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 31, scope.physicalCount.as_of_date, 'center');
			doc.line(146, 32, 194, 32);

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(12.7, 45, 'For which ');	
			doc.line(28, 46, 82 ,46);	
			doc.setFont('helvetica','bold','bold');
			doc.text(54, 45, scope.physicalCount.accountable_officer, 'center');
			doc.text(82, 46, ' , ');
			doc.line(84, 46, 119 ,46);
			doc.text(101, 45, scope.physicalCount.position, 'center');
			doc.text(119, 46, ' , ');
			doc.line(121, 46, 176 ,46);
			doc.text(148, 45, 'Provincial Government of La Union', 'center');
			doc.setFont('helvetica','normal','normal');
			doc.text(177, 45, 'is accountable, having assumed such accountability on');
			doc.line(247, 46, 287 ,46);
			doc.text(288, 46, '.');
			doc.setFont('helvetica','bold','bold');
			doc.text(267, 45, scope.physicalCount.position, 'center');

			var rows = [];

			angular.forEach(scope.physicalCount.land_and_land_improvement, function(data,key) {
			
				var row = [];
				row.push(data.id_number);
				row.push(data.classification);
				row.push(data.land_improvements);
				row.push(data.location);
				row.push(data.description);
				row.push(data.carrying_amount);
				row.push(data.equipment_condition);
				row.push(data.remarks);
				rows.push(row);
	
			});
			
			// //COLUMS
			let head = [
				[
					{content: 'ID No.', colSpan: 1, rowSpan: 2, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=43}}, 
					{content: 'Classification', colSpan: 2,rowSpan: 1, styles: { halign: 'center',valign: 'middle', cellWidth: number=40,fontSize: number = 8}},
					{content: 'Location.', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=43}},
					{content: 'Description', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=55}},
					{content: 'Carrying Amount', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
					{content: 'Condition', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
					{content: 'Remarks', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
				],
				[
					{content: 'Land', colSpan: 1, rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=35}}, 
					{content: 'Land Improvements', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle', cellWidth: number=35,fontSize: number = 8}},
				
				],
	
			];
			doc.autoTable({
				startY: 50,
				margin: Margin=12.7,
				tableWidth: 'auto',
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
					3: { halign: 'right' }, 
					4: { halign: 'center' },
					5: { halign: 'center' },
					6: { halign: 'center' },
					7: { halign: 'center' },
				},
				
			});

			//signatories
			const  startY_signatories=doc.lastAutoTable.finalY + 5;

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(25, startY_signatories, 'Certified Correct by:');
			doc.text(130, startY_signatories, 'Approved by:');
			doc.text(225, startY_signatories, 'Verified by:');

			doc.setFillColor(0);
			doc.setDrawColor(0);
			doc.setLineWidth(.2);
			
			doc.line(38, startY_signatories + 10, 98 ,startY_signatories + 10);
			doc.line(134, startY_signatories + 10, 194 ,startY_signatories + 10);
			doc.line(230, startY_signatories + 10, 290 ,startY_signatories + 10);

			doc.text(68, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(164, startY_signatories +13, 'Signature over Printed Name', 'center');
			doc.text(260, startY_signatories +13, 'Signature over Printed Name', 'center');

			doc.text(68, startY_signatories +16, 'Inventory Committee Chair and Members', 'center');
			doc.text(164, startY_signatories +16, 'Local Chief Executive/Authorized Representative', 'center');
			doc.text(260, startY_signatories +16, 'COA Representative', 'center');

			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(165,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			doc.text(165, 210, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};
	
	};
	
	return new app();
	
});