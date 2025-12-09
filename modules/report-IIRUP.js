angular.module('app-module',['notify', 'my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Inventory and Inspection of Unserviceable Property Report (IIRUP)";

			// for Validation
			scope.formHolder = {};

		
			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;
			scope.filter={};
			scope.filter.year=0;
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

			var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
			scope.filter = {
				start: new Date((m+1)+'/1/'+y),
				end: new Date(),
			};

			scope.notify = notify;

			scope.stopNotification = window.setInterval(function() {
				notify.notifications(scope);
			}, 2000);

		};

		// CRUD Start
		
    // List Start
		self.list = function(scope) {

		};
		
		//VIEW REPORT PDF
		self.generateReport=function(scope){

			if (scope.filter.start == '' || scope.filter.end == '')
			{ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			
			$http({
				method: 'POST',
				url: 'handlers/report-IIRUP/viewIIRUP.php',
				data: {start: scope.filter.start, end: scope.filter.end}

			}).then(function mySucces(response) {
				scope.datas = response.data;
				if (response.data === null)
				{
					growl.show('alert alert-danger',{from: 'top', amount: 55},'Search criteria returns nothing.');
					return;
				}

				print(scope);
		}, function myError(response) {
			// error
			});
		};

		function print(scope) {
		
			var doc = new jsPDF('l','mm',[330.2,215.9]);

			//APPENDIX
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(317.5, 12.7, 'Appendix 67','right');

			doc.setFontSize(12);
			doc.setFont('helvetica','bold','bold');
			doc.text(165, 25, 'INVENTORY AND INSPECTION REPORT OF UNSERVICEABLE PROPERTY','center');
			doc.setFontSize(10);
			doc.setFont('helvetica','normal','normal');	
			doc.text(165, 32, 'As of _____________________','center');
			
			

	
			// doc.text(13, 43.1, 'LGU:  Provincial Government of La Union');
			doc.line(22,44, 80 , 44);

			doc.text(270, 43.1, 'Fund:');
			doc.line(280,44, 317 , 44);

			doc.line(22,53, 80 , 53);
			doc.line(110,53, 168 , 53);
			doc.line(198,53, 256 , 53);
			
			doc.setFontSize(8);
			doc.setFont('helvetica','italic','normal');
			doc.text(51, 56, '(Name of Accountable Officer)','center');
			doc.text(139, 56, '(Designation)','center');
			doc.text(227, 56, '(Station)','center');

			doc.setFontSize(10);
			doc.setFont('helvetica','bold','bold');
			doc.text(51, 52, scope.datas.AccountableOfficer[0].accountable_officer,'center');
			doc.text(139, 52, scope.datas.AccountableOfficer[0].position,'center');
			doc.text(227, 52, scope.datas.AccountableOfficer[0].office,'center');
			doc.text(13, 43.1, 'LGU:  Provincial Government of La Union');
			doc.text(170, 32,scope.datas.date_range[0].start_date+' - '+scope.datas.date_range[0].end_date,'center','left');
			// doc.text(201, 43.1, "ICS No.: " + scope.datas[0].par_no,'right');
			// textWidth = doc.getTextWidth("PAR No.: " + scope.datas[0].par_no);
			var rows = [];
			angular.forEach(scope.datas.equipmentList, function(list_equipment,key) {
				var row = [];

				row.push(list_equipment.acquisition_date);
				row.push(list_equipment.Article);
				row.push(list_equipment.property_number);
				row.push('1');
				row.push(list_equipment.acquisition_cost);
				row.push(list_equipment.acquisition_cost);
				row.push('');
				row.push('');
				row.push('');
				row.push(list_equipment.remarks);
				rows.push(row);
			});
			 
			//COLUMS
			let head = [
				[
					{
						content: 'INVENTORY', 
						colSpan: 10, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8
						}
					}, 
					{
						content: 'INSPECTION and DISPOSAL', 
						colSpan: 8, 
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle' ,
							fontSize: number = 8
						}
					},
				],
				[

					{
						content: 'Date Acquired', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=12,
							fontSize: number = 6
						}
					},
					{
						content: 'Particulars / Articles', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=22,
							fontSize: number = 6
						}
					},
					{
						content: 'Property No.', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=19,
							fontSize: number = 6
						}
					},
					{
						content: 'Quantity', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=11,
							fontSize: number = 6
						}
					},
					{
						content: 'Unit Cost', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=14,
							fontSize: number = 6
						}
					},
					{
						content: 'Total Cost', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=14,
							fontSize: number = 6
						}
					},
					{
						content: 'Accumulated Depreciation', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=16,
							fontSize: number = 6
						}
					},
					{
						content: 'Accumulated Impairment Losses', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=16,
							fontSize: number = 6
						}
					},
					{
						content: 'Carrying Amount', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=15,
							fontSize: number = 6
						}
					},
					{
						content: 'Remarks', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=24,
							fontSize: number = 6
						}
					},
					{
						content: 'DISPOSAL', 
						colSpan: 5,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							fontSize: number = 6
						}
					},
					{
						content: 'Appraised Value', 
						colSpan: 1,
						rowSpan: 2, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							fontSize: number = 6
						}
					},
					{
						content: 'RECORD OF SALES', 
						colSpan: 2,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							fontSize: number = 6,
						}
					},

				],
				[
					{
						content: 'Sale', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=18,
							fontSize: number = 6
						}
					},
					{
						content: 'Transfer', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=18,
							fontSize: number = 6
						}
					},
					{
						content: 'Destruction', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=18,
							fontSize: number = 6
						}
					},
					{
						content: 'Others (Specify)', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=18,
							fontSize: number = 6
						}
					},
					{
						content: 'Total', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=20,
							fontSize: number = 6
						}
					},
					{
						content: 'OR No.', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=16,
							fontSize: number = 6
						}
					},
					{
						content: 'Amount', 
						colSpan: 1,
						rowSpan: 1, 
						styles: { 
							halign: 'center',
							valign: 'middle', 
							cellWidth: number=16,
							fontSize: number = 6
						}
					},

				],




			];

	

			doc.autoTable({
				startY: 60,
				margin: Margin = 8,
				tableWidth: number = 316,
				showHead:'everyPage',
				tableLineWidth: number = 0,
				head: head,
				body: rows,
				theme: 'plain',
				styles: { 
					lineWidth: number = .2, 
					lineColor: Color = 10,
					fontSize: number = 6 
				},
				columnStyles: {
					// 0: { halign: 'center' },
					1: { halign: 'center' },
					// 2: { halign: 'right' },
					3: { halign: 'center' }, 
					4: { halign: 'right' },
					5: { halign: 'right' },
					// 6: { halign: 'center' }

				},
				// foot: foots,



				
			});


			//SIGNATORIES
			const lastRowCoord = doc.lastAutoTable.finalY;
			doc.setFontSize(8);
			doc.setDrawColor(0);
			doc.setLineWidth(.2);
			doc.setFont('helvetica','normal','normal');	
			
			doc.rect(8,lastRowCoord,163,44);
			doc.rect(171,lastRowCoord,153,44);
//FIRST SIGNATORIES
			doc.text(10, lastRowCoord+7,'I HEREBY request inspection and disposition, pursuant to Section 79 of PD 1445, of the property enumerated above.');
			doc.text(12, lastRowCoord+18, 'Requested by:');
			doc.text(90,lastRowCoord+18,'Approved by:');
			doc.line(22, lastRowCoord+24,77,lastRowCoord+24);
			doc.line(100, lastRowCoord+24,155,lastRowCoord+24);
			doc.setFont('helvetica','italic','normal');	
			doc.text(49.5,lastRowCoord+27,'(Signature over Printed Name of Accountable Officer)',{align:'center',maxWidth:50});
			doc.text(127.5,lastRowCoord+27,'(Signature over Printed Name of Authorized Official)',{align:'center',maxWidth:50});
			doc.line(22, lastRowCoord+39,77,lastRowCoord+39);
			doc.line(100, lastRowCoord+39,155,lastRowCoord+39);
			doc.text(49.5,lastRowCoord+42,'(Designation of Accountable Officer)',{align:'center'});
			doc.text(127.5,lastRowCoord+42,'(Designation of Authorized Officer)',{align:'center'});
			
//SECOND SIGNATORIES
			doc.setFont('helvetica','normal','normal');
			doc.text(173, lastRowCoord+7,'I CERTIFY that I have inspected each and every article enumerated in this report, and that the disposition made thereof was, in my judgment, the best for the public interest.  ',{maxWidth:70});
			doc.text(258,lastRowCoord+7,'I CERTIFY that I have witnessed the disposition of the articles enumerated on this report this ____day of _____________, _____.',{maxWidth:65});
			doc.line(173,lastRowCoord+24,243,lastRowCoord+24);
			doc.line(258,lastRowCoord+24,323,lastRowCoord+24);
			doc.setFont('helvetica','italic','normal');	
			doc.text(208,lastRowCoord+27,'(Signature over Printed Name of Inspection Officer)',{align:'center'});
			doc.text(290.5,lastRowCoord+27,'(Signature over Printed Name of Witness)',{align:'center'});




			doc.setFontSize(8)
			doc.setFont('helvetica','italic','normal');
			var pageCount = doc.internal.getNumberOfPages();
			for(i = 0; i < pageCount; i++) { 
				doc.setPage(i); 
				doc.text(165.5,210, 'Page '+doc.internal.getCurrentPageInfo().pageNumber+' of '+pageCount,'center');
			}
			// pageCount maximum of page
			
			// doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
			
			doc.setFontSize(6);
			doc.text(8, 210, 'Report generated by ' + scope.datas[0]['userFullName'] + ' at ' + scope.datas[0]['reportDate'],'left');
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



// $("#datepicker").datepicker({
// 	format: "yyyy",
// 	viewMode: "years", 
// 	minViewMode: "years"
// });
