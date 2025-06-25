angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery and Equipment - Property Transfer Report";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipment = {}
			scope.machineryEquipment.id = 0;

			// List
			scope.PTRs = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

			// for Pagination
			// scope.viewsML = {};
			// scope.viewsML.currentPageML = 1;
			// scope.viewsML.list = true;

			// for Pagination
			scope.viewsDL = {};
			scope.viewsDL.currentPageDL = 1;
			scope.viewsDL.list = true;

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


    // List Start
		self.list = function(scope) {

			self.searchPtrList(scope);
			// self.searchMasterList(scope);
			self.transferLog(scope);
		
			offices(scope);
		};

		self.searchPtrList = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			$http({
			  method: 'POST',
			  url: 'handlers/report-PTR/search-ptr-list.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.searchPtrList = response.data;

			}, function myError(response) {
				
			});

		}

		// self.searchMasterList = function(scope) {

		// 	scope.currentPageML = scope.viewsML.currentPageML;
		// 	scope.pageSizeML = 10;
		// 	scope.maxSizeML = 5;
	
		// 	$http({
		// 	  method: 'POST',
		// 	  url: 'handlers/report-PTR/search-master-list.php',
		// 	  data: scope.filter
		// 	}).then(function mySucces(response) {

		// 		scope.filterMasterlists = angular.copy(response.data);
				
		// 	}, function myError(response) {
				
		// 	});

		// }

		self.transferLog = function(scope) {

			scope.currentPageDL = scope.viewsDL.currentPageDL;
			scope.pageSizeDL = 10;
			scope.maxSizeDL = 5;
	
			$http({
			  method: 'POST',
			  url: 'handlers/report-PTR/transfer-report.php',
			  data: scope.filter
			}).then(function mySucces(response) {

				scope.transferLogs = angular.copy(response.data);
				
			}, function myError(response) {
				
			});

		}

		self.exportDonated = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/report-PTR/reports/donated-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.donatedReport = response.data;

				printDonated(scope);

			}, function myError(response) {
				// error
			});
			
		}

		function printDonated(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'PTR (DONATED)','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.donatedReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.ptr_no,
					PTRlist.beneficiary,
					PTRlist.article_id.name,
					PTRlist.donated_equipment.property_number,
					PTRlist.par_date,
					
				];

				rows.push(row);
			});

			
			//COLUMS
			let head = [
				
				[
					{
						content: '#', 
						colSpan: 1, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=8
						}
					},
					{
						content: 'PTR No.', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=25,
							fontSize: number = 8
						}
					},
					{
						content: 'Beneficiary', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8, 
							cellWidth: number=30
						}
					},
					{
						content: 'Article', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=45
						}
					},
					{
						content: 'Property #', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=55
						}
					},
					{
						content: 'PTR Date', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=27
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
					2: { halign: 'center' },
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'right' }

				},
				// foot: foots,
			});
			
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
		
		self.exportRelocated = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/report-PTR/reports/relocated-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.relocatedReport = response.data;

				printRelocated(scope);

			}, function myError(response) {
				// error
			});
			
		}

		function printRelocated(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'PTR (RELOCATED)','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.relocatedReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.ptr_no,
					PTRlist.accountable_officer.name,
					PTRlist.article_id.name,
					PTRlist.relocated_equipment.property_number,
					PTRlist.par_details.par_date,
					
				];

				rows.push(row);
			});

			
			//COLUMS
			let head = [
				
				[
					{
						content: '#', 
						colSpan: 1, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=8
						}
					},
					{
						content: 'PTR No.', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=25,
							fontSize: number = 8
						}
					},
					{
						content: 'Accountable Officer', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8, 
							cellWidth: number=30
						}
					},
					{
						content: 'Article', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=45
						}
					},
					{
						content: 'Property #', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=55
						}
					},
					{
						content: 'PTR Date', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=27
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
					2: { halign: 'center' },
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'right' }

				},
				// foot: foots,
			});
			
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
		
		self.exportReassigned = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/report-PTR/reports/reassigned-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.reassignedReport = response.data;

				printReassigned(scope);

			}, function myError(response) {
				// error
			});
			
		}

		function printReassigned(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'PTR (REASSIGNED)','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.reassignedReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.par_details.ptr_no,
					PTRlist.accountable_officer.name,
					PTRlist.article_id.name,
					PTRlist.reassigned_equipment.property_number,
					PTRlist.par_details.par_date,
					
				];

				rows.push(row);
			});

			
			//COLUMS
			let head = [
				
				[
					{
						content: '#', 
						colSpan: 1, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=8
						}
					},
					{
						content: 'PTR No.', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=25,
							fontSize: number = 8
						}
					},
					{
						content: 'Accountable Officer', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8, 
							cellWidth: number=30
						}
					},
					{
						content: 'Article', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=45
						}
					},
					{
						content: 'Property #', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=55
						}
					},
					{
						content: 'PTR Date', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=27
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
					2: { halign: 'center' },
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'right' }

				},
				// foot: foots,
			});
			
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

		self.exportMasterlist = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/report-PTR/reports/masterlist-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.masterlistReport = response.data;
				printMasterlist(scope);

			}, function myError(response) {
				// error
			});
			
		}

		function printMasterlist(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'PTR Masterlist','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.masterlistReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.ptr_no,
					PTRlist.status,
					PTRlist.accountable_officer,
					PTRlist.name,
					PTRlist.par_date,
					
				];

				rows.push(row);
			});

			
			//COLUMS
			let head = [
				
				[
					{
						content: '#', 
						colSpan: 1, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=8
						}
					},
					{
						content: 'PTR No.',
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=25,
							fontSize: number = 8
						}
					},
					{
						content: 'Type', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8, 
							cellWidth: number=30
						}
					},
					{
						content: 'Accountable Officer', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8,
							cellWidth: number=45
						}
					},
					{
						content: 'Office', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=55
						}
					},
					{
						content: 'PTR Date', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle',
							fontSize: number = 8,
							cellWidth: number=27
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
					2: { halign: 'center' },
					3: { halign: 'center' }, 
					4: { halign: 'center' },
					5: { halign: 'right' }

				},
				// foot: foots,
			});
			
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



		
		//VIEW PAR REPORT PDF
		self.viewPtrReport = function(scope,row){
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			$http({
				method: 'POST',
				url: 'handlers/report-PTR/reports/ptr-report.php',
				data: {id: row.id}

			}).then(function mySucces(response) {

				scope.data = response.data;
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
				doc.text(14, 50, scope.data.prev_accountable_officer.prev_accountable_officer);
				
				doc.text(14, 55, 'To Accountable Officer/Agency/Fund Cluster:');
				doc.text(14, 60, scope.data.accountable_officer.accountable_officer);
				doc.line(12.7, 41, 12.7 , 62);
				doc.line(12.7, 62, 202.3 , 62);
				doc.line(155, 41, 155 , 62);
				doc.line(202.3, 41, 202.3 , 62);

				doc.text(156, 50, "PTR No.:");
				doc.text(201, 50, scope.data.ptr_no,'right');

				doc.text(156, 60, "Date:");
				doc.text(201, 60, scope.data.par_date,'right');

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

				switch(scope.data.status)
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
				angular.forEach(scope.data.par_machinery_equipment, function(equipmentList,key) {
				
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
				// doc.text(62.265,lastRowCoord+28,'approve_by','center');
				doc.text(62.265,lastRowCoord+28,scope.data.approved_by.signatory_name.toUpperCase(),'center');

				doc.text(119.80,lastRowCoord+15,"Released/Issued by:",'center');
				// doc.text(119.80,lastRowCoord+28,'released_by','center');
				doc.text(119.80,lastRowCoord+28,scope.data.signatory.signatory_name.toUpperCase(),'center');

				doc.text(175.33,lastRowCoord+15,"Received by:",'center');
				// doc.text(175.33,lastRowCoord+28,'accountable_officer','center');
				doc.text(175.33,lastRowCoord+28,scope.data.accountable_officer.accountable_officer.toUpperCase(),'center');

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
		
		};

		function filterArticle(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/return-logs/article-list.php',
			}).then(function mySucces(response) {

				scope.articleList = response.data;

			}, function myError(response) {
				
			});

		}

		//Show and Hide Element with Condition Start

		self.showDropdown = function(scope) {

			scope.machineryEquipment_id = scope.me.id;

			$(document).click(function() {
				var showDropdown = $("#showDropdown"+scope.machineryEquipment_id);
				var hideDropdown = $("#hideDropdown"+scope.machineryEquipment_id);
				if (!showDropdown.is(event.target) && !showDropdown.has(event.target).length) {
					hideDropdown.hide();
				} else {
					hideDropdown.show();
				}
		});
			
		}
		//Show and Hide Element with Condition End

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

	};
	
	return new app();
	
});