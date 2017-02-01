fideligard.factory('portfolioAggregateService', [
  '$q', 'stockDataService',
  function($q, stockDataService){
    var _aggregate = {};

    var _resetAggregate = function(){
      _aggregate.value = 0;
      _aggregate.price = 0;
      _aggregate.one = 0;
      _aggregate.seven = 0;
      _aggregate.thirty = 0;
    }

    var _loopAggregate = function _loopAggregate(stocks){
      for(var i = 0; i < stocks.length; i++){
        var quantity = _portfolio[stocks[i].symbol].quantity;
        _aggregate.value += quantity * stocks[i].price;
        _aggregate.price += stocks[i].price;
        _aggregate.one += quantity * stocks[i].one;
        _aggregate.seven += quantity * stocks[i].seven;
        _aggregate.thirty += quantity * stocks[i].thirty;
      }
    }

    var _setUpdatedAggregate = function _setUpdatedAggregate(stocks){
      _resetAggregate();
      _loopAggregate(stocks);
    }

    var updateAggregate = function updateAggregate(){
      var stocks = [];
      for(var symbol in _portfolio){
        stocks.push(stockDataService.find(symbol, "current"))
      }
      $q.all(stocks).then(_setUpdatedAggregate);
    }

    var getAggregate = function getAggregate(){
      return $q.resolve(_aggregate);
    }

    _resetAggregate();

    linkServices = function linkServices(portfolio){
      _portfolio = portfolio;
    }

    return {
      link: linkServices,
      update: updateAggregate,
      aggregate: getAggregate
    }
  }
])
