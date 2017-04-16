myApp.controller('FeedbackController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    
    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var feedbackRef = ref.child('users').child(authUser.uid).child('feedback');
       
        var feedbackInfo = $firebaseArray(feedbackRef);
        $scope.feedback = feedbackInfo;

        feedbackInfo.$loaded().then(function(data) {
          $rootScope.howManyFeedback = feedbackInfo.length;
        }); 

        feedbackInfo.$watch(function(data) {
          $rootScope.howManyFeedback = feedbackInfo.length;
        });

        $scope.addFeedback = function() {
          feedbackInfo.$add({
            name: $scope.feedbackname,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.feedbackname='';
          }); 
        } 

        $scope.deleteFeedback = function(key) {
          feedbackInfo.$remove(key);
        } 
        

      } 
    }); 
}]); 
