var app = angular.module('myShoppingCartProject',[]);
app.controller('myController', function($scope, $http) {
    $scope.data = [];
    var request = $http.get('https://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js');    
    request.success(function(data) {
        $scope.data = data;
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
});