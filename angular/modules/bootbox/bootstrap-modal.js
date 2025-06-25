angular.module('bootstrap-modal',[]).service('bootstrapModal', function($compile,$timeout) {

	this.confirm = function(scope,title,content,onOk,onCancel) {
		
		var dialog = bootbox.confirm({
			title: title,
			message: content,
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger move-right'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					onOk(scope);
				} else {
					onCancel();
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});	
		
	};

	this.confirmDelete = function(scope,title,content,onOk,onCancel) {
		
		var dialog = Swal.fire({
			text:"Are you sure you want to remove this Data?",
			icon: 'warning',
			showCancelButton: true,
			buttonsStyling:!1,
			confirmButtonText:"Yes, delete!",
			cancelButtonText:"No, cancel",
			customClass:{
				confirmButton:"btn fw-bold btn-danger",
				cancelButton:"btn fw-bold btn-active-light-primary"
			},
			}).then((result) => {
				if (result.value) {
					onOk(scope);
					Swal.fire({
						text:"Delete Successfully!",
						icon:"success",
						showConfirmButton: false,
						timer: 1000
					})
				}
			});
		
		// dialog.init(function() {
		// 	$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		// });	
		
	};

	this.approveUser = function(scope,title,content,onOk,onCancel) {
		
		Swal.fire({
			title: "Activate this account?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Activate"
		}).then((result) => {
			if (result.isConfirmed) {
				onOk(scope);
				Swal.fire({
					title: "Deleted!",
					text: "Your file has been deleted.",
					icon: "success"
				});
			}
		});
		
	};

	this.confirmSave = function(scope,title,content,onOk,onCancel) {

		var spinner;
		spinner=document.querySelector("#spinner_form_submit");
		spinner.setAttribute("data-kt-indicator","on");

		var dialog = Swal.fire({
			text:"Do you want to submit this data?",
			icon: 'info',
			showCancelButton: true,
			buttonsStyling:!1,
			confirmButtonText:"Yes, Submit!",
			cancelButtonText:"No, cancel",
			customClass:{
				confirmButton:"btn fw-bold btn-primary",
				cancelButton:"btn fw-bold btn-active-light-primary"
			},
			}).then((result) => {
				if (result.value) {
					onOk(scope);
					Swal.fire({
						text:"Save Successfully!",
						icon:"success",
						showConfirmButton: false,
						timer: 1000
					})
					spinner.removeAttribute("data-kt-indicator","on");
				} else {
					spinner.removeAttribute("data-kt-indicator","on");
				}
			});
		
	};

	this.confirmUpdate = function(scope,title,content,onOk,onCancel) {

		var spinner;
		spinner=document.querySelector("#spinner_form_submit");
		spinner.setAttribute("data-kt-indicator","on");

		var dialog = Swal.fire({
			text:"Do you want to save changes?",
			icon: 'info',
			showCancelButton: true,
			buttonsStyling:!1,
			confirmButtonText:"Yes, Submit!",
			cancelButtonText:"No, cancel",
			customClass:{
				confirmButton:"btn fw-bold btn-primary",
				cancelButton:"btn fw-bold btn-active-light-primary"
			},
			}).then((result) => {
				if (result.value) {
					onOk(scope);
					Swal.fire({
						text:"Updated Successfully!",
						icon:"success",
						showConfirmButton: false,
						timer: 1000
					})
					spinner.removeAttribute("data-kt-indicator","on");
				} else {
					spinner.removeAttribute("data-kt-indicator","on");
				}
			});
		
	};

	this.confirmUpload = function(scope,title,content,onOk,onCancel) {

		var spinner;
		spinner=document.querySelector("#uploadFile");
		spinner.setAttribute("data-kt-indicator","on");
		
		var dialog = Swal.fire({
			text:"Do you want to upload these files?",
			icon: 'info',
			showCancelButton: true,
			buttonsStyling:!1,
			confirmButtonText:"Yes, Upload!",
			cancelButtonText:"No, cancel",
			customClass:{
				confirmButton:"btn fw-bold btn-primary",
				cancelButton:"btn fw-bold btn-active-light-primary"
			},
			}).then((result) => {
				if (result.value) {
					onOk(scope);
					Swal.fire({
						text:"Uploaded Successfully!",
						icon:"success",
						showConfirmButton: false,
						timer: 1000
					})
					spinner.removeAttribute("data-kt-indicator","on");
				} else {
					spinner.removeAttribute("data-kt-indicator","on");
				}
			});
		
	};

	this.successAlert = function(scope,title,content,onOk,onCancel) {

		var dialog = Swal.fire({
			text:"Form has been successfully submitted!",
			icon:"success",buttonsStyling:!1,
			confirmButtonText:"Ok, got it!",
			customClass:{
				confirmButton:"btn btn-primary"
			}
		}).then((result) => {
			if (result.value) {
				onOk(scope);
			}
		});
		
		// dialog.init(function() {
		// 	$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		// });	
		
	};
	
	this.notify = function(scope,content,onOk) {

		var dialog = bootbox.alert({
			title: 'Notification',
			message: content,
			callback: function () {
				onOk();
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Save',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content, function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			// $timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box2 = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'hide btn-danger'
				},
				confirm: {
					label: 'Close',
					className: 'btn-danger'
				}				
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			// $('.modal-content').css({"width": "20%","left": "-65%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 1000);
		});

	};
	
	this.box3 = function(scope,title,content,onOk,w='230',h='950') {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}				
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "height": h+"px", "left": "-"+lp+"%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 1000);
		});

	};
	
	this.box4 = function(scope,title,content,load,onOk,w='auto') {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}				
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
				// load();
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});

	};
	
	this.box5 = function(scope,title,content,load,onOk) {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}				
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
				load();
			});
		});

	};

	this.box6 = function(scope,title,content,onOk,onCancel) {
		
		var dialog = bootbox.confirm({
			title: title,
			message: content,
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Go to List',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					onOk(scope);
				} else {
					onCancel();
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			// $('.modal-content').css({"width": "20%","left": "-65%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 1000);
		});
		
	};

	this.box7 = function(scope,title,content,onOk,w='250') {

		console.log(scope)
	
		var dialog = bootbox.dialog({
			title: title,
			message: 'Loading...',
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box8 = function(scope,title,content,onOk,w='150') {
	
		var dialog = bootbox.dialog({
			title: title,
			message: 'Loading content...',
		});

		
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};



	this.box9 = function(scope,title,content,onOk,w='150') {
		
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				confirm: {
					label: 'Ok',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result) {
					
					return onOk(scope);
					
				}else{
					// console.log(result);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
		
	};

	this.customBox1 = function(scope,title,content,onOk,w='150') {
		// console.log(scope.mep.id);
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				confirm: {
					label: 'Print',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});

		
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
		
	};

	
});