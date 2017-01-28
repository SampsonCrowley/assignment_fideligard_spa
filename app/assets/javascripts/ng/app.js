var fideligard = angular.module('fideligard', ['ui.router', 'ui.bootstrap'])
                        .constant('_', window._);

fideligard.config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider){

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
                        templateUrl: 'js/views/user-data.html'
                      }
                    }
                  })
                  .state('portfolio',{
                    url:"portfolio",
                    parent: 'user',
                    views:{
                      '':{
                        templateUrl:"js/views/portfolio.html"
                      },
                      'userDataHeader': {
                        template: "Portfolio"
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
                      'userDataHeader': {
                        template: "Transactions"
                      }
                    }
                  })
                  .state('trade',{
                    url:"trade/:symbol",
                    parent: 'user',
                    views:{
                      '':{
                        templateUrl:"js/views/trade.html",
                        controller: 'TradeCtrl'
                      },
                      'userDataHeader': {
                        template: "Trade"
                      }
                    }
                  })
  }
]);
