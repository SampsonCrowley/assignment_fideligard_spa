fideligard.directive('portfolioCash', function(){
  return {
    restrict: 'A',
    scope:{
      portfolioCash: '='
    },
    templateUrl: 'js/directives/portfolio-cash.directive.html'
  }
})
