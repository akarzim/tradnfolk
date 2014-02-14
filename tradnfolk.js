angular.module('tradnfolk', ['ngRoute', 'firebase'])

.value('fbURL', 'https://tradnfolk.firebaseio.com/')

.factory('Folkeux', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})

.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider
    .when('/tradnfolk/', {
      controller:'MailCtrl',
      templateUrl:'mail_form.html'
    })
    .otherwise({
      redirectTo:'/tradnfolk/'
    });
})

.controller('MailCtrl', function($scope, $location, $timeout, Folkeux) {
  $scope.save = function() {
    $scope.folkeux.created_at = Date.now();
    Folkeux.$add($scope.folkeux, function(error) {
      $timeout(function() { $scope.mailSent = (error === null); });
    });
  };
});
