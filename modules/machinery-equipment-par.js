angular.module('app-module',['notify','my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access,notify) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Machinery Equipment PAR";

			// for Validation
			scope.formHolder = {};

			// CRUD
			scope.machineryEquipmentPar = {}
			scope.machineryEquipmentPar.id = 0;

			// List
			scope.machineryEquipmentPars = [];

			// List
			scope.machineryEquipmentParsICS = [];

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

			scope.viewsAdd = {};
			scope.viewsAdd.currentPageAdd = 1;
			scope.viewsAdd.list = true;

			scope.viewsRemove = {};
			scope.viewsRemove.currentPageRemove = 1;
			scope.viewsRemove.list = true;

			scope.viewsICS = {};
			scope.viewsICS.currentPageICS = 1;
			scope.viewsICS.list = true;

			scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
				add: {btn: false, label: 'New'},
				edit: {btn: false, label: 'Edit'},
				icon: {label: 'fa-eye'}
			};

			scope.machineryEquipmentPar_id = 0;

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

		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
				scope.controls.add.btn = true;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
				scope.controls.add.label = 'Edit';
			}
			
		};

		// CRUD Machinery Equipment PAR Start
		
    // List Start
		self.list = function(scope) {

			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;
			scope.showNote = true;
			
			scope.controls.edit.label = "Edit";
			
			scope.machineryEquipmentData = [];
			scope.machineryEquipment = [];

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-pars/list.php',
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentPars = angular.copy(response.data);
					
					scope.switchTab = 'parList';
					self.switchTab(scope);
					
				}, function myError(response) {

				});

				$('#content').load('lists/machinery-equipment-pars.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

				listICS(scope);

		};

    // List Start
		function listICS(scope) {

			scope.currentPageICS = scope.viewsICS.currentPageICS;
			scope.pageSizeICS = 10;
			scope.maxSize = 5;

			//for Hidding Elements
			scope.showAddButton = true;
			scope.showEditButton = false;
			scope.showNote = true;
			
			scope.controls.edit.label = "Edit";
			
			scope.machineryEquipmentData = [];
			scope.machineryEquipment = [];

				if (scope.$id > 2) scope = scope.$parent;

				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-pars/list-ics.php',
				}).then(function mySucces(response) {
					
					scope.machineryEquipmentParsICS = angular.copy(response.data);
					
				}, function myError(response) {

				});
		};
		
		// Form Start
		self.machineryEquipmentPar = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
			return;

			scope.machineryEquipmentPar = {};
			scope.machineryEquipmentPar.id = 0;

			scope.fileList = [];
			
			scope.showAddButton = false;

			mode(scope, row);
			
			$('#content').load('forms/machinery-equipment-par.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});

			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;

				scope.showAddButton = false;
				scope.showEditButton = true;
				
				$http({
				  method: 'POST',
				  url: 'handlers/machinery-equipment-pars/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.machineryEquipmentPar);

					if (response.data.par_date != null){scope.machineryEquipmentPar.par_date = new Date(response.data.par_date);}else{};

					machineryEquipmentData(scope,row);

					scope.filterEquipment = {};
					scope.filterEquipment.id = 0;

					self.filterOfficer(scope,scope.machineryEquipmentPar.office_id);
					self.fileList(scope,scope.machineryEquipmentPar.id);

					mode(scope, row);

					if(scope.machineryEquipmentPar.id != 0) {
						scope.disableAddEquipment = true;
					}
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};

				// accountableOfficer(scope);
			offices(scope);
			machineryEquipment(scope);
			fileUpload(scope);

		};
		// Form End
		
		self.switchTab = function(scope) {
			var tabLinks = document.querySelectorAll('a.nav-link');

			tabLinks.forEach(function(tabLink) {
					tabLink.addEventListener('click', function(event) {
							event.preventDefault();
							var tabId = this.getAttribute('value');
							scope.switchTab = tabId;
					});
			});
		}

		function machineryEquipmentData(scope,row) {

			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-pars/machineryEquipmentData.php',
				data: {id: row.id}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.machineryEquipmentData);

			}, function myError(response) {
				
				// error
				
			});


		}

		// Add Function Start
		self.savePar = function(scope) {
			
			if (validate.form(scope,'machineryEquipmentPar')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}
			if(scope.machineryEquipmentData.length == 0) {
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add Equipment.');
				return;
			}
			var accountable_officer = scope.machineryEquipmentPar.accountable_officer.name;

			var spinner;
					spinner=document.querySelector("#spinner_form_submit");
					spinner.setAttribute("data-kt-indicator","on");
		
				$http({
					method: 'POST',
					url: 'handlers/machinery-equipment-pars/save.php',
					data: {machineryEquipmentPar: scope.machineryEquipmentPar, machineryEquipmentData: scope.machineryEquipmentData, tabId: scope.switchTab}
				}).then(function mySuccess(response) {
					
					setTimeout(function() {
						spinner.removeAttribute("data-kt-indicator");
					}, 500);

					setTimeout(function() {

						scope.machineryEquipmentPar.id = response.data;

							Swal.fire({
								title: "The equipment has been successfully assigned to " + accountable_officer,
								html: `Do you want to Print Report or Upload File?`,
								icon: "success",
								showDenyButton: true,
								showCancelButton: true,
								confirmButtonText: "No Thanks",
								denyButtonText: `Print Report`,
								cancelButtonText: `Upload File`,
							}).then((result) => {
								/* Read more about isConfirmed, isDenied below */
								if (result.isConfirmed) {
									self.list(scope);
								} else if (result.isDenied) {
									if(scope.switchTab == 'parList') {
										viewPARreport(response.data,scope);
									} else {
										viewICS(response.data,scope);
									}
									self.list(scope);
								} else if (result.isDismissed) {
									document.querySelector('a[data-kt-countup-tabs="true"][href="#kt_user_view_overview_security"]').click();
								}
							});
						
					}, 500);

				}, function myError(response) {
					
					// error
					
				});

		}

		//MODAL Start
		self.viewPAR = function(scope,row) {

			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete))
			return;

			if(scope.mep.form_type != 'ICS') {
				var title = "Property Acknowledgement Receipt";
			} else {
				var title = "Inventory Custodian Slip";
			}
			
			var dataThemeMode = localStorage.getItem('data-theme-mode');

			$timeout(function() {

				if (scope.$id > 2) scope = scope.$parent;
				
					$http({
						method: 'POST',
						url: 'handlers/machinery-equipment-pars/view-par.php',
						data: {id: row.id}
					}).then(function mySucces(response) {
						
						scope.viewPAR = angular.copy(response.data);
						
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
					if(scope.mep.form_type != 'ICS') {
						viewPARreport(scope.mep.id);
					} else {
						viewICS(scope.mep.id);
					}
					
				}

				if(scope.mep.form_type != 'ICS') {
					bootstrapModal.customBox1(scope,title,'components/modal/view-par.html',onOk);
				} else {
					bootstrapModal.customBox1(scope,title,'components/modal/view-ics.html',onOk);
				}
				
		};
		// MODAL END

				                                            // CRUD Machinery Equipment PAR END
		//Start / Api / Suggestions
		function machineryEquipment(scope) {

			scope.currentPageAdd = scope.viewsAdd.currentPageAdd;
			scope.pageSizeAdd = 10;
			scope.maxSizeAdd = 5;

			scope.currentPageRemove = scope.viewsRemove.currentPageRemove;
			scope.pageSizeRemove = 10;
			scope.maxSizeRemove = 5;
	
			$http({
				method: 'POST',
				url: 'api/suggestions/machinery-equipment.php',
				data: {tabId: scope.switchTab}
			}).then(function mySuccess(response) {
				
				scope.machineryEquipment = angular.copy(response.data);

			}, function myError(response) {
				
				// error
				
			});				
			
		};

		self.filterOfficer = function(scope, item) {
	
			$http({
				method: 'POST',
				url: 'handlers/machinery-equipment-pars/filter-officer.php',
				data: {officeId: item.id}
			}).then(function mySuccess(response) {
				
				scope.accountableOfficer = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});	
			
		};

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
		//End / Api / Suggestions

		//Others
		self.addFunction = function(scope,item) {

			let index = scope.machineryEquipment.findIndex(
				x => x.property_number == item.property_number && x.article.name == item.article.name
			);

			scope.machineryEquipmentData.push(scope.machineryEquipment[index]);
			scope.machineryEquipment.splice(index, 1);

		}

		self.removeFunction = function(scope,item) {

				let index = scope.machineryEquipmentData.findIndex(
					x => x.property_number == item.property_number && x.article.name == item.article.name
					);
	
				scope.machineryEquipment.push(scope.machineryEquipmentData[index]);
				scope.machineryEquipmentData.splice(index, 1);

		}

		//------

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

//PAR REPORT PDF
//VIEW PAR REPORT PDF
function viewPARreport(PARid){
	$http({
		method: 'POST',
		url: 'handlers/report-PAR/viewPAR.php',
		data: {id: PARid}

	}).then(function mySucces(response) {
		// scope.datas = response.data;
		printPar(response.data);
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

function printPar(list) {
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
	
	doc.text(202.37, 43.1, "PAR No.: " + list[0].par_no,'right');
	textWidth = doc.getTextWidth("PAR No.: " + list[0].par_no);
	doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);

	var rows = [];
	var cancelled_equipments;
	angular.forEach(list[0].equipment, function(pars_equipment,key) {
	
		var row = [];
		row.push('1');
		row.push('1');
		row.push(pars_equipment.description);
		row.push(pars_equipment.property_number);
		row.push(pars_equipment.acquisition_date);
		row.push(getFormattedAmount(pars_equipment.acquisition_cost));				
		rows.push(row);

	

		if (list[0].cancelled === undefined || list[0].cancelled.length == 0) {

		}
		else 
		{
			if (list[0].equipment.length == key+1)
				{
				cancelled_equipments = "The following equipment(s) already had new PAR:   ";
				angular.forEach(list[0].cancelled, function(cancelledPar,key1) {

				cancelled_equipments = cancelled_equipments + cancelledPar.prop_no + "(" + cancelledPar.PAR_No + ")";
					if (key1 != list[0].cancelled.length-1)
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
	var AccountableOfficerSig=list[0].accountable_officer;
	doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
	doc.text(list[0].position_description,61, startY_signatories + 26, 'center');

	doc.setFont('helvetica','normal');
	doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
	doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
	doc.text("Position/Office",61, startY_signatories + 30, 'center');
	doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
	doc.text("Date",61, startY_signatories + 40, 'center');			

	doc.setFont('helvetica','bold','bold');
	doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");

	var issuedBySignatory=list[0].PropCustodian[0].signatoryName;
	doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
	doc.text(list[0].PropCustodian[0].position,155.3, startY_signatories + 26, 'center');
	
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
	
	doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
	
	var blob = doc.output('blob');
	window.open(URL.createObjectURL(blob));

};

function fileUpload(scope) {

	setTimeout(function(){ 

	const inputElement = document.querySelector('input[type="file"]');

	FilePond.registerPlugin(
		FilePondPluginFileValidateSize,
		FilePondPluginFileValidateType,
		FilePondPluginImageValidateSize,
		);

	const pond = FilePond.create(inputElement, {
		allowFileValidateType: true,
		acceptedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
		allowFileSizeValidation: true,
		maxFileSize: '10MB',
		server: {
			process: function (fieldName, file, metadata, load, error, progress, abort) {
				load();
			},
			fetch: null,
			revert: null
		}
	});

	scope.disableUpload = true;
	let lastLoadedFile = null;

	setInterval(function() {

		const getFiles = pond.getFiles();
		 // Iterate through the files to find the last loaded file
		 for (let i = getFiles.length - 1; i >= 0; i--) {
			const getFile = getFiles[i];
			if (getFile.status === 5) {
					lastLoadedFile = getFile;
					scope.disableUpload = false;
					break; // Stop when the last loaded file is found
			}
	}

	}, 1000)

	$('#uploadFile').click(function() {

		const files = pond.getFiles();

		if(files.length == 0){
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Select File');
				return;
		}

		if(scope.machineryEquipmentPar.id == 0) {
			growl.show('alert alert-danger',{from: 'top', amount: 55},'Please Submit PAR first');
				return;
		}
		
		const formData = new FormData();
		files.forEach(file => {
			formData.append('files[]', file.file, file.filename, file.fileSize);

			if(file.fileSize >= 10000000) {
				scope.showFileSizeAlert = true;
				return;

			} else {
				scope.showFileSizeAlert = false;
			}
			
			pond.removeFile(file);

		});

		if(scope.showFileSizeAlert == true) {
			growl.show('alert alert-danger',{from: 'top', amount: 55},'Some file size are too Large!');
			return;
		}

		$.ajax({
				url: 'handlers/machinery-equipment-pars/upload-files.php',
				type: 'POST',
				data: formData,
				dataType: 'json',
				processData: false,
				contentType: false,
				success: function(response) {

					scope.machineryEquipmentPar.fileNames = response;

				},
				error: function(error) {
						console.error('Error:', error);
				}
		});

		setTimeout(function() {

			var moduleName = 'PAR';

			var onOk = function() {
				$http({
					method: 'POST',
					url: 'handlers/file-uploads/save-file-names.php',
					data: {fileNames: scope.machineryEquipmentPar.fileNames, landId: scope.machineryEquipmentPar.id, module_name: moduleName}
				}).then(function mySucces(response) {
					
					self.fileList(scope,scope.machineryEquipmentPar.id);
					
				}, function myError(response) {
					
					// error
					
				});
			}
			bootstrapModal.confirmUpload(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});
			
		}, 200);

});

	}, 500);
}

//File List Start
self.fileList = function(scope,land_ids) {

	var moduleName = 'PAR';

	scope.currentPage = scope.views.currentPage;
	scope.pageSize = 10;
	scope.maxSize = 5;

	// scope.showAddButton = true;
	scope.showEditButton = false;

		if (scope.$id > 2) scope = scope.$parent;

		$http({
			method: 'POST',
			url: 'handlers/file-uploads/file-list.php',
			data: {id: land_ids, module_name: moduleName}
		}).then(function mySucces(response) {
			
			scope.fileList = angular.copy(response.data);
			
		}, function myError(response) {

		});

};

self.downloadFile = function(scope, itemId) {

	var fileUrl = './assets/files/machinery-equipment-pars/';

	function downloadFile(filePath){
		var link=document.createElement('a');
		link.href = filePath;
		link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
		link.click();
	}

	$http({
		method: 'POST',
		url: 'handlers/file-uploads/download-file.php',
		data: {id: itemId}
	}).then(function mySucces(response) {

		scope.downloadFile = response.data;

		downloadFile(fileUrl + scope.downloadFile.file_name);
		
	}, function myError(response) {

	});

}

self.viewFile = function(scope, itemId) {

	var fileUrl = './assets/files/machinery-equipment-pars/';

	$http({
		method: 'POST',
		url: 'handlers/file-uploads/view-file.php',
		data: {id: itemId}
	}).then(function mySucces(response) {

		scope.viewFile = response.data;

		window.open(fileUrl + scope.viewFile.file_name);
		
	}, function myError(response) {

	});

}

self.deleteFile = function(scope,item) {

	var moduleName = 'PAR';

	var onOk = function() {

		$http({
			method: 'POST',
			url: 'handlers/file-uploads/delete-file.php',
			data: {dataFile: item, module_name: moduleName},
		}).then(function mySucces(response) {

			self.fileList(scope,response.data.ppe_id);

		}, function myError(response) {
				
			// error
			
		});
	}

	bootstrapModal.confirmDelete(scope,'Confirmation','Click Ok to Proceed',onOk,function() {});

};

// Form Start
self.machineryEquipmentTransfer = function(scope,row) {

	if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
	return;

	scope.machineryEquipmentTransfer = {};
	scope.machineryEquipmentTransfer.id = 0;

	scope.showAddButton = false;

	mode(scope, row);
	
	$('#content').load('forms/ppe-transfer.html',function() {
		$timeout(function() { $compile($('#content')[0])(scope); },200);
	});

	if (row != null) {
		
		if (scope.$id > 2) scope = scope.$parent;

		scope.showAddButton = false;
		scope.showEditButton = true;
		
		$http({
			method: 'POST',
			url: 'handlers/machinery-equipment-pars/machinery-equipment-transfers/view.php',
			data: {id: row.id}
		}).then(function mySucces(response) {
			
			scope.machineryEquipmentTransfer = response.data;

			meDataTransfer(scope,row);
			
			if (response.data.par_date != null){scope.machineryEquipmentTransfer.par_date = new Date(response.data.par_date);}else{};

			mode(scope, row);
		}, function myError(response) {
			
			// error
			
		});
		
	};

	offices(scope);

};
// Form End

// Add Function Start
self.saveTransfer = function(scope) {
	
	if (validate.form(scope,'machineryEquipmentTransfer')){ 
		growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
		return;
	}

	if(scope.machineryEquipmentData.length == 0) {
		growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add Equipment.');
		return;
	}

	var accountable_officer = scope.machineryEquipmentTransfer.new_accountable_officer.name;

	var spinner;
			spinner=document.querySelector("#spinner_form_submit");
			spinner.setAttribute("data-kt-indicator","on");

		$http({
			method: 'POST',
			url: 'handlers/machinery-equipment-pars/machinery-equipment-transfers/save.php',
			data: {machineryEquipmentTransfer: scope.machineryEquipmentTransfer, machineryEquipmentData: scope.machineryEquipmentData}
		}).then(function mySuccess(response) {

			setTimeout(function() {
				spinner.removeAttribute("data-kt-indicator");
			}, 500);

			setTimeout(function() {

				scope.machineryEquipmentTransfer.id = response.data;

				Swal.fire({
					title: "The equipment has been successfully added to " + accountable_officer,
					html: `Do you want to Print Report?`,
					icon: "success",
					showDenyButton: true,
					confirmButtonText: "No Thanks",
					denyButtonText: `Print Report`,
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						self.list(scope);
					} else if (result.isDenied) {
						viewTransferReport(response.data,scope);
						self.list(scope);
					}
				});
					
			}, 500);

		}, function myError(response) {
			
			// error
			
		});

	}
																								// CRUD Machinery Equipment PAR END
//Start / Api / Suggestions
function meDataTransfer(scope, item){
	
	scope.currentPageAdd = scope.viewsAdd.currentPageAdd;
	scope.pageSizeAdd = 10;
	scope.maxSizeAdd = 5;

	scope.currentPageRemove = scope.viewsRemove.currentPageRemove;
	scope.pageSizeRemove = 10;
	scope.maxSizeRemove = 5;

	$http({
		method: 'POST',
		url: 'handlers/machinery-equipment-pars/machinery-equipment-transfers/machinery-equipment-data.php',
		data: {par_id: item.id}
	}).then(function mySucces(response) {
		
		scope.machineryEquipment = response.data
		
	}, function myError(response) {
		 
	});
	
};

self.filterOfficer = function(scope, item) {

	$http({
		method: 'POST',
		url: 'handlers/machinery-equipment-pars/machinery-equipment-transfers/filter-officer.php',
		data: {officeId: item.id}
	}).then(function mySuccess(response) {
		
		scope.accountableOfficer = angular.copy(response.data);
		
	}, function myError(response) {
		
		// error
		
	});	
	
};

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

//End / Api / Suggestions

//Others
// self.addFunctionTransfer = function(scope,item) {

// let index = scope.machineryEquipment.findIndex(
// 	x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
// );

// scope.machineryEquipmentData.push(scope.machineryEquipment[index]);
// scope.machineryEquipment.splice(index, 1);

// }

// self.removeFunctionTransfer = function(scope,item) {

// 	let index = scope.machineryEquipmentData.findIndex(
// 		x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
// 		);

// 	scope.machineryEquipment.push(scope.machineryEquipmentData[index]);
// 	scope.machineryEquipmentData.splice(index, 1);

// }
//------

//Show and Hide Element with Condition Start

self.checkAccountableOfficer = function(scope) {

	if(scope.machineryEquipmentTransfer.accountable_officer.id == scope.machineryEquipmentTransfer.new_accountable_officer.id) {
		growl.show('alert alert-danger',{from: 'top', amount: 55},'New Accountable Officer cannot be same as Previous Accountable Officer!');
		scope.reparDisableSave = true;
		return;
	} else {
		scope.reparDisableSave = false;
	}

}

		
self.checkPurposeTransfer = function(scope) {
	if(scope.machineryEquipmentTransfer.purpose == "DONATION") {
		scope.disabledAccountableOfficer = true;
		scope.disableBeneficiary = false;
		scope.machineryEquipmentTransfer.office_id = "";
		scope.machineryEquipmentTransfer.new_accountable_officer = "";
	} else {
		scope.disabledAccountableOfficer = false;
		scope.disableBeneficiary = true;
		scope.machineryEquipmentTransfer.beneficiary = "";
	}
	
}

//Show and Hide Element with Condition End

function viewTransferReport(parId){

	$http({
		method: 'POST',
		url: 'handlers/machinery-equipment-pars/machinery-equipment-transfers/reports/view-report.php',
		data: {id: parId}
	}).then(async function mySucces(response) {
		
		const container1 = document.createElement('div');
		const container2 = document.createElement('div');

		document.body.appendChild(container1);
		document.body.appendChild(container2);

		console.log(response.data.form_type);

		await Promise.all([
				ptrReport(response.data, container1),
				response.data.form_type == 'TRANSFERRED/REPAR'? parReport(response.data, container2) : Promise.resolve(),
				response.data.form_type == 'TRANSFER/REASSIGN ICS'? icsReport(response.data, container2) : Promise.resolve()
		]);

		document.body.removeChild(container1);
		document.body.removeChild(container2);
	
	async function ptrReport(data) {
			//FUNCTION TO FORMAT amount
		function getFormattedAmount(amount) {
			return amount.toLocaleString("en-US");
		};
			
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

		doc.text(202.3, 38.1, 'Fund Cluster: _____________ ','right');
		doc.line(12.7, 41, 202.3 , 41);
		doc.setFont('helvetica','normal','normal');	
		doc.text(14, 45, 'From Accountable Officer/Agency/Fund Cluster:');
		doc.text(14, 50, data.prev_accountable_officer.prev_accountable_officer);
		doc.text(14, 55, 'To Accountable Officer/Agency/Fund Cluster:');
		doc.text(14, 60, data.accountable_officer.accountable_officer);
		doc.line(12.7, 41, 12.7 , 62);
		doc.line(12.7, 62, 202.3 , 62);
		doc.line(155, 41, 155 , 62);
		doc.line(202.3, 41, 202.3 , 62);

		doc.text(156, 50, "PTR No.:");
		doc.text(201, 50, data.ptr_no,'right');

		doc.text(156, 60, "Date:");
		doc.text(201, 60, data.par_date,'right');

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

		switch(data.status)
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
		angular.forEach(data.par_machinery_equipment, function(equipmentList,key) {
		
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

		doc.text(43,lastRowCoord+7,data.note);

		//SIGNATORIES

		doc.rect(12.7,lastRowCoord+10,189.6,35);
		doc.text(62.265,lastRowCoord+15,"Approved",'center');
		doc.text(62.265,lastRowCoord+28,data.approved_by.signatory_name.toUpperCase(),'center');
		// doc.text(62.265,lastRowCoord+35,data.approved_by.signatory_name,'center');

		doc.text(119.80,lastRowCoord+15,"Released/Issued by:",'center');
		doc.text(119.80,lastRowCoord+28,data.signatory.signatory_name.toUpperCase(),'center');
		// doc.text(119.80,lastRowCoord+35,data.signatory.signatory_name,'center');

		doc.text(175.33,lastRowCoord+15,"Received by:",'center');
		doc.text(175.33,lastRowCoord+28,data.accountable_officer.accountable_officer.toUpperCase(),'center');
		// doc.text(175.33,lastRowCoord+35,data.accountable_officer.accountable_officer,'center');

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

	}
	
	async function parReport(data) {

		function getFormattedDate(date) {
			var dateForwarded = new Date(date);
			var options = {  year: 'numeric', month: 'long', day: 'numeric' };
		
			return dateForwarded.toLocaleDateString("en-US", options);
		
		};
		
		//FUNCTION TO FORMAT amount
		function getFormattedAmount(amount) {
			return amount.toLocaleString("en-US");
		};
		
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
		
		doc.text(202.37, 43.1, "PAR No.: " + data.par_no,'right');
		textWidth = doc.getTextWidth("PAR No.: " + data.par_no);
		doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);
	
		var rows = [];
		var cancelled_equipments;
		angular.forEach(data.par_machinery_equipment, function(pars_equipment,key) {
		
			var row = [];
			row.push('1');
			row.push('1');
			row.push(pars_equipment.machinery_equipment.description);
			row.push(pars_equipment.machinery_equipment.property_number);
			row.push(pars_equipment.machinery_equipment.acquisition_date);
			row.push(getFormattedAmount(pars_equipment.machinery_equipment.acquisition_cost));				
			rows.push(row);
	
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
		doc.text(data.accountable_officer.accountable_officer,61, startY_signatories + 16, 'center');
		doc.text(data.accountable_officer.position.position_description,61, startY_signatories + 26, 'center');
	
		doc.setFont('helvetica','normal');
		doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
		doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
		doc.text("Position/Office",61, startY_signatories + 30, 'center');
		doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
		doc.text("Date",61, startY_signatories + 40, 'center');			
	
		doc.setFont('helvetica','bold','bold');
		doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");
	
		doc.text(data.signatory.signatory_name,155.3, startY_signatories + 16, 'center');
		doc.text(data.signatory.position,155.3, startY_signatories + 26, 'center');
		
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
		
		doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
		
		var blob = doc.output('blob');
		window.open(URL.createObjectURL(blob));
	}

	async function icsReport(data) {

		function getFormattedDate(date) {
			var dateForwarded = new Date(date);
			var options = {  year: 'numeric', month: 'long', day: 'numeric' };
		
			return dateForwarded.toLocaleDateString("en-US", options);
		
		};
		
		//FUNCTION TO FORMAT amount
		function getFormattedAmount(amount) {
			return amount.toLocaleString("en-US");
		};
				
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
		textWidth = doc.getTextWidth('Provincial ');
		doc.line(22,44, 22 + textWidth + 2 , 44);
		
		doc.text(201, 43.1, "ICS No.: " + data.par_no,'right');
		textWidth = doc.getTextWidth("ICS No.: " + data.par_no);
		doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);
	
		var rows = [];
		angular.forEach(data.par_machinery_equipment, function(equipment,key) {
		
			var row = [];
			row.push('1');
			row.push('1');
			row.push(equipment.machinery_equipment.description);
			row.push(equipment.machinery_equipment.property_number);
			row.push(getFormattedDate(equipment.machinery_equipment.acquisition_date));
			row.push(equipment.machinery_equipment.acquisition_cost);
			rows.push(row);
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
	
		let foots = [
			[
				{
					content: 'Received by:', 
					colSpan: 3,
					rowsSpan: 1, 
					styles: { 
						halign: 'center',
						valign: 'middle' ,
						fontSize: number = 8,
						minCellHeight: number = 50
						
					}
				}, 
				{
					content: 'Issued by:', 
					colSpan: 3,
					rowsSpan: 1, 
					styles: { 
						halign: 'center',
						valign: 'middle' ,
						fontSize: number = 8,
						
					}
				}, 
			],
			[
				{
					content: 'Signature over Printed Name of End User', 
					colSpan: 3,
					rowsSpan: 1, 
					styles: { 
						halign: 'center',
						valign: 'middle' ,
						fontSize: number = 8,
						
					}
				}, 
				{
					content: 'Signature over Printed Name of Supply and/or Property Custodian', 
					colSpan: 3,
					rowsSpan: 1, 
					styles: { 
						halign: 'center',
						valign: 'middle' ,
						fontSize: number = 8,
						
					}
				}, 
			]
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
		var signatory_rows = 
			[
				{
					content: 'Received by:', 
	
				}, 
				{
					content: 'Received by:', 
	
				}, 
	
			];
	
		
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
		var AccountableOfficerSig=data.accountable_officer.accountable_officer;
		doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
		doc.text(data.accountable_officer.position.position_description,61, startY_signatories + 26, 'center');
	
		doc.setFont('helvetica','normal');
		doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
		doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
		doc.text("Position/Office",61, startY_signatories + 30, 'center');
		doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
		doc.text("Date",61, startY_signatories + 40, 'center');			
	
	
		doc.setFont('helvetica','bold','bold');
		doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");
		var issuedBySignatory=data.signatory.signatory_name;
		doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
		doc.text(data.signatory.position,155.3, startY_signatories + 26, 'center');
		
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
		
		doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
		
		var blob = doc.output('blob');
		window.open(URL.createObjectURL(blob));
		
	}
		
	}, function myError(response) {
		// error
	});
	
};
//VIEW PAR REPORT PDF
function viewICS(ICSid){
	$http({
		method: 'POST',
		url: 'handlers/report-PAR/viewPAR.php',
		data: {id: ICSid}

	}).then(function mySucces(response) {
		// scope.datas = response.data;
		
		printICS(response.data);
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

function printICS(scope) {

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
	textWidth = doc.getTextWidth('Provincial ');
	doc.line(22,44, 22 + textWidth + 2 , 44);
	
	doc.text(201, 43.1, "ICS No.: " + scope[0].par_no,'right');
	textWidth = doc.getTextWidth("ICS No.: " + scope[0].par_no);
	doc.line(202.37, 43.9, 220 - textWidth - 2, 43.9);

	var rows = [];
	angular.forEach(scope[0].equipment, function(equipment,key) {
	
		var row = [];
		row.push('1');
		row.push('1');
		row.push(equipment.description);
		row.push(equipment.property_number);
		row.push(getFormattedDate(equipment.acquisition_date));
		row.push(equipment.acquisition_cost);
		rows.push(row);
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

	let foots = [
		[
			{
				content: 'Received by:', 
				colSpan: 3,
				rowsSpan: 1, 
				styles: { 
					halign: 'center',
					valign: 'middle' ,
					fontSize: number = 8,
					minCellHeight: number = 50
					
				}
			}, 
			{
				content: 'Issued by:', 
				colSpan: 3,
				rowsSpan: 1, 
				styles: { 
					halign: 'center',
					valign: 'middle' ,
					fontSize: number = 8,
					
				}
			}, 
		],
		[
			{
				content: 'Signature over Printed Name of End User', 
				colSpan: 3,
				rowsSpan: 1, 
				styles: { 
					halign: 'center',
					valign: 'middle' ,
					fontSize: number = 8,
					
				}
			}, 
			{
				content: 'Signature over Printed Name of Supply and/or Property Custodian', 
				colSpan: 3,
				rowsSpan: 1, 
				styles: { 
					halign: 'center',
					valign: 'middle' ,
					fontSize: number = 8,
					
				}
			}, 
		]
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
	var signatory_rows = 
		[
			{
				content: 'Received by:', 

			}, 
			{
				content: 'Received by:', 

			}, 

		];

	
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
	var AccountableOfficerSig=scope[0].accountable_officer;
	doc.text(AccountableOfficerSig,61, startY_signatories + 16, 'center');
	doc.text(scope[0].position_description,61, startY_signatories + 26, 'center');

	doc.setFont('helvetica','normal');
	doc.text("Signature over Printed Name of End User",61, startY_signatories + 20, 'center');
	doc.line(12.75+25, startY_signatories+27, 70.26+12.75, startY_signatories+27,'FD');
	doc.text("Position/Office",61, startY_signatories + 30, 'center');
	doc.line(12.75+35, startY_signatories+37, 60.26+12.75, startY_signatories+37,'FD');
	doc.text("Date",61, startY_signatories + 40, 'center');			


	doc.setFont('helvetica','bold','bold');
	doc.text((margin_signatories/2) + 17.25, startY_signatories + 10, "Issued by: ");
	var issuedBySignatory=scope[0].PropCustodian[0].signatoryName;
	doc.text(issuedBySignatory,155.3, startY_signatories + 16, 'center');
	doc.text(scope[0].PropCustodian[0].position,155.3, startY_signatories + 26, 'center');
	
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
	
	doc.text(107.5, 274, 'Page '+doc.internal.getNumberOfPages()+' of '+pageCount,'center');
	
	var blob = doc.output('blob');
	window.open(URL.createObjectURL(blob));

};
// Form Start
self.machineryEquipmentReturn = function(scope,row) {

	if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add))
	return;

	scope.machineryEquipmentReturn = {};
	scope.machineryEquipmentReturn.id = 0;

	scope.showAddButton = false;

	mode(scope, row);
	
	$('#content').load('forms/ppe-return.html',function() {
		$timeout(function() { $compile($('#content')[0])(scope); },200);
	});

	if (row != null) {
		
		if (scope.$id > 2) scope = scope.$parent;

		scope.showAddButton = false;
		scope.showEditButton = true;
		
		$http({
			method: 'POST',
			url: 'handlers/machinery-equipment-pars/machinery-equipment-returns/view.php',
			data: {id: row.id}
		}).then(function mySucces(response) {
			
			scope.machineryEquipmentReturn = response.data;

			meDataReturn(scope,row.id);

			mode(scope, row);
			
		}, function myError(response) {
			
			// error
			
		});
		
	};

	accountableOfficer(scope);

};
// Form End

// Add Function Start
self.saveReturn = function(scope) {
	
	if (validate.form(scope,'machineryEquipmentReturn')){ 
		growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
		return;
	}

	if(scope.machineryEquipmentData.length == 0) {
		growl.show('alert alert-danger',{from: 'top', amount: 55},'Please add Equipment.');
		return;
	}

	var accountable_officer;
	var modalTitle;
	if(typeof scope.machineryEquipmentReturn.new_accountable_officer !== 'undefined'){
		accountable_officer = scope.machineryEquipmentReturn.new_accountable_officer.name;
		modalTitle = 'The equipment has been successfully returned to ';
	} else {
		accountable_officer = '';
		modalTitle = 'The equipment has been returned for repair ';
	};

	var spinner;
			spinner=document.querySelector("#spinner_form_submit");
			spinner.setAttribute("data-kt-indicator","on");

		$http({
			method: 'POST',
			url: 'handlers/machinery-equipment-pars/machinery-equipment-returns/save.php',
			data: {machineryEquipmentReturn: scope.machineryEquipmentReturn, machineryEquipmentData: scope.machineryEquipmentData}
		}).then(function mySuccess(response) {

			setTimeout(function() {
				spinner.removeAttribute("data-kt-indicator");
			}, 500);

			setTimeout(function() {

					scope.machineryEquipmentReturn.id = response.data;

					Swal.fire({
						title: modalTitle + accountable_officer,
						html: `Do you want to Print Report?`,
						icon: "success",
						showDenyButton: true,
						confirmButtonText: "No Thanks",
						denyButtonText: `Print Report`,
					}).then((result) => {
						/* Read more about isConfirmed, isDenied below */
						if (result.isConfirmed) {
							self.list(scope);
						} else if (result.isDenied) {
							self.viewReturnReport(scope, response.data);
							self.list(scope);
						}
					});
					
			}, 500);

		}, function myError(response) {
			
			// error
			
		});

}

//MODAL Start

// MODAL END

																								// CRUD Machinery Equipment PAR END
//Start / Api / Suggestions
function meDataReturn(scope,id){
	
	scope.currentPageAdd = scope.viewsAdd.currentPageAdd;
	scope.pageSizeAdd = 10;
	scope.maxSizeAdd = 5;

	scope.currentPageRemove = scope.viewsRemove.currentPageRemove;
	scope.pageSizeRemove = 10;
	scope.maxSizeRemove = 5;

	$http({
		method: 'POST',
		url: 'handlers/machinery-equipment-pars/machinery-equipment-returns/machinery-equipment-data.php',
		data: {par_id: id}
	}).then(function mySucces(response) {
		
		scope.machineryEquipment = response.data
		
	}, function myError(response) {
		 
	});
	
};

function accountableOfficer(scope) {

	$http({
		method: 'POST',
		url: 'api/suggestions/gso-employees.php',
	}).then(function mySuccess(response) {
		
		scope.accountableOfficer = angular.copy(response.data);

	}, function myError(response) {
		
		// error
		
	});				
	
};

//End / Api / Suggestions

//Others
// self.addFunctionReturn = function(scope,item) {

// let index = scope.return.findIndex(
// 	x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
// );

// scope.machineryEquipmentDataReturn.push(scope.return[index]);
// scope.return.splice(index, 1);

// }

// self.removeFunctionReturn = function(scope,item) {

// 	let index = scope.machineryEquipmentDataReturn.findIndex(
// 		x => x.property_number == item.property_number && x.article_id.name == item.article_id.name
// 		);

// 	scope.return.push(scope.machineryEquipmentDataReturn[index]);
// 	scope.machineryEquipmentDataReturn.splice(index, 1);

// }
//------

//Show and Hide Element with Condition Start

self.checkPurposeReturn = function(scope) {

	if(scope.machineryEquipmentReturn.purpose == "REPAIR") {
		scope.disabledReturnedToGSO = true;
	} else {
		scope.disabledReturnedToGSO = false;
	}

}

//Show and Hide Element with Condition End

self.viewReturnReport = function(scope, row){

	$http({
		method: 'POST',
		url: 'handlers/machinery-equipment-returns/reports/return-report.php',
		data: {id: row}

	}).then(function mySucces(response) {
		scope.datas = response.data;
		printReturn(scope);
	}, function myError(response) {
		// error
	});

};

function getFormattedDate(date) {
	var dateForwarded = new Date(date);
	var options = {  year: 'numeric', month: 'long', day: 'numeric' };

	return dateForwarded.toLocaleDateString("en-US", options);

	};

	function getFormattedAmount(amount) {
		return amount.toLocaleString("en-US");
	};
	
	function printReturn(scope) {

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

		// doc.text(9+5, startY_signatories + 4, "I HEREBY CERTIFY that the items/articles described above");
		// // Create a new line of text below the existing text
		// var newX = 9 + 5; // You can adjust the X coordinate as needed
		// var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
		// doc.text(newX, newY, "returned to the");
		// // Create a new line of text below the existing text
		// var newX = 18.5 + 18; // You can adjust the X coordinate as needed
		// var newY = startY_signatories + 7.5; // Increase the Y coordinate to move to the next line
		// doc.setFont('helvetica', 'bold');
		// doc.text(newX, newY, "Provincial General Services Office");
		// doc.line(36.4, startY_signatories+8, 20 + textWidth + 24, startY_signatories+8);

		// doc.setFont('helvetica', 'normal');
		// var newX = 9 + 5; // You can adjust the X coordinate as needed
		// var newY = startY_signatories + 11; // Increase the Y coordinate to move to the next line
		// doc.text(newX, newY, "this "+ scope.datas.current_date +" day of "+ scope.datas.current_month +" "+ scope.datas.current_year +".");

		// doc.setFont('helvetica', 'bold');
		// doc.text(scope.datas.office.office_head_name.office_head_name,61, startY_signatories + 26, 'center');

		// doc.setFont('helvetica', 'normal');
		// doc.line(12.75+21, startY_signatories+27, 70.26+17, startY_signatories+27,'FD');
		// doc.text(scope.datas.office.office_head_name.position_name,61, startY_signatories + 30, 'center');

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

};
	
	return new app();
	
});