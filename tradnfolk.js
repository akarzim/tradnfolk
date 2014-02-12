angular.module('tradnfolk', ['ngRoute', 'firebase'])

.value('fbURL', 'https://tradnfolk.firebaseio.com/')

.factory('Folkeux', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'MailCtrl',
      templateUrl:'mail_form.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('MailCtrl', function($scope, $location, $timeout, Folkeux) {
  $scope.save = function() {
      console.log('saving…');
    Folkeux.$add($scope.folkeux, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
});
