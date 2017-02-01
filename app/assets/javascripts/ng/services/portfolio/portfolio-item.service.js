fideligard.factory('portfolioItemService', [
  '$q', '_', 'transactionService',
  function($q, _, transactionService){
    var _transactions = {},
        _portfolio = {};
        _aggregate = {};

    linkServices = function linkServices(aggregate, cash){
      _aggregate = aggregate;
      _cash = cash
    }

    _getTransactions = function _getTransactions(){
      if(_.isEmpty(_transactions)){
        return transactionService.all()
        .then(function(transactions){
          _transactions = transactions;
        })
      }
      return $q.resolve();
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

    var updatePortfolio = function updatePortfolio(){
      return _getTransactions().then(function(){

        setTimeout(function(){
          for(var id in _transactions){
            _combineTransaction(_transactions[id])
          }
        })

        return _portfolio
      })
    }

    var getPortfolio = function getPortfolio(){
      return $q.resolve(_portfolio);
    }

    return {
      link: linkServices,
      update: updatePortfolio,
      portfolio: getPortfolio
    }
  }
])
