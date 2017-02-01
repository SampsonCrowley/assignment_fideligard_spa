fideligard.controller("TransactionsIndexCtrl", [
  '$scope', '$state', '$stateParams', 'transactionService',
  function($scope, $state, $stateParams, transactionService){
    transactionService.all()
      .then(function(transactions){
        $scope.transactions = transactions;
      })

    $scope.viewTransaction = function viewTransaction(id){
      $state.go('transactions.show', {id: id})
    }
  }
])
