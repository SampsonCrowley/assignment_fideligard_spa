fideligard.controller('TradeCtrl', [
  '$scope', '$stateParams', '$state', 'Flash', 'stockDataService', 'tradeService', 'portfolioService',
  function($scope, $stateParams, $state, Flash, stockDataService, tradeService, portfolioService){
    _portfolio = {}
    $scope.stock = {
      symbol: $stateParams.symbol,
      quantity: 1,
      buy: "buy"
    };

    $scope.valid = false;

    portfolioService.portfolio().then(function(portfolio){
      _portfolio = portfolio;
    })

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

    stockDataService.current().then(function(data){
      $scope.stocks = data;
      $scope.selectedStock = $scope.stocks[$scope.stock.symbol]
    })

    $scope.findStock = function findStock(symbol){
      $scope.selectedStock = $scope.stocks[symbol]
    }

    updateCost = function updateCost(){
      if($scope.selectedStock){
        $scope.stock.cost = $scope.selectedStock.price * $scope.stock.quantity
      }
      $scope.updateValid()
    }

    $scope.$watch('selectedStock',updateCost, true)
    $scope.$watch('stock',updateCost, true)


    $scope.validateTrade = function(valid, data, form){
      // if(valid && $scope.valid){
        tradeService.add(data)
          .then(function(resp){
            reset(data);
            form.$setPristine();
            form.$setUntouched();
            $state.go('transactions.show', {id: resp})
          })
          .catch(function(rej){
            console.log("caught", rej)
            var id = Flash.create('danger', rej);
        });
      // } else {
      //   var id = Flash.create('danger', rej);
      // }
    }

    $scope.updateValid = function updateValid(){
      if($scope.stock.buy === 'buy'){
        if($scope.selectedStock && ($scope.selectedStock.price * $scope.stock.quantity) <= $scope.cash.value){
          $scope.valid = true
        } else{
          $scope.valid = false
        }
      }
      else {
        var stock = _portfolio[$scope.selectedStock.symbol]
        if(stock && $scope.stock.quantity <= stock.quantity){
          $scope.valid = true
        } else {
          $scope.valid = false
        }
      }
    }

  }
])
