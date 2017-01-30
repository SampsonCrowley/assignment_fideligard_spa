var fideligard = angular.module('fideligard', ['ui.router', 'ui.bootstrap', 'angular-loading-bar', 'angular-memory-stats'])
                        .constant('_', window._);

fideligard.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider){
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';

    $locationProvider.html5Mode(true);
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
                        templateUrl:"js/views/portfolio.html",
                        controller: 'PortfolioIndexCtrl'
                      },
                      'userDataHeader': {
                        template: "Portfolio"
                      }
                    }
                  })
                  .state('transactions',{
                    url:"transactions",
                    parent: 'user',
                    abstract: true,
                    views:{
                      '':{
                        templateUrl:"js/views/transactions.html"
                      },
                      'userDataHeader': {
                        template: "Transactions"
                      }
                    }
                  })
                  .state('transactions.index',{
                    url:"",
                    views:{
                      '':{
                        templateUrl:"js/views/transactions/index.html",
                        controller: "TransactionsIndexCtrl"
                      },
                    }
                  })
                  .state('transactions.show',{
                    url:"/:id",
                    views:{
                      '':{
                        templateUrl:"js/views/transactions/show.html",
                        controller: "TransactionsShowCtrl"
                      },
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
