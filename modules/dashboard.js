angular.module('app-module',['my-pagination','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','notify','form-validator']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,validate,bui,myPagination,notify) {
	
	function app() {

		var self = this;

		self.data = function(scope) {

			// for Pagination
			scope.views = {};
			scope.views.currentPage = 1;
			scope.views.list = true;

			scope.dashboard = [];

			scope.notify = notify;

			scope.notificationStartStop = window.setInterval(function() {
			scope.notificationActive = document.getElementsByClassName('btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative active');

				if(scope.notificationActive.length == 0) {
					
					notify.notifications(scope);
				} else {
					clearInterval(scope.stopNotification);
				}
				
			}, 2000);

			$timeout(function() { dashboard(scope); },500);

			scope.filterChart = {
				start: new Date().getFullYear(),
			}

			self.dashboard(scope);

		}


		self.dashboard = function(scope) {
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			var currentYear = new Date().getFullYear();

			if(scope.filterChart.start == currentYear) {
				scope.chartTitle = "On Going Inventory";
			} else if (scope.filterChart.start <= currentYear) {
				scope.chartTitle = "Past-Year's inventory";
			} else if(scope.filterChart.start >= currentYear) {
				scope.chartTitle = "Next Year's Inventory";
			}

			$http({
				method: 'POST',
				url: 'handlers/dashboards/dashboard.php',
				data: scope.filterChart
			}).then(function mySucces(response) {
				
				scope.dashboard = response.data;

				$(function () {
			
					// chart colors
					var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];
	
					/* bar chart */
					var chBar = document.getElementById("chBar");
					if (chBar) {
						new Chart(chBar, {
						type: 'bar',
						data: {
							labels: ["Building and Other Structure", "Furniture, Books, and Fixtures/Machinery and Equipment", "Infrastructure Assets", "Land and Land Improvements"],
							datasets: [
								{
									label: 'Total Number of PPE',
									data: [scope.dashboard.sum_physical_inventory.total_building, scope.dashboard.sum_total_m_f, scope.dashboard.sum_physical_inventory.total_infrastructure, scope.dashboard.sum_physical_inventory.total_land],
									backgroundColor: colors[0]
								},
								{
									label: 'Total Inventoried',
									data: [scope.dashboard.total_building_inventory.total_building_inventory, scope.dashboard.total_equipment_inventory.total_equipment_inventory, scope.dashboard.total_infrastructure_inventory.total_infrastructure_inventory, scope.dashboard.total_land_inventory.total_land_inventory],
									backgroundColor: colors[1]
								}
							]
						},
						options: {
							legend: {
								display: true
							},
							scales: {
								xAxes: [{
									barPercentage: 0.4,
									categoryPercentage: 0.5
								}]
							}
						}
						});
					}
	
				});

			},function myError(response) {
				
				 bui.hide();
				
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