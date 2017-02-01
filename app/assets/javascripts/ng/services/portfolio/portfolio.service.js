fideligard.factory('portfolioService', [
  '$q', '$timeout', '$rootScope', 'portfolioItemService', 'portfolioAggregateService',
  function($q, $timeout, $rootScope, portfolioItemService, portfolioAggregateService){
    var _portfolio = {},
        _aggregate = {},
        _startingCash = 100000,
        _cash = {
          value: _startingCash,
        };

    portfolioItemService.portfolio().then(function(portfolio){
      _portfolio = portfolio
      portfolioAggregateService.link(portfolio);

      portfolioAggregateService.aggregate().then(function(aggregate){
        _aggregate = aggregate;
        portfolioItemService.link(_aggregate, _cash)
      });
    });


    var _resetProfile = function _resetProfile(){
      angular.copy({}, _portfolio);
      _cash.value = _startingCash;
      _aggregate.cost = 0;
    };

    var _update = function _update(){
      _resetProfile();
      $timeout(function(){
        portfolioItemService.update().then(portfolioAggregateService.update)
      })
    };

    var getCash = function getCash(){
      return $q.resolve(_cash);
    };

    $rootScope.$on('transaction', _update);
    $rootScope.$on('stockChange', _update);

    return {
      portfolio: portfolioItemService.portfolio,
      cash: getCash,
      aggregate: portfolioAggregateService.aggregate
    }
  }
])
