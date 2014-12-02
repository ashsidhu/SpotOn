'use strict';

angular.module('spotOnApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    // instantiate and populate businesss
    $scope.businesss = [];

    $http.get('/api/businesss').success(function(businesss) {
      $scope.businesss = businesss;
      console.log(businesss)
    });

    $scope.selectBusiness = function(id){
      $scope.selectedBusiness = ($scope.selectedBusiness===id) ? null : id;
      $scope.getAppointmentsForBusiness();
    };
    $scope.selectedBusiness = null;


    // instantiate and populate appointments
    $scope.appointments = [];

    $scope.getAppointmentsForBusiness = function () {
      if ($scope.selectedBusiness) {
        $http.get('/api/appointments/?_businessId=' + $scope.selectedBusiness).success(function(appointments) {
          $scope.appointments = appointments;
        });
      } else {
        $scope.appointments = [];
      }
    };


    // date functionality
    $scope.today = function () {
      $scope.newAppointmentTimestamp = new Date();
    };
    $scope.today();

    $scope.minDate = new Date();

    $scope.setNextHour = function() {
      $scope.newAppointmentTimestamp.setHours($scope.newAppointmentTimestamp.getHours()+1);
      $scope.newAppointmentTimestamp.setMinutes(0);
    };
    $scope.setNextHour();

    $scope.addAppointment = function() {
      if(!$scope.newAppointmentTimestamp) {
        return;
      }
      $http.post('/api/appointments', { 
        dueDate: $scope.newAppointmentTimestamp,
        _businessId: $scope.selectedBusiness,
        _userId: Auth.getCurrentUser()._id
      });
    };

    $scope.deleteAppointment = function(appointment) {
      $http.delete('/api/appointments/' + appointment._id);
    };

  });
