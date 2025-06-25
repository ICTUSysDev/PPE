var app = angular.module('reportPTR',['account-module','app-module']);

app.controller('reportPTRCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);
	app.list($scope);

	$scope.module = {
		id: 'reportPropertyTransferReport',
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

app.filter('pagination', function() {
	return function(input, currentPageML, pageSizeML) {
		if(angular.isArray(input)) {
			var start = (currentPageML-1)*pageSizeML;
			var end = currentPageML*pageSizeML;
			return input.slice(start, end);
		}
	};
});

app.filter('pagination', function() {
	return function(input, currentPageDL, pageSizeDL) {
		if(angular.isArray(input)) {
			var start = (currentPageDL-1)*pageSizeDL;
			var end = currentPageDL*pageSizeDL;
			return input.slice(start, end);
		}
	};
});