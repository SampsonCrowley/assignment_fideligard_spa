fideligard.controller('DayCountCtrl', [
  '$scope', 'dateService',
  function($scope, dateService){
    var setDays = function setDays(){
      $scope.dayCount = dateService.left();
    }

    $scope.$on('dateChange', setDays)
    setDays();
  }
])
