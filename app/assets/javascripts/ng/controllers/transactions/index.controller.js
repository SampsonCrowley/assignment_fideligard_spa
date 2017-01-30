fideligard.controller("TransactionsIndexCtrl", [
  '$scope', '$state', '$stateParams', 'transactionService',
  function($scope, $state, $stateParams, transactionService){
    transactionService.all()
      .then(function(transactions){
        $scope.transactions = transactions;
      })
  }
])
