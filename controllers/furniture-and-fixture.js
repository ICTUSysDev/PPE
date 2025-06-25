var app = angular.module('furnitureAndFixture',['account-module','app-module']);

app.controller('furnitureAndFixtureCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);
	app.list($scope);

	$scope.module = {
		id: 'furniture_and_fixture',
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

app.filter('paginationSE', function() {
	return function(input, currentPageSE, pageSizeSE) {
		if(angular.isArray(input)) {
			var start = (currentPageSE-1)*pageSizeSE;
			var end = currentPageSE*pageSizeSE;
			return input.slice(start, end);
		}
	};
});