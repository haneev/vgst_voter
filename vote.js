angular.module('project',[]).controller('Vote', function ($scope) {
	
	$scope.options = [];
	$scope.option = {};
	$scope.hide = {};
	$scope.title = '';
	$scope.validOptions = 1;
	$scope.start = false;
	$scope.blanco = 0;
	$scope.threshold = 0;
	
	/** Options management */
	$scope.saveOption = function () {
		$scope.options.push({
			name : $scope.option.name,
			count : 0
		});
		$scope.option = {};
	};
	$scope.resetCount = function () {
		angular.forEach($scope.options, function (o) {
			o.count = 0;
		});
		$scope.blanco = 0;
		$scope.threshold = 0;
	};
	$scope.removeOption = function (opt) {
		$scope.options = _.filter($scope.options, function (a) {
			return a != opt;
		});
	};

	/* Vote */
	$scope.vote = function (opt) {
		opt.count++;
	};
	
	$scope.addBlanco = function () {
		$scope.blanco++;
	};
	
	$scope.wh = function (opt) {
	
		var height = 0;
		var tot = 0;
		var max = 0;
		angular.forEach($scope.options, function (a) {
			tot += a.count;
			
			if(a.count > max) 
				max = a.count;
		});
	
		height = (opt.count / (max+3)) * 400;
	
		return {
			width : (90 / $scope.options.length) + '%',
			height: 20 + height + 'px',
			left: (5 + $scope.options.indexOf(opt) * (90 / $scope.options.length)) + '%'
		};
	
	};
	
	$scope.voteDiv = function () {
		
		var height = 0;
		var tot = 0;
		var max = 0;
		angular.forEach($scope.options, function (a) {
			tot += a.count;
			
			if(a.count > max) 
				max = a.count;
		});
		
		$scope.threshold = Math.round((tot + 1) / (2 * $scope.validOptions),0);
		
		return {
			bottom : 30 + ($scope.threshold / (max+3) * 400) + 'px'
		};
	};
	
});