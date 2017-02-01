fideligard.controller('OverlayCtrl', [
  '$scope',
  function($scope){
    $scope.showDemo = true;
    $scope.completeDemo = function(){
      $scope.showDemo = false;
    }
    var showGameOver = function showGameOver(){
      $scope.showGameOver = true;
    }
    $scope.$on('gameOver', showGameOver)
  }
])
