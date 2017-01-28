fideligard.controller('StockDataCtrl', [
  "$scope", 'dateWidgetService', 'stockDataService',
  function($scope, dateWidgetService, stockDataService){
    $scope.currentDate = dateWidgetService.get();
    stockDataService.get().then(function(data){
      $scope.quotes = data;
    })
    $scope.$on('dateChange', function(e, date) {
      stockDataService.update(date);
      $scope.currentDate = date;
    });

  }
])
