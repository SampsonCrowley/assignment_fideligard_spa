fideligard.controller('TradeCtrl', [
  '$scope', '$stateParams', 'dateWidgetService', 'stockDataService',
  function($scope, $stateParams, dateWidgetService, stockDataService){
    $scope.stock = {
      symbol: $stateParams.symbol,
      quantity: 1
    };

    $scope.user = {
      balance: 2000
    }

    stockDataService.get().then(function(data){
      $scope.stocks = data;
      $scope.selectedStock = $scope.stocks[$scope.stock.symbol]
      $scope.updateCost()
    })

    $scope.findStock = function findStock(symbol){
      $scope.selectedStock = $scope.stocks[symbol]
      $scope.updateCost();
    }

    $scope.updateCost = function updateCost(){
      if($scope.selectedStock){
        $scope.stock.cost = $scope.selectedStock.price * $scope.stock.quantity
      }
    }

  }
])
