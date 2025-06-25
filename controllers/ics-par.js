var app = angular.module('icsPar',['account-module','app-module']);

app.controller('icsParCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);
	app.list($scope);

	$scope.module = {
		id: 'ics_par',
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

app.filter('paginationAdd', function() {
	return function(input, currentPageAdd, pageSizeAdd) {
		if(angular.isArray(input)) {
			var start = (currentPageAdd-1)*pageSizeAdd;
			var end = currentPageAdd*pageSizeAdd;
			return input.slice(start, end);
		}
	};
});

app.filter('paginationRemove', function() {
	return function(input, currentPageRemove, pageSizeRemove) {
		if(angular.isArray(input)) {
			var start = (currentPageRemove-1)*pageSizeRemove;
			var end = currentPageRemove*pageSizeRemove;
			return input.slice(start, end);
		}
	};
});