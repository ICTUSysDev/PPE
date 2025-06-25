angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator', 'module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify, access) {
	
	function app() {

    var self = this;

		self.data = function(scope) {

			scope.headerName = "Transfers";

			// for Validation
			scope.formHolder = {};

			// List
			scope.transferLogs = [];

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

		};

		// CRUD TRANSFER Start
		
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
					url: 'handlers/transfer-logs/list.php',
					data: scope.transferLogs
				}).then(function mySucces(response) {
					
					scope.transferLogs = angular.copy(response.data);
					
				}, function myError(response) {

				});

				$('#content').load('lists/transfer-logs.html', function() {
					$timeout(function() { $compile($('#content')[0])(scope); },100);								
				});

		};

		//MODAL Start
		self.viewTransferLog = function(scope, row) {
			
			title = 'Notification Info';
			var dataThemeMode = localStorage.getItem('data-theme-mode');

			$timeout(function() { 

				if (scope.$id > 2) scope = scope.$parent;
				
					$http({
								method: 'POST',
								url: 'handlers/transfer-logs/view.php',
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