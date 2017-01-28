fideligard.directive('stockData', function(){
  return {
    restrict: 'A',
    scope:{
      stockData: '='
    },
    templateUrl: 'js/directives/stock-data.directive.html'
  }
})
