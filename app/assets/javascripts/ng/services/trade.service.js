fideligard.factory('tradeService', [
  '$q', '$timeout', 'dateService', 'portfolioService', 'transactionService', 'stockDataService',
  function($q, $timeout, dateService, portfolioService, transactionService, stockDataService){

    var _invalid = function _invalid(data){
      return (
        !data.symbol ||
        !data.quantity ||
        !data.buy
      )
    }

    var _newTransaction = function _newTransaction(data){
      return stockDataService.current().then(function(stocks){
        var transaction = {
          date: dateService.max(),
          symbol: data.symbol,
          quantity: data.quantity,
          price: stocks[data.symbol].price,
          type: data.buy
        }

        return transaction
      })
    }

    _sendTransaction = function _sendTransaction(transaction){
      return transactionService.add(transaction)
    }

    var _validatePurchase = function _validatePurchase(transaction){
      return portfolioService.cash().then(function(cash){
        if(cash.value < (transaction.price * transaction.quantity)){
          return $q.reject("You can't purchase more than your cash balance")
        }

        return _sendTransaction(transaction);
      })
    }

    var _validateSale = function _validateSale(transaction){
      return portfolioService.portfolio().then(function(portfolio){
        if(transactionService.count() && _.isEmpty(portfolio)){
          return $timeout(function(){ return _validateSale(transaction)});
        }
        if(
          !portfolio[transaction.symbol] ||
          portfolio[transaction.symbol].quantity < transaction.quantity
        ){
          return $q.reject("You can't sell more of a stock than you own")
        }

        return _sendTransaction(transaction);
      })
    }

    var addTransaction = function addTransaction(data){
      if(!dateService.valid()) return $q.reject("You can't make trades on historical data");

      if(_invalid(data)) return $q.reject("Transaction Invalid");

      return _newTransaction(data).then(function(transaction){
        if(transaction.type === "buy"){
          return _validatePurchase(transaction);
        } else {
          return _validateSale(transaction);
        }
      })

    }

    var quickSell = function quickSell(id){
      return transactionService.get(id)
      .then(function(transaction){
        var data = {
          symbol: transaction.symbol,
          quantity: transaction.quantity,
          buy: "sell"
        }
        return addTransaction(data);
      })
      .catch(function(reason){
        return $q.reject(reason);
      })
    }

    return {
      add: addTransaction,
      quickSell: quickSell
    }
  }
])
