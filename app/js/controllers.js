'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'PhonesComparer',
  function($scope, Phone, PhonesComparer) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    $scope.phonesToCompare = false;


    $scope.$watchCollection(function() {
       return PhonesComparer.phonesToCompare
    },
    function(newCollection, oldCollection) {
      $scope.phonesToCompare = newCollection.length > 1
    });

    $scope.updatePhonesToCompare = function(phoneId) {
      if(PhonesComparer.getPhoneIndex(phoneId) > -1) {
        PhonesComparer.removePhone(phoneId);
      } else {
        PhonesComparer.registerPhone(phoneId);
      }
    }
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }



  }]);

phonecatControllers.controller('PhoneComparingCtrl', ['$scope', '$location', 'Phone', 'PhonesComparer',
  function($scope, $location, Phone, PhonesComparer) {
    var phoneId;
    $scope.phonesCompared = [];
    $scope.dataOptions = ['Availability and Networks','Battery','Storage and Memory','Connectivity','Android','Size and Weight','Display','Hardware','Camera','Additional Features'];
    $scope.comparedData = 'Availability and Networks';

    if(!PhonesComparer.phonesToCompare || PhonesComparer.phonesToCompare.length === 0) {
      $location.url('/app/index.html#/phones')
    }

     $scope.setImage = function(phone, imageUrl) {
      phone.mainImageUrl = imageUrl;
    }

    for(var index = 0; index < PhonesComparer.phonesToCompare.length; index++) {
      phoneId = PhonesComparer.phonesToCompare[index];
      Phone.get({phoneId: phoneId}, function(phone) {
        phone.mainImageUrl = phone.images[0];
        $scope.phonesCompared.push(phone);
      });
    }
  }]);
