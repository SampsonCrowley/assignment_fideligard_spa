fideligard.controller("PortfolioIndexCtrl", [
  '$scope', 'portfolioService',
  function($scope, portfolioService){
    portfolioService.portfolio()
      .then(function(portfolio){
        $scope.portfolio = portfolio;
      })

    portfolioService.cash()
      .then(function(cash){
        $scope.cash = cash;
      })

    portfolioService.aggregate().then(function(aggregate){
      $scope.aggregate = aggregate
    })
  }
])
