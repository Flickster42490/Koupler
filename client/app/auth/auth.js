// This controller is responsible for client side authentication in the 
//signup/signin form using the injected Auth service. 

angular.module('koupler.auth', [])

.controller('AuthCtrl', function ($scope, $window, $location, Auth){

  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
        .then(function (token){
          $window.localStorage.setItem('JOT', token);
          $location.path('/activities');
        })
        .catch(function (err){
          console.error(err);
        });
  };
 
  $scope.signup = function () {
    Auth.signup($scope.user)
        .then(function (token){
          $window.localStorage.setItem('JOT', token);
          $location.path('/activities');
        })
        .catch(function (err){
          console.error(err);
        });
  };

})

// -----------------------------------------------
// ---------This is going to go in the factory file
// and the app.js config file ---------------------
.factory('Auth', function ($http, $location, $window) {

  var signin = function (user){
    return $http.post('/users/signin', user)
                .then(function (resp) {
                  return resp.data.token;
                })
  };

  var signup = function (user) {
    return $http.post('/users/signup', user)
                .then(function (resp) {
                  return resp.data.token;
                })
  };

  var isAuth = function () { 
    return !!$window.localStorage.getItem('JOT');
  }

  var signout = function (){
    $window.localStorage.removeItem('JOT');
    $location.path('/')
  }

  return { signin : signin, signup : signup, isAuth: isAuth, signout: signout};

}



//attached to the $httpIntercepter. Will stop 
//all outgoing requests and look in the local 
//storage to see if user has token. 
.factory('AttachTokens', function ($window) {

  var request = function (object) {
    var jwt = $window.localStorage.getItem('JOT');
    if(jwt) {
      object.headers['x-access-token'] = jwt;
    }
    object.headers['Allow-Control-Allow-Origin'] = '*';
    return object;
  }
  return {request: request};
})
//it is listening for when angular tries to change routes
//and send token to server to authenticate. If not authentic
//token, will redirect to homepage. 
.run(function ($rootScope, $location, Auth){

  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if(next.$$route && next.$$route.authenticate && !Auth.isAuth()) { 
      $location.path('/');
    }
  });

});