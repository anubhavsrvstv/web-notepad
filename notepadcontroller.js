var app = angular.module('myApp', []);
app.controller('notepadCtrl', function($scope,$http, $window) {

  $scope.getData = function() {
    // console.log()
    $http({
        method : "GET",
          url : 'http://localhost:5555/getdata'
      }).then(function mySuccess(response) {
        $scope.data = response.data.data;
        console.log(response);
        

      }, function myError(err) {
          console.log(err);
        // $scope.myWelcome = response.statusText;
      });
  };


  $scope.dataUpdate = function () {
    console.log("response");
    // $http({
    //     method : "Update",
    //       url : 'http://localhost:5555/updatedata'
    //   }).then(function mySuccess(response) {
    //     $scope.data = response.data.data;
    //     console.log(response);
  
    //   }, function myError(err) {
    //       console.log(err);
    //     // $scope.myWelcome = response.statusText;
    //   });
  };
  
  
  $scope.removeData = function (id) {
    console.log("id",id);
    $http({
        method : "POST",
          url : 'http://localhost:5555/deleteData',
          headers: { 'id':id,'Content-Type': 'application/json', 'Cache-Control': 'no-cache'}
      }).then(function mySuccess(response) {
        $scope.data = response.data.data;
        console.log(response);
        $window.location.reload();
        
  
      }, function myError(err) {
          console.log(err)
        // $scope.myWelcome = response.statusText;
      
  
    
  
        
      });
  };




});


