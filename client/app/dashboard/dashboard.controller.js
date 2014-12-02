'use strict';

angular.module('spotOnApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.appointments = [];

    $http.get('/api/appointments').success(function(appointments) {
      $scope.appointments = appointments;
    });

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
      $http.post('/api/appointments', { dueDate: $scope.newAppointmentTimestamp });
    };

    $scope.deleteAppointment = function(appointment) {
      $http.delete('/api/appointments/' + appointment._id);
    };

  });
