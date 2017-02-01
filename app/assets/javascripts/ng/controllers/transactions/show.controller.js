fideligard.controller("TransactionsShowCtrl", [
  '$scope', '$state', '$stateParams', 'Flash', 'transactionService', 'tradeService', 'stockDataService',
  function($scope, $state, $stateParams, Flash, transactionService, tradeService, stockDataService){
    transactionService.get($stateParams.id)
      .then(function(transaction){
        $scope.transaction = transaction;
        stockDataService.find(transaction.symbol).then(function(stock){
          $scope.stock = stock
        })
      })
      .catch(function(){
        $state.go('transactions.index')
      })


    $scope.sell = function sell(){
      tradeService.quickSell($scope.transaction.id)
        .then(function(id){
          Flash.create('success', "Quick Sell successful");
          $state.go('transactions.show',{id: id})
        })
        .catch(function(reason){
          console.log(reason)
          Flash.create('danger', "not enough shares for quick sell. redirected to trade service");
          $state.go('trade',{symbol: $scope.transaction.symbol})
        })
    }
  }
])
