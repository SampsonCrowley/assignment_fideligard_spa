fideligard.factory('transactionService', [
  '$q', '_', 'dateWidgetService', 'stockDataService',
  function($q, _, dateWidgetService, stockDataService){
    var _transactions = {}, _stocks = {}, _id = 1;

    var _invalid = function _invalid(data){
      return (
        !data.symbol ||
        !data.quantity
      )
    }

    var newTransaction = function newTransaction(data){
      return stockDataService.get().then(function(stocks){
        _stocks = stocks;
        var transaction = {
          id: _id,
          date: dateWidgetService.get(),
          symbol: data.symbol,
          quantity: data.quantity,
          price: _stocks[data.symbol].price
        }

        if(data.buy === "buy"){
          transaction.debit = transaction.price * transaction.quantity
        } else {
          transaction.credit = transaction.price * transaction.quantity
        }

        _transactions[_id] = transaction;
        _id++;
        return transaction.id;
      })
    }

    var addTransaction = function addTransaction(data){
      if(_invalid(data)) return $q.reject("Transaction Invalid");
      return newTransaction(data);
    }

    var getTransactions = function getTransactions(){
      return $q.resolve(_transactions)
    }

    var getTransaction = function getTransaction(id){
      return getTransactions().then(function(transactions){
        if(!transactions[id]){
          return $q.reject("Transaction Not Found")
        }
        return transactions[id]
      })
    }

    return {
      add: addTransaction,
      all: getTransactions,
      get: getTransaction
    }
  }
])
