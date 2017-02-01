fideligard.controller("PortfolioIndexCtrl", [
  '$scope', 'portfolioService', 'stockDataService', 'portfolioSortService',
  function($scope, portfolioService, stockDataService, portfolioSortService){
    var _stocks;
    $scope.order = 'symbol';
    $scope.direction = false;

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

    stockDataService.get()
      .then(function(stocks){
        _stocks = stocks;
      })

    $scope.orderTable = function orderTable(sort){
      if($scope.order === sort){
        $scope.direction = !$scope.direction;
      } else {
        $scope.order = sort
        $scope.direction = false;
      }
    }

    $scope.orderPortfolio = function orderPortfolio(item){
      return portfolioSortService[$scope.order](item)
    }
  }
])
