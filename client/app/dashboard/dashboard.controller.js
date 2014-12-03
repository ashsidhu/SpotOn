'use strict';

angular.module('spotOnApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.userAppointments = [];

    $http.get('/api/appointments/?_userId=' + Auth.getCurrentUser()._id).success(function(appointments) {
      $scope.userAppointments = appointments;
    });

    // instantiate and populate businesss
    $scope.businesss = [];
    $scope.businessNames = {};

    $http.get('/api/businesss').success(function(businesss) {
      $scope.businesss = businesss;
      businesss.forEach(function(business){
        $scope.businessNames[business._id] = business.name;
      })
    });

    $scope.selectBusiness = function(id){
      $scope.selectedBusiness = ($scope.selectedBusiness===id) ? null : id;
      $scope.getAppointmentsForBusiness();
    };
    $scope.selectedBusiness = null;


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

    $scope.bookedTimeSlots = [];
    $scope.populateBookedTimeSlots = function() {
      $scope.bookedTimeSlots = $scope.selectedBusinessAppointments.filter(function(appointment){
        return ((new Date(appointment.dueDate)).toDateString() === $scope.newAppointmentTimestamp.toDateString());
      }).map(function(appointment) {
        return (new Date(appointment.dueDate)).getHours();
      });
    }

    $scope.timeSlots = [9, 10, 11, 12, 13, 14, 15, 16];

    $scope.selectedTimeSlot = null;

    $scope.setAppointmentTime = function (timeSlot) {
      if (timeSlot !== $scope.selectedTimeSlot && ($scope.bookedTimeSlots.indexOf(timeSlot) === -1)) {
        $scope.newAppointmentTimestamp.setHours(timeSlot);
        $scope.selectedTimeSlot = timeSlot;
      } else {
        $scope.selectedTimeSlot = null;
      }
    }

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
      }).success(function(appointment) {
        $scope.userAppointments.push(appointment);
        $scope.selectedBusinessAppointments.push(appointment);
        $scope.populateBookedTimeSlots();
        $scope.selectedTimeSlot = null;
      });
    };

    $scope.deleteAppointment = function(appointment) {
      $http.delete('/api/appointments/' + appointment._id);
    };

  });
