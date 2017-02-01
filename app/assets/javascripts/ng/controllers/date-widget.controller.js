fideligard.controller("DateWidgetCtrl", [
  '$scope', '$timeout', 'dateService',
  function($scope, $timeout, dateService){
    var setDate = function setDate(){
      $scope.selectedDate = dateService.get();
    }
    setDate();

    $scope.dateOptions = {
      minDate: dateService.min(),
      maxDate: dateService.max(),
      initDate: $scope.selectedDate
    }

    $scope.current = function current(){
      dateService.farthest()
      setDate()
    }

    $scope.advance = function current(){
      dateService.next()
      $scope.dateOptions.maxDate = dateService.max()
      setDate()
    }

    $scope.updateDate = function updateDate(date){
      dateService.set(date);
    }

    $scope.toggle = function toggle(){
      $scope.opened = !$scope.opened;
    }
  }
])
