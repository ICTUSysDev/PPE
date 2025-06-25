var app = angular.module('buildingOtherStructure',['account-module','app-module']);

app.controller('buildingOtherStructureCtrl',function($scope,app) {
	
	$scope.app = app;
	
	app.data($scope);
	app.list($scope);

	$scope.module = {
		id: 'baos_physical_count',
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
	return function(input, currentPage1, pageSize1) {
		if(angular.isArray(input)) {
			var start = (currentPage1-1)*pageSize1;
			var end = currentPage1*pageSize1;
			return input.slice(start, end);
		}
	};
});