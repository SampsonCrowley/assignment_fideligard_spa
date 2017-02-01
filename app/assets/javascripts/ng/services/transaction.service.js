fideligard.factory('transactionService', [
  '$q', '$rootScope',
  function($q, $rootScope){
    var _transactions = {}, _id = 0;

    var _completeTransaction = function _completeTransaction(transaction){
      _id++;
      transaction.id = _id;
      _transactions[_id] = transaction;
      $rootScope.$broadcast('transaction');
      return transaction.id;
    }

    _debitOrCredit = function _debitOrCredit(transaction){
      if(transaction.type === "buy"){
        transaction.debit = transaction.price * transaction.quantity
      } else {
        transaction.credit = transaction.price * transaction.quantity
      }
    }

    var addTransaction = function addTransaction(transaction){
      _debitOrCredit(transaction);
      return _completeTransaction(transaction);
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

    var countTransactions = function countTransactions(){
      return _id;
    }

    return {
      add: addTransaction,
      all: getTransactions,
      get: getTransaction,
      count: countTransactions
    }
  }
])
