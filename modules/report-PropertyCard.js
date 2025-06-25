angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment - Property Card";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipment = {}
			scope.machineryEquipment.id = 0;

			// List
			scope.machineryEquipments = [];

			// CRUD
			scope.partSerialNumber = {}
			scope.partSerialNumber.id = 0;

			// List
			scope.partSerialNumbers = [];

			scope.filteredArticle = [];
			scope.filteredBrand = [];
			scope.repairHistories = [];

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
					url: 'handlers/report-PropertyCard/list.php',
					data: scope.machineryEquipments
				}).then(function mySucces(response) {
					
					scope.machineryEquipments = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/report-PropertyCard.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
		
		//VIEW PROPERTY CARD REPORT PDF
		self.viewPropertyCard=function(scope,row){
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			$http({
				method: 'POST',
				url: 'handlers/report-PropertyCard/propertycard.php',
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
					{content: 'Officer (Office)', styles: { halign: 'center',valign: 'middle',fontSize: number = 8 }}, 
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

		//Show and Hide Element with Condition Start
		
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