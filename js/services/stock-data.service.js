fideligard.factory('stockDataService', [
  '$http', '$q', '_', 'dateWidgetService',
  function($http, $q, _, dateWidgetService){
    var _raw = {},
     _data = {};
    // baseString = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=",
    // API_KEY = "B4sTzjR9SaZDuvJpvq4W";
    // endString = "&date.gte=2014-01­-01&date.lte=2014-­12-­31&qopts.columns=ticker,date,open,high,low,close,volume",
    // fullString = baseString + API_KEY + endString;

    // var loop = function loop(){
    //   var arr = [];
    //   for(var i = 0; i < _symbols.length; i++){
    //     var str = "where%20symbol%3D%22" + _symbols[i] + "%22";
    //     arr.push($http.get(baseString + str + endString))
    //   }
    //   return arr;
    // }

    var setData = function setData(quote){
      for(var i = 0; i < quote.length; i++){
        if(!_raw[quote[i][0]]) _raw[quote[i][0]] = {};

        _raw[quote[i][0]][quote[i][1]] = {
          open: quote[i][2],
          high: quote[i][3],
          low: quote[i][4],
          close: quote[i][5],
          volume: quote[i][6]
        }
      }
    }

    var getStockData = function getStockData(){
      if(_.isEmpty(_raw)){
        return $http.get('/data/stocks.json').then(function(resp){
          // for(var i = 0; i < datas.length; i++){
          //   setData(datas[i].data.query.results.quote)
          // }
          setData(resp.data.datatable.data);
          return _raw
        })
      }
      return $q(function(resolve){ resolve(_raw) });
    }

    var updateData = function updateData(date){
      var today = _minusDays(date, 0);
      var oneDayAgo = _minusDays(date, 1);
      var sevenDaysAgo = _minusDays(date, 7);
      var thirtyDaysAgo = _minusDays(date, 30);
      angular.copy({}, _data);
      for(symbol in _raw){
        if(_raw[symbol][today]){
          if(!_data[symbol]) _data[symbol] = { symbol: symbol };
          var high = _raw[symbol][today].high;
          _data[symbol].price = high;
          _data[symbol].one = _raw[symbol][oneDayAgo] ? high - _raw[symbol][oneDayAgo].high : "N/A";
          _data[symbol].seven = _raw[symbol][sevenDaysAgo] ? high - _raw[symbol][sevenDaysAgo].high : "N/A";
          _data[symbol].thirty = _raw[symbol][thirtyDaysAgo] ? high - _raw[symbol][thirtyDaysAgo].high : "N/A";
        }
      }
      return _data;
    }

    var getData = function getData(){
      return getStockData().then(function(){
        return updateData(dateWidgetService.get())
      })
    }

    var _minusDays = function _minusDaysx(date, numDays) {
      var dateCopy = new Date(date);
      var newDate = new Date(dateCopy.setDate(dateCopy.getDate() - numDays));
      console.log(newDate)
      return newDate.toISOString().slice(0,10);
    }

    return {
      get: getData,
      update: updateData
    };
  }
])
