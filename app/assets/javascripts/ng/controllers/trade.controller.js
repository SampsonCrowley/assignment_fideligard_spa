fideligard.controller('TradeCtrl', [
  '$scope', '$stateParams', '$state', 'stockDataService', 'transactionService', 'portfolioService',
  function($scope, $stateParams, $state, stockDataService, transactionService, portfolioService){
    $scope.stock = {
      symbol: $stateParams.symbol,
      quantity: 1,
      buy: "buy"
    };

    var reset = function(){
      $scope.stock = {
        symbol: null,
        quantity: 1
      };
    }

    $scope.cash = {
      value: 0
    }

    portfolioService.cash()
      .then(function(cash){
        $scope.cash = cash;
      })

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

    $scope.validateTrade = function(valid, data, form){
      if(valid){
        transactionService.add(data)
          .then(function(resp){
            reset(data);
            form.$setPristine();
            form.$setUntouched();
            $state.go('transactions.show', {id: resp})
          })
          .catch(function(rej){
            console.log("caught", rej)
        });

      }
    }

  }
])
