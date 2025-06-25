var app = angular.module('reportPPEperPersonnel',['account-module','app-module']);

app.controller('reportPPEperPersonnelCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);
	app.list($scope);

	$scope.module = {
		id: 'reportSummaryPPEperPersonnel',
		privileges: {
			show: 1,
			add: 2,
			delete: 3,
		}
	};
	
});

app.filter('pagination', function() {
	return function(input, currentPage, pageSize) {
		if(angular.isArray(input)) {
			var start = (currentPage-1)*pageSize;
			var end = currentPage*pageSize;
			return input.slice(start, end);
		}
	};
});