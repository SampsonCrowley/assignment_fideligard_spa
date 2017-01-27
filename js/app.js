var fideligard = angular.module('fideligard', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
                        .constant('_', window._);

fideligard.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/portfolio');

    $stateProvider.state('user',{
                    url:"/",
                    abstract:true,
                    views:{
                      'stockData':{
                        templateUrl: "js/views/stock-data.html",
                        controller: "StockDataCtrl"
                      },
                      'dateWidget':{
                        templateUrl: "js/views/date-widget.html",
                        controller: "DateWidgetCtrl"
                      },
                      'userData':{
                        template: '<ui-view/>'
                      }
                    }
                  })
                  .state('portfolio',{
                    url:"portfolio",
                    parent: 'user',
                    views:{
                      '':{
                        templateUrl:"js/views/portfolio.html"
                      }
                    }
                  })
                  .state('transactions',{
                    url:"transactions",
                    parent: 'user',
                    views:{
                      '':{
                        templateUrl:"js/views/transactions.html"
                      },
                    }
                  })
                  .state('trade',{
                    url:"trade",
                    parent: 'user',
                    views:{
                      '':{
                        templateUrl:"js/views/trade.html"
                      },
                    }
                  })
  }
]);
