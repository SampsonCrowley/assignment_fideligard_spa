var fideligard = angular.module('fideligard', [
  'ui.router',
  'ui.bootstrap',
  'vsscrollbar',
  'angular-loading-bar',
  'angular-memory-stats',
  'ngFlash'
]).constant('_', window._);

fideligard.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', 'FlashProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, FlashProvider){
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    FlashProvider.setTimeout(3000);
    FlashProvider.setShowClose(true);

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/portfolio');

    $stateProvider.state('user',{
                    url:"/",
                    abstract:true,
                    views:{
                      'balance':{
                        templateUrl: "js/views/nav/balance.html",
                        controller: 'BalanceCtrl'
                      },
                      'dayCount':{
                        templateUrl: "js/views/nav/day-count.html",
                        controller: 'DayCountCtrl'
                      },
                      'stockData':{
                        templateUrl: "js/views/stock-data.html",
                        controller: "StockDataCtrl"
                      },
                      'dateWidget':{
                        templateUrl: "js/views/date-widget.html",
                        controller: "DateWidgetCtrl"
                      },
                      'userData':{
                        templateUrl: 'js/views/user-data.html',
                        controller: 'StateCtrl'
                      },
                      'overlay':{
                        templateUrl: 'js/views/overlay.html',
                        controller: 'OverlayCtrl'
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
                      'userDataHeader@user': {
                        template: "Transaction Details"
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
                  .state('sell',{
                    url:"sell/:id",
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
