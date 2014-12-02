'use strict';

angular.module('spotOnApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customers', {
        url: '/customers',
        templateUrl: 'app/customers/customers.html',
        controller: 'CustomersCtrl'
      });
  });