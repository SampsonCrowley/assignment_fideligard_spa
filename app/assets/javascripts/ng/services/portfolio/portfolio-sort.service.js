fideligard.service('portfolioSortService', [
  '_', 'stockDataService',
  function(_, stockDataService){
    var _stocks;
    var getStocks = function getStocks(){
      if(_.isEmpty(_stocks)){
        stockDataService.current()
        .then(function(stocks){
          _stocks = stocks;
        })
      }
    }
    getStocks();

    var orderBySymbol = function orderBySymbol(item){
      return item.symbol;
    }

    var orderByQuantity = function orderByQuantity(item){
      return item.quantity;
    }

    var orderByCost = function orderByCost(item){
      return item.cost;
    }

    var orderByValue = function orderByValue(item){
      if(!_stocks[item.symbol]) return item.cost;
      return item.quantity * _stocks[item.symbol].price
    }

    var orderByProfit = function orderByProfit(item){
      return (item.quantity * _stocks[item.symbol].price) - item.cost
    }

    var orderByPrice = function orderByPrice(item){
      if(!_stocks[item.symbol]) return item.cost / item.quantity;
      return _stocks[item.symbol].price
    }

    var orderByOne = function orderByOne(item){
      return _stocks[item.symbol].one
    }
    var orderBySeven = function orderBySeven(item){
      return _stocks[item.symbol].seven
    }

    var orderByThirty = function orderByThirty(item){
      return _stocks[item.symbol].thirty
    }

    return {
      symbol: orderBySymbol,
      quantity: orderByQuantity,
      cost: orderByCost,
      value: orderByValue,
      profit: orderByProfit,
      price: orderByPrice,
      one: orderByOne,
      seven: orderBySeven,
      thirty: orderByThirty
    }
  }
])
