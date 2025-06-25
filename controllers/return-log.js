var app = angular.module('returnLog',['account-module','app-module']);

app.controller('returnLogCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);
	app.list($scope);

	$scope.module = {
		id: 'return_log',
		privileges: {
			show: 1,
			add: 2,
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
	return function(input, currentPageDL, pageSizeDL) {
		if(angular.isArray(input)) {
			var start = (currentPageDL-1)*pageSizeDL;
			var end = currentPageDL*pageSizeDL;
			return input.slice(start, end);
		}
	};
});