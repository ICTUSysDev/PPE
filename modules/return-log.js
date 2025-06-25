angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Return Log";

			// for Validation
			scope.formHolder = {};

			// List
			scope.returnLogs = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;
			
			// for Pagination
			scope.viewsDL = {};
			scope.viewsDL.currentPageDL = 1;
			scope.viewsDL.list = true;

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;

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

			scope.filter = {
				start: new Date((m+1)+'/1/'+y),
				end: new Date(),
				searchOffice: "ALL"
			};

			scope.filterMasterlist = {
				start: new Date((m+1)+'/1/'+y),
				end: new Date(),
			};

		};

		// CRUD RETURN Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.showAddButton = true;
			scope.showEditButton = false;
			
				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/return-logs/list.php',
					data: scope.returnLogs
				}).then(function mySucces(response) {
					
					scope.returnLogss = angular.copy(response.data);

					self.filterLog(scope);
					// self.filterMasterlist(scope);
					self.returnLog(scope);
					
				}, function myError(response) {

				});

				$('#content').load('lists/return-logs.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});
			
			offices(scope);
			filterArticle(scope);

		};

		//MODAL Start
		self.viewReturnLog = function(scope, row) {
			
			title = 'Notification Info';
			var dataThemeMode = localStorage.getItem('data-theme-mode');

			$timeout(function() { 

				if (scope.$id > 2) scope = scope.$parent;
				
					$http({
								method: 'POST',
								url: 'handlers/return-logs/view.php',
								data: {id: row.id}
							}).then(function mySucces(response) {
								
								scope.viewNotification = response.data;
								
								if(dataThemeMode == 'light'){
									scope.dataThemeMode = 'light';
								} else {
									scope.dataThemeMode = 'dark';
								}

							}, function myError(response) {
								
								// error
								
							});

					},500);

				var onOk = function(scope){

				}
				
				bootstrapModal.box8(scope,title,'components/modal/view-notification.html',onOk);
			
		};
		// MODAL END

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

		self.filterLog = function(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/return-logs/search-return-logs.php',
			  data: scope.filter
			}).then(function mySucces(response) {

				scope.returnLogs = response.data;

			}, function myError(response) {
				
			});

		}
		
		self.returnLog = function(scope) {

			scope.currentPageDL = scope.viewsDL.currentPageDL;
			scope.pageSizeDL = 10;
			scope.maxSizeDL = 5;
	
			$http({
			  method: 'POST',
			  url: 'handlers/return-logs/return-report.php',
			  data: scope.filter
			}).then(function mySucces(response) {

				scope.returnLogsMasterlist = angular.copy(response.data);
				
			}, function myError(response) {
				
			});

		}
		
		self.exportDisposal = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/return-logs/report/disposal-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.disposalReport = response.data;

				if(scope.disposalReport.length == 0) {
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No data to be exported.');
				} else {
					printDisposal(scope);
				}

			}, function myError(response) {
				// error
			});
			
		}

		function printDisposal(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'Returned Equipment(DISPOSAL)','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.disposalReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.par_details.par_no,
					PTRlist.accountable_officer.name,
					PTRlist.article_id.name,
					PTRlist.disposal_equipment.property_number,
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
						content: 'From PAR No.', 
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
						content: 'Returned to', 
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
						content: 'Date Returned', 
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

		self.exportRepair = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/return-logs/report/repair-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.repairReport = response.data;

				if(scope.repairReport.length == 0) {
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No data to be exported.');
				} else {
					printRepair(scope);
				}

			}, function myError(response) {
				// error
			});
			
		}

		function printRepair(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'RETURNED EQUIPMENT(Repair/Repaired)','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.repairReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.par_details.par_no,
					PTRlist.accountable_officer.name,
					PTRlist.article_id.name,
					PTRlist.repair_equipment.property_number,
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
						content: 'From PAR No.', 
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
						content: 'Returned to', 
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
						content: 'Date Returned', 
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

		self.exportReturnToStock = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/return-logs/report/return-to-stock-report.php',
				data: scope.filter
			}).then(function mySucces(response) {

				scope.returnToStockReport = response.data;

				if(scope.returnToStockReport.length == 0) {
					growl.show('alert alert-danger',{from: 'top', amount: 55},'No data to be exported.');
				} else {
					printReturnToStock(scope);
				}

			}, function myError(response) {
				// error
			});
			
		}

		function printReturnToStock(scope) {
			var doc = new jsPDF('p','mm',[215.9,279]);

			//title
			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(107.5, 25.4, 'RETURNED EQUIPMENT(Repair/Repaired)','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');	

			doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			textWidth = doc.getTextWidth('Provincial Government of La Union');
			doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
		
			var rows = [];

			angular.forEach(scope.returnToStockReport, function(PTRlist, key) {
				
				var row = [
					PTRlist.list_no,
					PTRlist.par_details.par_no,
					PTRlist.accountable_officer.name,
					PTRlist.article_id.name,
					PTRlist.return_to_stock.property_number,
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
						content: 'From PAR No.', 
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
						content: 'Returned to', 
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
						content: 'Date Returned', 
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

		self.viewReport = function(scope,row){

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			$http({
				method: 'POST',
				url: 'handlers/return-logs/report/transaction_report.php',
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


				// START EDIT HERE 'TJ
				var textToShowAccountable = "I HEREBY CERTIFY that the items/articles described above returned to the Provincial General Services Office this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".";

				var splitTextOwner = doc.splitTextToSize(textToShowAccountable,92)
				doc.text(9+5, startY_signatories + 4, splitTextOwner, 'left');
				// var newX = 9 + 5; // You can adjust the X coordinate as needed
				// var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				// doc.text(newX, newY, "returned to the");
				// var newX = 18.5 + 18; // You can adjust the X coordinate as needed
				// var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				// doc.setFont('helvetica', 'bold');
				// doc.text(newX, newY, "Provincial General Services Office");
				// doc.line(36.4, startY_signatories+8, 20 + textWidth + 24, startY_signatories+8);

				// doc.setFont('helvetica', 'normal');
				// var newX = 9 + 5; // You can adjust the X coordinate as needed
				// var newY = startY_signatories + 11; // Increase the Y coordinate to move to the next line
				// doc.text(newX, newY, "this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".");

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

				var texttoShowPGSO = "I HEREBY CERTIFY that the items/articles described above received from "+scope.datas.office.name+" this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".";

				var splitTextPGSO = doc.splitTextToSize(texttoShowPGSO,92)
				doc.text(11+98, startY_signatories + 4, splitTextPGSO, 'left');
				// doc.text(11+98, startY_signatories + 4, "I HEREBY CERTIFY that the items/articles described above");
				// // Create a new line of text below the existing text
				// var newX = 11+98; // You can adjust the X coordinate as needed
				// var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				// doc.text(newX, newY, "received from");
				// // Create a new line of text below the existing text
				// var newX = 33.5+98; // You can adjust the X coordinate as needed
				// var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
				// doc.setFont('helvetica', 'bold');
				// doc.text(newX, newY, ''+scope.datas.office.name);
				// doc.line(33.5+98, startY_signatories+8, 20 + textWidth + 120, startY_signatories+8);

				// doc.setFont('helvetica', 'normal');
				// var newX = 94.75+14; // You can adjust the X coordinate as needed
				// var newY = startY_signatories + 11; // Increase the Y coordinate to move to the next line
				// doc.text(newX, newY, "this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".");

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

		// self.filterMasterlist = function(scope) {
			
		// 	scope.currentPageML = scope.viewsML.currentPageML;
		// 	scope.pageSizeML = 10;
		// 	scope.maxSizeML = 5;

		// 	$http({
		// 		method: 'POST',
		// 		url: 'handlers/return-logs/search-masterlist.php',
		// 		data: scope.filterMasterlist
		// 	}).then(function mySucces(response) {

		// 		scope.filterMasterlists = angular.copy(response.data);

		// 	}, function myError(response) {
				
		// 	});

		// }

		// self.exportMasterlist = function(scope) {

		// 	if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
		// 	return;
		
		// 	$http({
		// 		method: 'POST',
		// 		url: 'handlers/return-logs/report/masterlist-report.php',
		// 		data: scope.filterMasterlist
		// 	}).then(function mySucces(response) {

		// 		scope.masterlistReport = response.data;
		// 		printMasterlist(scope);

		// 	}, function myError(response) {
		// 		// error
		// 	});
			
		// }

			// function printMasterlist(scope) {
		
			// 	var doc = new jsPDF('p','mm',[215.9,279]);
	
			// 	//title
			// 	doc.setFontSize(10);
			// 	doc.setFont('helvetica','bold','bold');
			// 	doc.text(107.5, 25.4, 'MASTERLIST OF RETURNED PPE','center');
			// 	doc.setFontSize(10);
			// 	doc.setFont('helvetica','bold','bold');	
	
			// 	doc.text(12.7, 38.1, 'Name of Local Government Unit:                  Provincial Government of La Union');
			// 	textWidth = doc.getTextWidth('Provincial Government of La Union');
			// 	doc.line(68, 38.9, 22 + textWidth + 88, 38.9);
			
			// 	var rows = [];

			// 	angular.forEach(scope.masterlistReport, function(returnedEquipment, key) {
					
			// 		var row1 = [
			// 			returnedEquipment.list_no,
			// 			returnedEquipment.par_no,
			// 			returnedEquipment.name,
			// 			returnedEquipment.accountable_name,
			// 			returnedEquipment.office,
			// 			returnedEquipment.par_date,
			// 			returnedEquipment.status
			// 		];

			// 		rows.push(row1);
			// 	});

			// 	var row2 = [
			// 		'', // Add your data here
			// 		'',
			// 		'',
			// 		{
			// 			content: '*****nothing follows*****',
			// 			styles: { fontStyle: 'bold' } // Use styles to make text bold
			// 		},
			// 		'',
			// 		'',
			// 		'',
			// 		''
			// 	];
			// 	rows.push(row2);
				
			// 	//COLUMS
			// 	let head = [
					
			// 		[
			// 			{
			// 				content: '#', 
			// 				colSpan: 1, 
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle' ,
			// 					fontSize: number = 8,
			// 					cellWidth: number=12
			// 				}
			// 			},
			// 			{
			// 				content: 'Par No.', 
			// 				colSpan: 1,
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle', 
			// 					cellWidth: number=22,
			// 					fontSize: number = 8
			// 				}
			// 			},
			// 			{
			// 				content: 'Article', 
			// 				colSpan: 1,
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle',
			// 					fontSize: number = 8, 
			// 					cellWidth: number=30
			// 				}
			// 			},
			// 			{
			// 				content: 'Accountable Officer', 
			// 				colSpan: 1,
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle' ,
			// 					fontSize: number = 8,
			// 					cellWidth: number=55
			// 				}
			// 			},
			// 			{
			// 				content: 'Office', 
			// 				colSpan: 1,
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle',
			// 					fontSize: number = 8,
			// 					cellWidth: number=23
			// 				}
			// 			},
			// 			{
			// 				content: 'Date Returned', 
			// 				colSpan: 1,
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle',
			// 					fontSize: number = 8,
			// 					cellWidth: number=20
			// 				}
			// 			},
			// 			{
			// 				content: 'Status', 
			// 				colSpan: 1,
			// 				rowSpan: 1, 
			// 				styles: { 
			// 					halign: 'center',
			// 					valign: 'middle',
			// 					fontSize: number = 8,
			// 					cellWidth: number=31
			// 				}
			// 			},
			// 		],
			// 	];
	
			// 	doc.autoTable({
			// 		startY: 48,
			// 		margin: Margin = 12.7,
			// 		tableWidth: number = 189.6,
			// 		showHead:'everyPage',
			// 		tableLineWidth: number = 0,
			// 		head: head,
			// 		body: rows,
			// 		theme: 'plain',
			// 		styles: { 
			// 			lineWidth: number = .2, 
			// 			lineColor: Color = 10,
			// 			fontSize: number = 8  
			// 		},
			// 		columnStyles: {
			// 			0: { halign: 'center' },
			// 			1: { halign: 'center' },
			// 			2: { halign: 'left' },
			// 			3: { halign: 'center' }, 
			// 			4: { halign: 'center' },
			// 			5: { halign: 'right' }
	
			// 		},
			// 		// foot: foots,
			// 	});
				
			// 	doc.setFontSize(8)
			// 	doc.setFont('helvetica','italic','normal');
			// 	var pageCount = doc.internal.getNumberOfPages();
			// 	for(i = 0; i < pageCount; i++) { 
			// 		doc.setPage(i); 
			// 		doc.text(107.5,274, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			// 	}
			// 	// pageCount maximum of page
				
			// 	doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
				
			// 	var blob = doc.output('blob');
			// 	window.open(URL.createObjectURL(blob));
			
			// };

		function filterArticle(scope) {

			$http({
			  method: 'POST',
			  url: 'handlers/return-logs/article-list.php',
			}).then(function mySucces(response) {

				scope.articleList = response.data;

			}, function myError(response) {
				
			});

		}

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