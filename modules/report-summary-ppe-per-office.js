angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment - Summary of PPE per Office/Unit";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipment = {}
			scope.machineryEquipment.id = 0;

			// List
			scope.Offices = [];

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
					url: 'handlers/report-summary-ppe-per-office/list.php',
					data: scope.Offices
				}).then(function mySucces(response) {
					
					scope.Offices = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/report-summary-ppe-per-office.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};
	
		//VIEW REPORT PDF
		self.viewReport=function(scope,row){
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			$http({
				method: 'POST',
				url: 'handlers/report-summary-ppe-per-office/viewReport.php',
				data: {office_id: row.id}

			}).then(function mySucces(response) {
				scope.datas = response.data;
				if (scope.datas.equipment_details === undefined  || scope.datas.equipment_details == 0)
				{
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No equipments issued to ' + scope.datas.accountable_details.head_office);
				}
				else
				{
					print(scope.datas);
				}
				
		}, function myError(response) {
			// error
			});
		};

		//FUNCTION TO FORMAT amount
		function getFormattedAmount(amount) 
		{
			
			var return_value = amount.toFixed(2);
			const formattedNumber = amount.toLocaleString("en-US");
			return  formattedNumber;
			//  return 'P ' + return_value;
		};

      function print(scope) {
						
			var doc = new jsPDF('l','mm',[330,215]);
			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 25.4, 'INVENTORY OF PROPERTY, PLANT AND EQUIPMENT','center');
			
			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');
			doc.text(165, 30, "As of " + scope.accountable_details.date_today, 'center');
			
			doc.setFontSize(9);
			doc.setFont('helvetica','bold','bold');
			doc.text(50, 41, scope.accountable_details.head_of_office,{ align: 'center', maxWidth:50});
			doc.text(105, 41, scope.accountable_details.head_position, { align: 'center', maxWidth:75});
			doc.text(185, 41, scope.accountable_details.head_office, 'center');
			doc.text(310, 41, ',accountable, having assumed such accountability on', 'right');
			doc.line(30, 42, 317, 42);

			doc.setFontSize(8);
			doc.setFont('helvetica','normal','normal');	
			doc.text(12.7, 41, "For which ");
			doc.text(50, 45, '(Name of Accountable Officer)', 'center');
			doc.text(105, 45, '(Official Designation)', 'center');
			doc.text(185, 45, '(Bureau or Office)', 'center');

			var rows = [];

			angular.forEach(scope.equipment_details, function(data,key) {
			
				var row = [];
				row.push(data.article_name);
				row.push(data.description);
				row.push(data.acquisition_date);
				row.push(data.PARno);
				row.push(data.property_number);
				row.push("1");
				row.push(data.acquisition_cost);
				row.push("1");
				row.push(data.acquisition_cost);
				row.push("1");
				row.push(data.acquisition_cost)				
				row.push(data.accountable_officer);
				row.push("");
				row.push("");
				rows.push(row);
				
				if (scope.equipment_details.length == (parseInt(key)+1))
				{
					var row1 = [];
					rows.push(row1);

				row1.unshift({
					colSpan: 7,
					content: 'Total: ' + getFormattedAmount(scope.accountable_details.total_acquisition_cost),
					styles: { valign: 'middle', halign: 'right' },
				},
				{
					colSpan: 7,
					content: '',
					styles: { valign: 'middle', halign: 'right' },
				}
				);
				
			}
		
			});

			// //COLUMS
			let head = [
				[
					{content: 'ARTICLE', colSpan: 1, rowSpan: 2, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=30}}, 
					{content: 'DESCRIPTION', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle', cellWidth: number=45,fontSize: number = 8}},
					{content: 'Date Acquired', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=20}},
					{content: 'PAR #', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=25}},
					{content: 'Property Number', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=25}},
					{content: 'Qty unit', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=9}},
					{content: 'Unit Value', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=20}},
					{content: 'BALANCE PER STOCK CARD', colSpan: 2,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: 'ON HAND PER COUNT', colSpan: 2,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: 'Accountable Officer', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=30}},
					{content: 'Equipment Existence (Present or Absent)', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=20}},
					{content: 'REMARKS State whereabouts, conditions, etc.', colSpan: 1,rowSpan: 2, styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=25}}
		
				],
				[
					{content: 'Qty',  styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=9}},
					{content: 'Value',  styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=20}},
					{content: 'Qty',  styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=9}},
					{content: 'Value',  styles: { halign: 'center',valign: 'middle',fontSize: number = 8,cellWidth: number=20}}
				],
				[
					{content: '(1)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(2)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(3)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(4)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(5)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(6)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(7)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(8)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(9)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(10)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(11)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},
					{content: '(12)',  styles: { fontStyle: 'normal', halign: 'center',valign: 'middle',fontSize: number = 8}},


				]
	
			];

			doc.autoTable({
				startY: 50,
				margin: Margin=12.7,
				// tableWidth: number=254,
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
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'center' },
					6: { halign: 'right' },
					7: { halign: 'center' },
					8: { halign: 'right' },
					9: { halign: 'center' },
					10: { halign: 'right' },
					11: { halign: 'center' },
					12: { halign: 'center' },
					13: { halign: 'center' },
				},
				
			});

			//signatories
			const  startY_signatories=doc.lastAutoTable.finalY + 5;
			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			// doc.setFontType('bolditalic');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(165,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			// doc.text(165, 210, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			doc.setFontSize(6);
			doc.text(12.7, 210, 'Report generated by ' + scope[0]['userFullName'] + ' at ' + scope[0]['reportDate'],'left');

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