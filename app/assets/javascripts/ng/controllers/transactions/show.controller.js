fideligard.controller("TransactionsShowCtrl", [
  '$scope', '$state', '$stateParams', 'transactionService',
  function($scope, $state, $stateParams, transactionService){
    transactionService.get($stateParams.id)
      .then(function(transaction){
        $scope.transaction = transaction;
      })
      .catch(function(){
        $state.go('transactions.index')
      })
  }
])
