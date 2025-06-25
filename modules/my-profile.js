angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify) {
	
	function app() {

		var self = this;

		self.data = function(scope) {

			scope.myProfile = [];

			scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
				add: {btn: false, label: 'New'},
				edit: {btn: false, label: 'Edit'},
				icon: {label: 'fa-eye'}
			};

			scope.notify = notify;

			scope.notificationStartStop = window.setInterval(function() {
			scope.notificationActive = document.getElementsByClassName('btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative active');

				if(scope.notificationActive.length == 0) {
					
					notify.notifications(scope);
				} else {
					clearInterval(scope.stopNotification);
				}
				
			}, 2000);

			self.myProfileOverview(scope);
			self.myProfileSettings(scope);
			self.myProfileActivity(scope);

			scope.controls.ok.btn = true;
			scope.disableUpdateBtn = true;

		}

		self.myProfileOverview = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/my-profile/overview.php',
			}).then(function mySucces(response) {
				
				scope.profileOverview = response.data;

			},function myError(response) {

			});
		}

		self.myProfileSettings = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/my-profile/settings.php',
			}).then(function mySucces(response) {
				
				scope.profileSettings = angular.copy(response.data, scope.user);

				offices(scope);
				positions(scope);

			},function myError(response) {

			});
		}

		self.myProfileActivity = function(scope) {

			$http({
				method: 'POST',
				url: 'handlers/my-profile/activity.php',
			}).then(function mySucces(response) {
				
				scope.profileActivities = angular.copy(response.data, scope.user);

			},function myError(response) {

			});
		}

		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
			if(scope.controls.edit.label=="Edit") {
				
				scope.controls.edit.label="Disable";
				
			} else{
				
				scope.controls.edit.label="Edit";
				
			};

		};

		//Start / Api / Suggestions
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

		function positions(scope) {
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/positions.php'
			}).then(function mySuccess(response) {
				
				scope.positions = angular.copy(response.data);
				
			}, function myError(response) {
				
				// error
				
			});				
			
		};

		self.updateDetails = function(scope) {

			if (validate.form(scope,'profileSettings')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			Swal.fire({
				title: "Do you want to save the changes?",
				showDenyButton: true,
				showCancelButton: true,
				confirmButtonText: "Save",
				denyButtonText: `Don't save`
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					isConfirm();
					isConfirmSettings(scope);
				} else if (result.isDenied) {
					Swal.fire("Changes are not saved", "", "info");
				}
			});

			function isConfirmSettings() {
				
			$http({
				method: 'POST',
				url: 'handlers/my-profile/update-settings.php',
				data: {profileSettings: scope.profileSettings}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.profileSettings);

				Swal.fire({
					title: "Profile Details Updated!",
					icon: "success",
					showDenyButton: false,
					showCancelButton: false,
					confirmButtonText: "Ok",
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						window.location.reload();
					}
				});

			}, function myError(response) {
				
				// error
				
			});

			}

		}

		function isConfirm(scope) {

			var fileInput = document.getElementById('profilePicture');

			if (fileInput.files.length > 0) {
        
        var selectedFile = fileInput.files[0];
        var formData = new FormData();

        formData.append('file', selectedFile);

				$.ajax({
					url: 'handlers/my-profile/upload-files.php',
					type: 'POST',
					data: formData,
					dataType: 'json',
					processData: false,
					contentType: false,
					success: function(response) {
	
					},
					error: function(error) {
	
					}
				});
				
			} else {

			}
			
		}

		self.checkUP = function(scope) {

			if (validate.form(scope,'usernameUpdate')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			$http({
				method: 'POST',
				url: 'handlers/my-profile/check-username.php',
				data: {usernameUpdate: scope.usernameUpdate}
			}).then(function mySucces(response) {
				
				scope.checkUP = response.data;

				if(scope.checkUP.username_match !=  true) {
					scope.showUsernameLabel = false;
					if(scope.checkUP.password_match != true) {
						scope.showPasswordLabel = true;
						scope.formHolder.usernameUpdate.password.$invalid = true;
					} else {
						scope.showPasswordLabel = false;
						updateUsername(scope);
					}
				} else {
					scope.showUsernameLabel = true;
					scope.formHolder.usernameUpdate.username.$invalid = true;
				}

			}, function myError(response) {
				
				// error
				
			});

		}

		function updateUsername(scope) {

			$http({
				method: 'POST',
				url: 'handlers/my-profile/update-username.php',
				data: {usernameUpdate: scope.usernameUpdate}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.usernameUpdate);

				Swal.fire({
					title: "Username Updated!",
					icon: "success",
					showDenyButton: false,
					showCancelButton: false,
					confirmButtonText: "Ok",
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						window.location.reload();
					}
				});

			}, function myError(response) {
				
				// error
				
			});

		}

		self.updatePassword = function(scope) {

			if (validate.form(scope,'updatePassword')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Some fields are required.');
				return;
			}

			$http({
				method: 'POST',
				url: 'handlers/my-profile/update-password.php',
				data: {updatePassword: scope.updatePassword}
			}).then(function mySucces(response) {

				scope.showLabel = response.data;
				
				if(scope.showLabel.check_password == false) {
					scope.showInvalidPassword = true;
					scope.formHolder.updatePassword.currentpassword.$invalid = true;
				} else {
					Swal.fire({
						title: "Password Updated!",
						icon: "success",
						showDenyButton: false,
						showCancelButton: false,
						confirmButtonText: "Ok",
					}).then((result) => {
						/* Read more about isConfirmed, isDenied below */
						if (result.isConfirmed) {
							angular.copy(response.data);
							window.location.href = "log-in.php";
						}
					});
					
				}

			}, function myError(response) {
				
				// error
				
			});

		}

		self.checkPasswordMatch = function(scope) {

			if(scope.updatePassword.newPassword != scope.updatePassword.password) {
				scope.showPasswordMatch = true;
				scope.formHolder.updatePassword.newpassword.$invalid = true;
				scope.disableUpdateBtn = true;
			} else {
				scope.showPasswordMatch = false;
				scope.disableUpdateBtn = false;
			}

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