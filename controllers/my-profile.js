var app = angular.module('myProfile',['account-module','app-module']);

app.controller('myProfileCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);

	$scope.module = {
		id: 'myProfile',
		privileges: {
			show: 1,
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