angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "User Performance Report";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.UserPerf = {}
			scope.UserPerf.id = 0;

			// List
			scope.UserPerfs = [];

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

			scope.UserPerf_id = 0;

			scope.notify = notify;

			scope.notificationStartStop = window.setInterval(function() {
				scope.notificationActive = document.getElementsByClassName('btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative active');

				if(scope.notificationActive.length == 0) {
					
					notify.notifications(scope);
				} else {
					clearInterval(scope.stopNotification);
				}
				
			}, 2000);

			var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
			scope.UserPerfs = {
				from_date: new Date((m+1)+'/1/'+y),
				to_date: new Date(),
			};

		};

	// CRUD Brand Start
		
    // List Start
		// self.list = function(scope) {

		// 	scope.currentPage = scope.views.currentPage;
		// 	scope.pageSize = 10;
		// 	scope.maxSize = 5;

		// 	scope.showAddButton = true;
		// 	scope.showEditButton = false;

		// 		if (scope.$id > 2) scope = scope.$parent;

		// 		$http({
		// 			method: 'POST',
		// 			url: 'handlers/report-PCEFFOPPE/list.php',
		// 			data: scope.PCEFFOPPEs
		// 		}).then(function mySucces(response) {
					
		// 			scope.PCEFFOPPEs = angular.copy(response.data);
		// 		}, function myError(response) {

		// 		});

		// 		$('#content').load('lists/report-PCEFFOPPE.html', function() {
		// 			$timeout(function() { $compile($('#content')[0])(scope); },100);								
		// 		});

		// }; 
		
	
		self.genReport = function(scope) {

			if (validate.form(scope,'UserPerfs')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
  
            if (scope.UserPerfs.from_date > scope.UserPerfs.to_date)
            {
                growl.show('alert alert-danger',{from: 'top', amount: 55},'From date should be equal or lesser than to date.');
                return;
            }
		
				$http({
					method: 'POST',
					url: 'handlers/report-UserPerformance/viewReport.php',
					data: { 
                            from_date: scope.UserPerfs.from_date, 
                            to_date: scope.UserPerfs.to_date
                        }
				}).then(function mySuccess(response) {

					scope.userperformance = response.data;

					print(scope);
				}, function myError(response) {
					// error
					
				});

		}
		
	


		function print(scope) {
						
			var doc = new jsPDF('p','mm',[215.9,279.4]);
	
			//title
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 26, 'USER PERFORMANCE REPORT','center');

			var day_options = {year: 'numeric', month: 'long', day: 'numeric'};
			var day_from = scope.UserPerfs.from_date.toLocaleDateString("en-US",day_options);
			var day_to = scope.UserPerfs.to_date.toLocaleDateString("en-US",day_options);
			doc.setFont('helvetica','normal','normal');
			doc.setFontSize(8);
            doc.text(107.5, 31, 'From ' + day_from + ' To ' + day_to,'center');

			
		

			var rows = [];

			angular.forEach(scope.userperformance, function(data,key) {
			
				
				// row.push(data.module);

				angular.forEach(data.list, function(data1,key1) {
					// var row1 = [];
					var row = [];
					row.push(data.module);
					// row.push(data1.number);
					row.push(data1.number + '. ' +data1.user);
					row.push(data1.number_of_occurence);
					rows.push(row);

				});

				
	
			});
			// angular.forEach(scope.physicalCount.furniture_fixture, function(data,key) {
			
			// 	var row = [];
			// 	row.push(data.article_id.name);
			// 	row.push(data.description);
			// 	row.push(data.property_number);
			// 	row.push(data.carrying_amount);
			// 	row.push(data.location);
			// 	row.push(data.equipment_condition);
			// 	row.push(data.remarks);
			// 	rows.push(row);
	
			// });
			

			
			// //COLUMS
			let head = [
				[
					{content: 'Module', colSpan: 1, rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=60}}, 
					// {content: 'No', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle', cellWidth: number=15,fontSize: number = 8}},
					{content: 'Name', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle',fontSize: number = 8, cellWidth: number=99}},
					{content: 'No of Transaction', colSpan: 1,rowSpan: 1, styles: { halign: 'center',valign: 'middle' ,fontSize: number = 8,cellWidth: number=25}},
					
				],
	
			];
			doc.autoTable({
				startY: 40,
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
					1: { halign: 'left' },
					2: { halign: 'center' },
					// 3: { halign: 'center' }, 

				},
				
			});



			//signatories
			// const  startY_signatories=doc.lastAutoTable.finalY + 5;

			// doc.setFontSize(8);
			// doc.setFont('helvetica','normal','normal');
			// doc.text(25, startY_signatories, 'Certified Correct by:');
			// doc.text(130, startY_signatories, 'Approved by:');
			// doc.text(225, startY_signatories, 'Verified by:');

			// doc.setFillColor(0);
			// doc.setDrawColor(0);
			// doc.setLineWidth(.2);
			
			// doc.line(38, startY_signatories + 10, 98 ,startY_signatories + 10);
			// doc.line(134, startY_signatories + 10, 194 ,startY_signatories + 10);
			// doc.line(230, startY_signatories + 10, 290 ,startY_signatories + 10);

			// doc.text(68, startY_signatories +13, 'Signature over Printed Name', 'center');
			// doc.text(164, startY_signatories +13, 'Signature over Printed Name', 'center');
			// doc.text(260, startY_signatories +13, 'Signature over Printed Name', 'center');

			// doc.text(68, startY_signatories +16, 'Inventory Committee Chair and Members', 'center');
			// doc.text(164, startY_signatories +16, 'Head of Agency/Entity or Authorized Representative', 'center');
			// doc.text(260, startY_signatories +16, 'COA Representative', 'center');

			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(107.5,275, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			doc.text(107.5,275, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		
		};

	
	};
	
	return new app();
	
});