fideligard.factory('portfolioService', [
  '$q', '$rootScope', '_', 'transactionService', 'stockDataService',
  function($q, $rootScope, _, transactionService, stockDataService){
    var _transactions = {},
        _portfolio = {},
        _startingCash = 2000,
        _cash = {
          value: _startingCash,
        },
        _stockData = {},
        _aggregate = {
          cost: 0,
          price: 0,
          one: 0,
          seven: 0,
          thirty: 0
        },
        _id = 1;

    _getStockData = function _getStockData(){
      if(_.isEmpty(_stockData)){
        return stockDataService.get()
        .then(function(data){
          _stockData = data;
        })
      }
      return $q.resolve();
    }

    _getTransactions = function _getTransactions(){
      return _getStockData()
        .then(function(){
          if(_.isEmpty(_transactions)){
            return transactionService.all()
            .then(function(transactions){
              _transactions = transactions;
            })
          }
          return $q.resolve();
        })
    }

    _newPortfolioObject = function _newPortfolioObject(symbol){
      return {
        symbol: symbol,
        quantity: 0,
        cost: 0
      }
    }

    _combineTransaction = function _combineTransaction(transaction){
      if(!_portfolio[transaction.symbol]) _portfolio[transaction.symbol] = _newPortfolioObject(transaction.symbol);

      if(transaction.debit){
        _portfolio[transaction.symbol].quantity += transaction.quantity
        _portfolio[transaction.symbol].cost += transaction.debit
        _aggregate.cost += transaction.debit
        _cash.value -= transaction.debit
      }

      if(transaction.credit){
        _portfolio[transaction.symbol].quantity -= transaction.quantity
        _portfolio[transaction.symbol].cost -= transaction.credit
        _aggregate.cost -= transaction.credit
        _cash.value += transaction.credit
      }
    }

    var _resetProfile = function _resetProfile(){
      angular.copy({}, _portfolio);
      _cash.value = _startingCash;
      _aggregate.cost = 0;
    }

    var _updatePortfolio = function _updatePortfolio(){
      _resetProfile();

      for(var id in _transactions){
        _combineTransaction(_transactions[id])
      }
      _updateAggregate()
    }

    var getPortfolio = function getPortfolios(){
      return _getTransactions().then(function(){
        return _portfolio;
      })
    }

    var getCash = function getCash(){
      return $q.resolve(_cash);
    }

    var _setUpdatedAggregate = function _setUpdatedAggregate(stocks){
      _aggregate.value = 0;
      _aggregate.price = 0;
      _aggregate.one = 0;
      _aggregate.seven = 0;
      _aggregate.thirty = 0;

      for(var i = 0; i < stocks.length; i++){
        var quantity = _portfolio[stocks[i].symbol].quantity;
        _aggregate.value += quantity * stocks[i].price;
        _aggregate.price += stocks[i].price;
        _aggregate.one += quantity * stocks[i].one;
        _aggregate.seven += quantity * stocks[i].seven;
        _aggregate.thirty += quantity * stocks[i].thirty;
      }
    }

    var _updateAggregate = function _updateAggregate(){
      var symbols = [];
      for(var symbol in _portfolio){
        symbols.push(stockDataService.find(symbol))
      }
      $q.all(symbols).then(_setUpdatedAggregate);
    }

    var getAggregate = function getAggregate(){
      return $q.resolve(_aggregate);
    }

    var _transactionObj = function _transactionObj(){
      return _transactions;
    }

    var _stockDataObj = function _stockDataObj(){
      return _stockData;
    }

    $rootScope.$watch(_transactionObj, _updatePortfolio, true)
    $rootScope.$watch(_stockDataObj, _updateAggregate, true)

    return {
      portfolio: getPortfolio,
      cash: getCash,
      aggregate: getAggregate
    }
  }
])
