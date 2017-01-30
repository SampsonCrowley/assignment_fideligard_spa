fideligard.directive('portfolioItem', [
  'stockDataService',
  function(stockDataService){
    var setup = function setup(s){
      s.stock = {}
      stockDataService.find(s.portfolioItem.symbol).then(function(stock){
        angular.copy(stock, s.stock);
      })

      s.currentValue = function currentValue(){
        return s.portfolioItem.quantity * s.stock.price
      }
    }

    return {
      restrict: 'A',
      scope:{
        portfolioItem: '=',
      },
      link: setup,
      templateUrl: 'js/directives/portfolio-item.directive.html'
    }
  }
])
