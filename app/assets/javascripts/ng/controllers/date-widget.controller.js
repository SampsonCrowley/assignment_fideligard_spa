fideligard.controller("DateWidgetCtrl", [
  '$scope', "dateWidgetService",
  function($scope, dateWidgetService){
    $scope.selectedDate = dateWidgetService.get();

    $scope.dateOptions = {
      minDate: new Date('2015-01-01 00:00:00'),
      maxDate: new Date(),
      initDate: $scope.selectedDate
    }

    $scope.updateDate = function updateDate(date){
      setTimeout(function(){
        dateWidgetService.set(date);
      })
    }

    $scope.toggle = function toggle(){
      $scope.opened = !$scope.opened;
    }
  }
])
