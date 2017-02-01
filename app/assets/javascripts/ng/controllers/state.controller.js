fideligard.controller('StateCtrl', [
  '$scope', '$state',
  function($scope, $state){
    $scope.selectedRoute = $state.current.name
    $scope.newRoute = function newRoute(selectedRoute){
      $state.go(selectedRoute)
    }
    $scope.$watch(function(){
      return $state.current.name;
    }, function(){$scope.selectedRoute = $state.current.name})
  }
])
