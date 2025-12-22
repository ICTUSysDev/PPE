angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Pre-Repair Inspection Report";

			// for Validation
			scope.formHolder = {};

			// List
			scope.preRepairInspections = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

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
					url: 'handlers/pre-repair-inspection-report/list.php',
					data: scope.filter
				}).then(function mySucces(response) {
					
					scope.preRepairInspections = angular.copy(response.data);
					
				}, function myError(response) {

				});

		};


		self.viewRepairInspection = function(scope,row){

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
		
			$http({
				method: 'POST',
				url: 'handlers/pre-repair-inspection-report/reports/view-request-form.php',
				data: {id: row.id}

			}).then(function mySucces(response) {
				scope.preRepairInspection = response.data;
				preRepairInspection(scope);
			}, function myError(response) {
				// error
			});

		};

		self.viewWasteMaterial = function(scope, row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;
		
			$http({
				method: 'POST',
				url: 'handlers/repair-office/reports/view-waste-material.php',
				data: {id: row.id}
			}).then(function mySuccess(response) {
				
				scope.viewWasteMaterialReport = response.data;

				wasteMaterialReport(scope);

			}, function myError(response) {
				
			});

		}

		function getFormattedAmount(amount) {
			return amount.toLocaleString("en-US");
		};

		function wasteMaterialReport(data) {
			
			const pageWidth = 210;
			const pageHeight = 297;

			const doc = new jsPDF('p','mm',[pageWidth,pageHeight]);

			// doc.addImage('./assets/Waste-Material-Report.jpg', 'JPEG', 0, 0, 210, 297);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('GENERAL FORM NO. 64 (A)', 16.5, 22.8)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('(Revised July 1947)', 16.5, 28)
			
			doc.setFontSize(15);
			doc.setFont('helvetica','bold');
			const title1 = "REPORT OF WASTE MATERIALS";
			const textWidth = doc.getStringUnitWidth(title1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
			const x = (pageWidth - textWidth) / 2;
			doc.text(title1, x, 34.9);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('On hand at', 16.5, 40.2)
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(48, 42, 194, 42); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(8);
			doc.setFont('helvetica','normal');
			doc.text('(State place of storage)', 60, 45)
			
			doc.setFontSize(8);
			doc.setFont('helvetica','normal');
			doc.text('(Bureau, Province, City or Municipality)', 106, 45);

			//COLUMS
		let head = [
			[
				{
					content: 'Item #',
					colSpan: 1,
					rowSpan: 2,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						fontSize: 9,
						cellWidth: 13.3,
					},
				},
				{
					content: 'QUANTITY',
					colSpan: 1,
					rowSpan: 2,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						cellWidth: 18.4,
						fontSize: 10,
					},
				},
				{
					content: 'UNIT',
					colSpan: 1,
					rowSpan: 2,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						fontSize: 10,
						cellWidth: 11.4,
					},
				},
				{
					content: 'DESCRIPTION',
					colSpan: 1,
					rowSpan: 2,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						fontSize: 10,
						cellWidth: 83.8,
					},
				},
				{
					content: 'RECORD OF SALES',
					colSpan: 2,
					rowSpan: 1,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						fontSize: 10,
						cellWidth: 22.2,
					},
				},
			],
			[
				// Second row for RECORD OF SALES
				{
					content: 'Official Receipt Number',
					colSpan: 1,
					rowSpan: 1,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						fontSize: 10,
						cellWidth: 5,
					},
				},
				{
					content: 'Amount',
					colSpan: 1,
					rowSpan: 1,
					styles: {
						halign: 'center',
						valign: 'middle',
						fontWeight: 'bold',
						fontSize: 10,
						cellWidth: 28.2,
					},
				},
			],
		];

		var rows = [];
		angular.forEach(data.viewWasteMaterialReport.waste_materials, function(wmList,key) {
		
			var row = [];
			row.push(wmList.list_no);
			row.push(wmList.quantity);
			row.push(wmList.unit);
			row.push(wmList.description);
			row.push(wmList.receipt_number);
			row.push(getFormattedAmount(wmList.amount));				
			rows.push(row);
			
		});
		var row2 = [
			'', // Add your data here
			'',
			'',
			{
				content: 'xxxxxxx',
				styles: { fontStyle: 'bold' } // Use styles to make text bold
			},
			'',
			'',
			'',
			''
		];
		rows.push(row2);
		var row3 = [
			'', // Add your data here
			'',
			'',
			'',
			'',
			'',
			'',
			''
		];
		rows.push(row3);

		doc.autoTable({
			startY: 48,
			margin: Margin = 16.4,
			tableWidth: number = 189.6,
			showHead:'everyPage',
			tableLineWidth: number = 0,
			head: head,
			body: rows,
			theme: 'plain',
			styles: { 
				lineWidth: number = .3, 
				lineColor: Color = 10,
				fontSize: number = 10  
			},
			columnStyles: {
				0: { halign: 'center' },
				1: { halign: 'center' },
				2: { halign: 'center' },
				3: { halign: 'left' },
				4: { halign: 'center' },
				5: { halign: 'center' },

			},
			// foot: foots,
		});
		
		// Get the Y coordinate of the last row
		let lastRowY = doc.autoTable.previous.finalY;

		doc.setDrawColor(0, 0, 0); // RGB values for black
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.4, lastRowY + .5, 194, lastRowY + .5); // Draw a horizontal line (x, y, x, y)
		
		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('Total', 60, lastRowY+4.5);
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.4, lastRowY + 5.5, 194, lastRowY + 5.5); // Draw a horizontal line (x, y, x, y)
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.4, lastRowY + 6, 194, lastRowY + 6); // Draw a horizontal line (x, y, x, y)

		// Function to add text with a line
		function addTextWithLine(text, x, y, fontSize, lineDistance, isBold) {
				
			if(isBold) {
				doc.setFont('helvetica', 'bold');
			} else {
				doc.setFont('helvetica', 'normal');
		}
			// Set font and font size
			doc.setFontSize(fontSize);

			// Calculate text width and position
			const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
			const textX = x - textWidth / 2;

			// Draw centered text
			doc.text(text, textX, y);

			// Set line properties
			doc.setLineWidth(0.3); // Default line width in user units
			doc.setDrawColor(0); // Black color

			// Draw a horizontal line below the text with customizable distance
			doc.line(x - textWidth / 2, y + fontSize * lineDistance / 10, x + textWidth / 2, y + fontSize * lineDistance / 10);
		}

		// Example usage
		const requestedBy = data.viewWasteMaterialReport.signatories[0].name
		const requestedByX = 176;
		const requestedByY = lastRowY + 16;
		const requestedBySize = 10;
		const requestedByDistance = .5;

		addTextWithLine(requestedBy, requestedByX, requestedByY, requestedBySize, requestedByDistance, true);
			
		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text(data.viewWasteMaterialReport.signatories[0].code, 157, lastRowY+20);

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		const title2 = "Office of the Provincial General Services";
		const textWidth2 = doc.getStringUnitWidth(title2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
		const x2 = (pageWidth - textWidth2) / 2;
		doc.text(title2, x2, lastRowY+25);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(65, lastRowY + 26, 150, lastRowY + 26); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('Respectfully forwarded to the', 16.4, lastRowY+30);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(63, lastRowY + 30.5, 194, lastRowY + 30.5); // Draw a horizontal line (x, y, x, y)

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.4, lastRowY + 40.5, 175, lastRowY + 40.5); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text(', for action.', 176, lastRowY+40.3);

		// Example usage
		const scbo = data.viewWasteMaterialReport.signatories[1].name
		const scboX = 175;
		const scboY = lastRowY + 48.3;
		const scboSize = 10;
		const scboDistance = .5;

		addTextWithLine(scbo, scboX, scboY, scboSize, scboDistance, true);
			
		doc.setFontSize(8);
		doc.setFont('helvetica','normal');
		doc.text('(Signature of Chief of Bureau or Office)', 149.5, lastRowY+52.3);
			
		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text("Prov'l General Services Officer", 150, lastRowY+56);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(149, lastRowY + 56.3, 199, lastRowY + 56.3); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text("(Official title)", 165, lastRowY+60);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.8, lastRowY + 63, 196, lastRowY + 63); // Draw a horizontal line (x, y, x, y)

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.8, lastRowY + 63.5, 196, lastRowY + 63.5); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','bold');
		const title3 = "CERTIFICATE OF INSPECTORS";
		const textWidth3 = doc.getStringUnitWidth(title3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
		const x3 = (pageWidth - textWidth3) / 2;
		doc.text(title3, x3, lastRowY+67.5);

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text("I HEREBY CERTIFY that this property was disposed of as follows:", 16.8, lastRowY+72);

		doc.setFontSize(8);
		doc.setFont('helvetica','bold');
		doc.text("Items", 65, lastRowY+76.5);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(73, lastRowY + 76.7, 113, lastRowY + 76.7); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(8);
		doc.setFont('helvetica','normal');
		doc.text("Destroyed", 114, lastRowY+76.5);

		doc.setFontSize(8);
		doc.setFont('helvetica','bold');
		doc.text("Items", 65, lastRowY+80);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(73, lastRowY + 80.2, 113, lastRowY + 80.2); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(8);
		doc.setFont('helvetica','normal');
		doc.text("Sold at public auction", 114, lastRowY+80);

		doc.setFontSize(8);
		doc.setFont('helvetica','bold');
		doc.text("Items", 65, lastRowY+84);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(73, lastRowY + 84.2, 113, lastRowY + 84.2); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(8);
		doc.setFont('helvetica','normal');
		doc.text("Sold at private sale", 114, lastRowY+84);

		doc.setFontSize(8);
		doc.setFont('helvetica','bold');
		doc.text("Items", 65, lastRowY+88);

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(73, lastRowY + 88.2, 113, lastRowY + 88.2); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(8);
		doc.setFont('helvetica','normal');
		doc.text("Transferred without cost to", 114, lastRowY+88);

		// Example usage
		const ao = data.viewWasteMaterialReport.signatories[0].name
		const aoX = 176;
		const aoY = lastRowY + 84;
		const aoSize = 10;
		const aoDistance = .5;

		addTextWithLine(ao, aoX, aoY, aoSize, aoDistance, false);
			
		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('Administrative Officer III', 157, lastRowY+88);
			
		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('Witness to disposition:', 16.8, lastRowY+93);
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(65, lastRowY + 99, 135, lastRowY + 99); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('(Signature)', 93, lastRowY+102.3);
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(65, lastRowY + 110, 135, lastRowY + 110); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('(Official Designation)', 85, lastRowY+113);
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.8, lastRowY + 114.5, 198, lastRowY + 114.5); // Draw a horizontal line (x, y, x, y)

		doc.setLineWidth(0.3); // Line width in user units
		doc.line(16.8, lastRowY + 115, 198, lastRowY + 115); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		const title4 = "FIRST INDORSEMENT";
		const textWidth4 = doc.getStringUnitWidth(title4) * doc.internal.getFontSize() / doc.internal.scaleFactor;
		const x4 = (pageWidth - textWidth4) / 2;
		doc.text(title4, x4, lastRowY+119);

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('Respectfully returned to the', 30, lastRowY+125);
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(80, lastRowY + 125.2, 198, lastRowY + 125.2); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('hereby approving the action of the property inspector as contained in his foregoing certificate. The proceeds from', 16.8, lastRowY+130);
			
		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('the sale should be taken up as a credit to', 16.8, lastRowY+135);
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(83, lastRowY + 135.2, 198, lastRowY + 135.2); // Draw a horizontal line (x, y, x, y)
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(150, lastRowY + 142, 198, lastRowY + 142); // Draw a horizontal line (x, y, x, y)
			
		doc.setLineWidth(0.3); // Line width in user units
		doc.line(150, lastRowY + 148, 198, lastRowY + 148); // Draw a horizontal line (x, y, x, y)

		doc.setFontSize(10);
		doc.setFont('helvetica','normal');
		doc.text('(Official Title)', 165, lastRowY+151.7);
			
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
		}

		function preRepairInspection(scope) {

			const pageWidth = 210;
			const pageHeight = 297;

			const doc = new jsPDF('p','mm',[pageWidth,pageHeight]);

			doc.setFontSize(12);
			doc.setFont('helvetica','bold');
			const title1 = "REQUEST FOR PRE-INSPECTION";
			const textWidth = doc.getStringUnitWidth(title1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
			const x = (pageWidth - textWidth) / 2;
			doc.text(title1, x, 22);

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(x, 22.3, 139, 22.3); // Draw a horizontal line (x, y, length, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			const title2 = "(EQUIPMENT/SUPPLIES)";
			const textWidth1 = doc.getStringUnitWidth(title2) * 8 / doc.internal.scaleFactor;
			const x1 = (pageWidth - textWidth1) / 2;
			doc.text(title2, x1, 25.5)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Property Description:', 8.5, 34)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.property_number.description, 43.8, 34)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(41.8, 35, 109, 35); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Brand/Model:', 8.5, 38)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.property_number.brand.name, 43.8, 38)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(41.8, 38.8, 109, 38.8); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Serial No.:', 8.5, 41.8)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.serial_number.serial_number, 43.8, 41.8)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(41.8, 42.3, 109, 42.3); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Property No.:', 118, 38)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.property_number.property_number, 152.1, 38)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(150.1, 38.5, 202.4, 38.5); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Acquisition Cost:', 118, 41.8)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.acquisition_cost, 152.1, 41.8)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(150.1, 42.5, 202.4, 42.5); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Nature of work to be done:', 8.5, 47)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			const natureOfWorkText = scope.preRepairInspection.nature_of_work;
			const natureOfWorkTextmaxWidth = 109;
			const natureOfWorkTexttextLines = doc.splitTextToSize(natureOfWorkText, natureOfWorkTextmaxWidth);
			let natureOfWorkTextnewLineY = 51.5;
			natureOfWorkTexttextLines.forEach((line) => {
				doc.text(line, 9.9, natureOfWorkTextnewLineY);
				natureOfWorkTextnewLineY += 3.8; // Adjust this value for the desired line spacing
			});

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(7.9, 51.9, 109, 51.9); // Draw a horizontal line (x, y, x, y)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(7.9, 55.9, 109, 55.9); // Draw a horizontal line (x, y, x, y)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(7.9, 59.9, 109, 59.9); // Draw a horizontal line (x, y, x, y)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(7.9, 63.6, 109, 63.6); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Complaints/Defects:', 118, 51.1)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.complaints, 152.1, 51.1)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(150.1, 51.9, 202.4, 51.9); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Date of Last Repair:', 118, 55)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.repair_history.repair_date == null?'N/A':scope.preRepairInspection.repair_history.repair_date, 152.1, 55.5)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(150.1, 56, 202.4, 56); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Requested by:', 8.5, 74)

			// Function to add text with a line
			function addTextWithLine(text, x, y, fontSize, lineDistance, isBold) {
				
				if(isBold) {
					doc.setFont('helvetica', 'bold');
				} else {
					doc.setFont('helvetica', 'normal');
			}
				// Set font and font size
				doc.setFontSize(fontSize);

				// Calculate text width and position
				const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
				const textX = x - textWidth / 2;

				// Draw centered text
				doc.text(text, textX, y);

				// Set line properties
				doc.setLineWidth(0.3); // Default line width in user units
				doc.setDrawColor(0); // Black color

				// Draw a horizontal line below the text with customizable distance
				doc.line(x - textWidth / 2, y + fontSize * lineDistance / 10, x + textWidth / 2, y + fontSize * lineDistance / 10);
			}

			// Example usage
			const requestedBy = scope.preRepairInspection.requested_by.requested_by_user.requested_by_user;
			const requestedByX = 50;
			const requestedByY = 82.1;
			const requestedBySize = 10;
			const requestedByDistance = .5;

			addTextWithLine(requestedBy, requestedByX, requestedByY, requestedBySize, requestedByDistance, false);

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Noted by:', 110, 74);

			// Example usage
			const NotedBy = scope.preRepairInspection.noted_by.signatories;
			const NotedByX = 155;
			const NotedByY = 81.5;
			const NotedBySize = 10;
			const NotedByDistance = .5;

			addTextWithLine(NotedBy, NotedByX, NotedByY, NotedBySize, NotedByDistance, false);
			
			doc.setFontSize(9);
			doc.text('Provincial Gen. Services Officer', 132, 85.5)
			
			doc.setFontSize(11);
			doc.setFont('helvetica','bold');
			const title3 = "REQUIREMENTS FOR PRE-REPAIR INSPECTION";
			const textWidth3 = doc.getStringUnitWidth(title3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
			const x3 = (pageWidth - textWidth3) / 2;
			doc.text(title3, x3, 93.5);

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(60, 94, 151, 94); // Draw a horizontal line (x, y, length, y)
			
			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Findings:', 8.5, 105)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			const longText = scope.preRepairInspection.pre_findings;
			// Set the maximum width for the text
			const maxWidth = 180;
			// Split the text into an array of lines that fit within the maxWidth
			const textLines = doc.splitTextToSize(longText, maxWidth);
			// Set the initial y-coordinate for the first line
			let newLineY = 104.2;
			// Loop through each line and add it to the PDF
			textLines.forEach((line) => {
				doc.text(line, 25, newLineY);
				// Increment the y-coordinate for the next line
				newLineY += 4.3; // Adjust this value for the desired line spacing
			});
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(24, 105, 202.4, 105); // Draw a horizontal line (x, y, x, y)
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(8.5, 109, 202.4, 110); // Draw a horizontal line (x, y, x, y)
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(8.5, 113, 202.4, 115); // Draw a horizontal line (x, y, x, y)
			
			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Checked by:', 8.5, 119.8);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Concurred:', 41, 119.8);
			
			// Example usage
			const checkedBy1 = scope.preRepairInspection.checked_by[0].signatories;
			const checkedBy1X = 24;
			const checkedBy1Y = 127.2;
			const checkedBy1Size = 9;
			const checkedBy1Distance = .5;

			addTextWithLine(checkedBy1, checkedBy1X, checkedBy1Y, checkedBy1Size, checkedBy1Distance, true);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Admin Officer III', 12.7, 131);
			
			// Example usage
			const checkedBy2 = scope.preRepairInspection.checked_by[2].signatories;
			const checkedBy2X = 62;
			const checkedBy2Y = 127.2;
			const checkedBy2Size = 9;
			const checkedBy2Distance = .5;

			addTextWithLine(checkedBy2, checkedBy2X, checkedBy2Y, checkedBy2Size, checkedBy2Distance, true);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Executive Assistance V', 45.4, 131);
			
			// Example usage
			const checkedBy3 = scope.preRepairInspection.checked_by[3].signatories;
			const checkedBy3X = 101;
			const checkedBy3Y = 127.2;
			const checkedBy3Size = 9;
			const checkedBy3Distance = .5;

			addTextWithLine(checkedBy3, checkedBy3X, checkedBy3Y, checkedBy3Size, checkedBy3Distance, true);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Provincial Treasurer', 87, 131);

			// Example usage
			const checkedBy4 = scope.preRepairInspection.checked_by[4].signatories;
			const checkedBy4X = 138;
			const checkedBy4Y = 127.2;
			const checkedBy4Size = 9;
			const checkedBy4Distance = .5;

			addTextWithLine(checkedBy4, checkedBy4X, checkedBy4Y, checkedBy4Size, checkedBy4Distance, true);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Provincial Accountant', 124, 131);

			// Example usage
			const checkedBy5 = scope.preRepairInspection.checked_by[1].signatories;
			const checkedBy5X = 180;
			const checkedBy5Y = 127.2;
			const checkedBy5Size = 9;
			const checkedBy5Distance = .5;

			addTextWithLine(checkedBy5, checkedBy5X, checkedBy5Y, checkedBy5Size, checkedBy5Distance, true);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Provincial Gen. Services Officer', 158, 131);
			
			doc.setFontSize(12);
			doc.setFont('helvetica','bold');
			const title4 = "COMMITTEE ON INSPECTION";
			const textWidth4 = doc.getStringUnitWidth(title4) * doc.internal.getFontSize() / doc.internal.scaleFactor;
			const x4 = (pageWidth - textWidth4) / 2;
			doc.text(title4, x4, 146)
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			const title5 = "POST-REPAIR INSPECTION REPORT";
			const textWidth5 = doc.getStringUnitWidth(title5) * doc.internal.getFontSize() / doc.internal.scaleFactor;
			const x5 = (pageWidth - textWidth5) / 2;
			doc.text(title5, x5, 150);
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(77, 150.6, 133.2, 150.6); // Draw a horizontal line (x, y, x, y)
			
			doc.setFontSize(8);
			doc.setFont('helvetica','bold');
			doc.text('Repair Shop/Supplier:', 8.5, 157)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.repair_shop !== null ? scope.preRepairInspection.repair_shop : '', 39.8, 157)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(39.8, 158, 202.4, 158); // Draw a horizontal line (x, y, x, y)
			
			doc.setFontSize(8);
			doc.setFont('helvetica','bold');
			doc.text('Job Order No:', 8.5, 161)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.job_order_no == null ? '' : `${scope.preRepairInspection.job_order_no}`, 39.8, 161.5)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(39.8, 162, 93, 162); // Draw a horizontal line (x, y, x, y)
			
			doc.setFontSize(8);
			doc.setFont('helvetica','bold');
			doc.text('Date Started/Finished:', 101.5, 161.5)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.date_started == null ? '' : scope.preRepairInspection.date_started+' - '+scope.preRepairInspection.date_finish == null? '':scope.preRepairInspection.date_finish, 133, 161.5)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(133, 162, 202.2, 162); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(8);
			doc.setFont('helvetica','bold');
			doc.text('Invoice No.:', 8.5, 165)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.invoice_no == null ? '':`${scope.preRepairInspection.invoice_no}`, 39.8, 165)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(39.8, 165.5, 93, 165.5); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(8);
			doc.setFont('helvetica','bold');
			doc.text('Date:', 101.5, 165)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.date_released == null? '':scope.preRepairInspection.date_released, 110, 165)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(109, 165.6, 126, 165.6); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Payable Amount:', 139.2, 165)

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text(scope.preRepairInspection.payable_amount == null? '':`${scope.preRepairInspection.payable_amount}`, 166, 165)

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(165, 165.6, 202.2, 165.6); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Findings:', 8.5, 168.8);

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			const longText1 = scope.preRepairInspection.full_findings == null? '':scope.preRepairInspection.full_findings;
			// Set the maximum width for the text
			const maxWidth1 = 180;
			const textLines1 = doc.splitTextToSize(longText1, maxWidth1);
			let newLineY1 = 169.2;
			textLines1.forEach((line) => {
				doc.text(line, 25, newLineY1);
				// Increment the y-coordinate for the next line
				newLineY1 += 3.8; // Adjust this value for the desired line spacing
			});
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(24, 169.5, 202.4, 169.5); // Draw a horizontal line (x, y, x, y)
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(24, 173.3, 202.4, 173.3); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Checked by:', 8.5, 180);

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(24, 189, 77, 189); // Draw a horizontal line (x, y, x, y)

			const checkedBy = scope.preRepairInspection.checked_by[0].signatories;
			const checkedByX = 51;
			const checkedByY = 188.4;
			const checkedBySize = 10;
			const checkedByDistance = .5;

			addTextWithLine(checkedBy, checkedByX, checkedByY, checkedBySize, checkedByDistance, false);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('GSO Representative', 37, 192);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text('Date:', 86, 188);
			
			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text(scope.preRepairInspection.date_released == null? '':scope.preRepairInspection.date_released, 95, 188);

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(93, 188.8, 109, 188.8); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(8);
			doc.setFont('helvetica','bold');
			doc.text('Certified by:', 109, 180);

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			doc.text(scope.preRepairInspection.checked_by[0].signatories, 134, 188);

			doc.setLineWidth(0.3); // Line width in user units
			doc.line(126, 188.8, 163, 188.8); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Administrative Officer III', 128, 191.5);

			const exec = scope.preRepairInspection.checked_by[2].signatories;
			const execX = 47;
			const execY = 199.3;
			const execSize = 9;
			const execDistance = .5;

			addTextWithLine(exec, execX, execY, execSize, execDistance, true);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Executive Assistance V', 32, 203.2);

			const tres = scope.preRepairInspection.checked_by[3].signatories;
			const tresX = 89;
			const tresY = 199.3;
			const tresSize = 9;
			const tresDistance = .5;

			addTextWithLine(tres, tresX, tresY, tresSize, tresDistance, true);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Provincial Treasurer', 75, 203.2);

			const Acc = scope.preRepairInspection.checked_by[4].signatories;
			const AccX = 129;
			const AccY = 199.3;
			const AccSize = 9;
			const AccDistance = .5;

			addTextWithLine(Acc, AccX, AccY, AccSize, AccDistance, true);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Provincial Accountant', 114, 203.2);

			const gso = scope.preRepairInspection.checked_by[1].signatories;
			const gsoX = 170;
			const gsoY = 199.3;
			const gsoSize = 9;
			const gsoDistance = .5;

			addTextWithLine(gso, gsoX, gsoY, gsoSize, gsoDistance, true);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('Provincial Gen. Services Officer', 148, 203.2);

			doc.setFontSize(9);
			doc.setFont('helvetica','bold');
			const title6 = "CERTIFICATE OF ACCEPTANCE";
			const textWidth6 = doc.getStringUnitWidth(title6) * doc.internal.getFontSize() / doc.internal.scaleFactor;
			const x6 = (pageWidth - textWidth6) / 2;
			doc.text(title6, x6, 207);
			
			doc.setLineWidth(0.3); // Line width in user units
			doc.line(80, 207.5, 130.5, 207.5); // Draw a horizontal line (x, y, x, y)

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('This is to accept that the equipment repaired in the confirmity with required job specification is now in good running condition.', 24, 210.5);

			doc.setFontSize(11);
			doc.setFont('helvetica','normal');
			doc.text('PGSO-009-0', 8.5, 230);

			doc.setFontSize(9);
			doc.setFont('helvetica','normal');
			doc.text('CERTIFIED:', 130.5, 218.5);

			const end = 'GERRY D. BINAS-O';
			const endX = 172;
			const endY = 222.5;
			const endSize = 10;
			const endDistance = .5;

			addTextWithLine(end, endX, endY, endSize, endDistance, false);

			doc.setFontSize(10);
			doc.setFont('helvetica','normal');
			doc.text('End-User/Position', 158.5, 226);

			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));

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