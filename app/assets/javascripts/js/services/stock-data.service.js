fideligard.factory('stockDataService', [
  '$http', '$q', '_', 'dateWidgetService',
  function($http, $q, _, dateWidgetService){
    var _raw = {},
     _data = {},
     _today, _oneDayAgo, _sevenDaysAgo, _thirtyDaysAgo;
    // baseString = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=",
    // API_KEY = "B4sTzjR9SaZDuvJpvq4W";
    // endString = "&date.gte=2014-01­-01&date.lte=2014-­12-­31&qopts.columns=ticker,date,open,high,low,close,volume",
    // fullString = baseString + API_KEY + endString;
    // https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=B4sTzjR9SaZDuvJpvq4W&date.gte=2014-01­-01&date.lte=2014-­12-­31&qopts.columns=ticker,date,open,high,low,close,volume

    // var loop = function loop(){
    //   var arr = [];
    //   for(var i = 0; i < _symbols.length; i++){
    //     var str = "where%20symbol%3D%22" + _symbols[i] + "%22";
    //     arr.push($http.get(baseString + str + endString))
    //   }
    //   return arr;
    // }

    var setRawData = function setRawData(data){
      for(date in data){
        _raw[date] = data[date];
      }
    }

    var getStockData = function getStockData(day){
      if(_.isEmpty(_raw) || !_raw[day]){
        var dStr = (day ? '/' + day : "")
        return $http.get('/stocks' + dStr).then(function(resp){
          // for(var i = 0; i < datas.length; i++){
          //   setData(datas[i].data.query.results.quote)
          // }
          setRawData(resp.data);
          return _raw
        })
      }
      return $q(function(resolve){ resolve(_raw) });
    }

    var updateData = function updateData(date){
      _today = _minusDays(date, 0),
      _oneDayAgo = _minusDays(date, 1),
      _sevenDaysAgo = _minusDays(date, 7),
      _thirtyDaysAgo = _minusDays(date, 30);
      requery();

      return _data;
    }

    var requery = function requery(){
      $q.all([
        getStockData(_today),
        getStockData(_oneDayAgo),
        getStockData(_sevenDaysAgo),
        getStockData(_thirtyDaysAgo)
      ])
      .then(function(){
        console.log("done")
        setData()
      });
    }

    var setData = function setData(){
      angular.copy({}, _data);
      for(symbol in _raw[_today]){
        _data[symbol] = { symbol: symbol };
        var high = _raw[_today][symbol].high;
        _data[symbol].price = high;
        _data[symbol].one = _raw[_oneDayAgo][symbol] ? high - _raw[_oneDayAgo][symbol] .high : "N/A";
        _data[symbol].seven = _raw[_sevenDaysAgo][symbol] ? high - _raw[_sevenDaysAgo][symbol].high : "N/A";
        _data[symbol].thirty = _raw[_thirtyDaysAgo][symbol] ? high - _raw[_thirtyDaysAgo][symbol].high : "N/A";
      }
    }

    var getData = function getData(){
      return getStockData().then(function(){
        return updateData(dateWidgetService.get())
      })
    }

    var _minusDays = function _minusDays(date, numDays) {
      var dateCopy = new Date(date);
      var newDate = new Date(dateCopy.setDate(dateCopy.getDate() - numDays));
      return newDate.toISOString().slice(0,10);
    }

    return {
      get: getData,
      update: updateData
    };
  }
])
