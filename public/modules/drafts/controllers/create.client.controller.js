'use strict';

angular.module('drafts').controller('CreateController', ['$scope', '$http', '$location', 'Authentication', 'Drafts',
	function($scope, $http, $location, Authentication, Drafts) {
	    $scope.today = function() {
                var d = new Date(); 
                d.setDate(d.getDate() + 1);
	        $scope.draftDetails =  {dt : d, tt : d };
   	    };
	    $scope.today();

	    $scope.disabled = function(date, mode) {
	        return false; 
	    };

	    $scope.toggleMin = function() {
                var minDate = null; 
                if ($scope.minDate) 
                    minDate = null; 
                else { 
                    minDate = new Date(); 
                    minDate.setDate(minDate.getDate() + 1); 
                }
	        $scope.minDate = minDate;
	    };
	    $scope.toggleMin();
    	    $scope.open = function($event) {
	        $event.preventDefault();
   	        $event.stopPropagation();
	        $scope.opened = true;
	    };
	    $scope.dateOptions = {
                formatYear: 'yy',
	        startingDay: 1
	    };

	    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	    $scope.format = $scope.formats[0]; 
	    $scope.authentication = Authentication; 
            if (!$scope.authentication.user) 
                $location.path('signin');

            // create a draft, ship them to the draft page 
            $scope.create = function() {
                $http.post('/draft/create', $scope.draftDetails).success(function(response) { 
                   console.log(response);  
                }).error(function(response) { 
                    $scope.error = response.message; 
                }); 
            };
      } 
]);  
