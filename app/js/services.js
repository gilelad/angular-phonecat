'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

phonecatServices.factory('PhonesComparer', [function() {
	return {
		phonesToCompare: [],
		getPhoneIndex: function(phoneId) {
			return this.phonesToCompare.indexOf(phoneId);
		},
		registerPhone: function(phoneId) {
			if(this.getPhoneIndex(phoneId) < 0) {
				this.phonesToCompare.push(phoneId);
			}
		},
		removePhone: function (phoneId) {
			var index = this.getPhoneIndex(phoneId);
			if(index > -1) {
				this.phonesToCompare.splice(index, 1);
			}
		}
	}
}]);
