'use strict';

angular.module('spotOnApp')
  .controller('CustomersCtrl', function ($scope, $http, Auth) {
    // populate businesses
    $scope.userBusinesses = [];

    $http.get('/api/businesss/?_ownerId=' + Auth.getCurrentUser()._id).success(function(businesss) {
      $scope.userBusinesses = businesss;
    });

    // select business
    $scope.selectBusiness = function (id) {
      $scope.selectedBusiness = ($scope.selectedBusiness===id) ? null : id;
      $scope.getAppointmentsForBusiness();
    };

    $scope.selectedBusiness = null;

    // select date 
    $scope.today = function () {
      $scope.selectedDate = new Date();
    };
    $scope.today();
    $scope.minDate = new Date();

    // instantiate and populate appointments
    $scope.selectedBusinessAppointments = [];

    $scope.getAppointmentsForBusiness = function () {
      if ($scope.selectedBusiness) {
        $http.get('/api/appointments/?_businessId=' + $scope.selectedBusiness).success(function(appointments) {
          $scope.selectedBusinessAppointments = appointments;
          $scope.populateBookedTimeSlots();
        });
      } else {
        $scope.selectedBusinessAppointments = [];
      }
    };

    $scope.timeSlots = [9, 10, 11, 12, 13, 14, 15, 16];
    $scope.selectedTimeSlot = null;
    $scope.bookedTimeSlots = [];

    $scope.populateBookedTimeSlots = function() {
      $scope.bookedTimeSlots = $scope.selectedBusinessAppointments.filter(function(appointment){
        return ((new Date(appointment.dueDate)).toDateString() === $scope.selectedDate.toDateString());
      }).map(function(appointment) {
        return (new Date(appointment.dueDate)).getHours();
      });
    }

  });
