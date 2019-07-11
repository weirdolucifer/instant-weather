// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    
});

// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "";
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
    $scope.submit = function() {
        $location.path("/forecast");
    };
    
}]);



weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 40;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ appid: 'c2b27bd8eadd3cf7f65bff6f4b61f2eb' , q: $scope.city, cnt: $scope.days  });
    
    $scope.weatherAPI2 = $resource("http://api.openweathermap.org/data/2.5/weather", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult2 = $scope.weatherAPI2.get({ appid: 'c2b27bd8eadd3cf7f65bff6f4b61f2eb' , q: $scope.city });
    $scope.convertToFahrenheit = function(degK) {
        
        return Math.round((1.8 * (degK - 273)) + 32);
        
    }
    
    
    $scope.convertToCelcius = function(degK) {
        
        return Math.round(degK - 273);
        
    }
    $scope.convertTime = function(time) { 
      
        $scope.t = new Date(time*1000);
        return  $scope.t.toString().slice(16,24);
        
    };
    $scope.convertCurrentDate = function(dt){
        $scope.cd = new Date(dt*1000);
        return  $scope.cd.toString().slice(0,15);
    };
    
    $scope.convertDate = function(dt){
        $scope.d = new Date(dt*1000);
        return  $scope.d.toString().slice(0,15);
    };
    
    
    // for finding the dates
    
     $scope.needdate = function(offset){

          $scope.today  = new Date(),
          $scope.year   = $scope.today.getFullYear(),
          $scope.month  = $scope.today.getMonth(),
          $scope.date   = $scope.today.getDate();
          $scope.nd     = new Date($scope.year, $scope.month, $scope.date + offset ) ;
          return  $scope.nd.toString().slice(0,15);
     };
      
   
    
}]);
