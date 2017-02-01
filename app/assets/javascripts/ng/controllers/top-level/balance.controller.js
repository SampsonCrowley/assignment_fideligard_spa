fideligard.controller('BalanceCtrl', [
  '$scope', 'portfolioService',
  function($scope, portfolioService){
    $scope.balance = 0;
    portfolioService.cash().then(function(cash){
      $scope.balance = cash
    })
  }
])
