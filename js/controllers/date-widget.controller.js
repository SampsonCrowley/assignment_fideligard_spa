fideligard.controller("DateWidgetCtrl", [
  '$scope', "dateWidgetService",
  function($scope, dateWidgetService){
    $scope.selectedDate = dateWidgetService.get();

    $scope.dateOptions = {
      minDate: new Date('2014', '01', '01'),
      maxDate: new Date('2014', '12', '31'),
      initDate: $scope.selectedDate
    }

    $scope.updateDate = function updateDate(date){
      dateWidgetService.set(date);
    }

    $scope.toggle = function toggle(){
      $scope.opened = !$scope.opened;
    }
  }
])
