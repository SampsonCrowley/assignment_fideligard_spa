fideligard.factory('stockDataService', [
  '$http', '$q', '_', 'dateWidgetService',
  function($http, $q, _, dateWidgetService){
    var _raw = {},
     _data = {},
    _symbols = ['AAA', 'ABC'], //, 'BAC', 'GOOG'
    baseString = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20",
    endString = "%20and%20startDate%20%3D%20%222014-01-01%22%20and%20endDate%20%3D%20%222014-12-31%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    var buildSymbolList = function buildSymbolList(){
      var str = "where%20symbol%20IN%20("
      for(var i = 0; i < _symbols.length; i++){
        str += "%22" + _symbols[i] + "%22"
        if(!(i === _symbols.length - 1)) str += "%2C%20";
      }
      str += ")"
      return str;
    }

    var getStockData = function getStockData(){
      if(_.isEmpty(_raw)){
        return $http.get(baseString + buildSymbolList() + endString)
                    .then(function(resp){
                      var quote = resp.data.query.results.quote
                      for(var i = 0; i < quote.length; i++){
                        if(!_raw[quote[i].Symbol]) _raw[quote[i].Symbol] = {};

                        _raw[quote[i].Symbol][quote[i].Date] = {
                          open: quote[i].Open,
                          high: quote[i].High,
                          low: quote[i].Low,
                          close: quote[i].Close,
                          volume: quote[i].Volume
                        }
                      }
                      return _raw;
                    })
      }
      return $q(function(resolve){ resolve(_raw) });
    }

    var updateData = function updateData(e, date){
      var today = date.toISOString("yyyy-MM-dd").slice(0,10);
      for(symbol in _raw){
        if(_raw[symbol][today]){
          if(!_data[symbol]) _data[symbol] = { symbol: symbol };

          _data[symbol].price = _raw[symbol][today].high;
        }
      }
      return _data;
    }

    var getData = function getData(){
      return getStockData().then(function(){
        return updateData(void(0), dateWidgetService.get())
      })
    }

    return {
      get: getData,
      update: updateData
    };
  }
])
