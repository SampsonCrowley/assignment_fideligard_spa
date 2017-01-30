fideligard.factory('stockDataService', [
  '$http', '$q', '$timeout', '_', 'dateWidgetService',
  function($http, $q, $timeout, _, dateWidgetService){
    var _raw = {},
     _data = {},
     _today, _oneDayAgo, _sevenDaysAgo, _thirtyDaysAgo;

    var setRawData = function setRawData(data){
      for(var date in data){
        _raw[date] = data[date];
      }
    }

    var getStockData = function getStockData(day){
      if(_.isEmpty(_raw) || (day && !_raw[day])){
        var dStr = (day ? '/' + day : "")
        return $http.get('/stocks' + dStr).then(function(resp){
          setRawData(resp.data);
          return _raw
        })
      }
      return $q.resolve(_raw);
    }

    var _clearData = function _clearData(){
      for(var sym in _data){
        angular.copy({ symbol: sym }, _data[sym])
      }
    }

    var updateData = function updateData(date){
      _clearData();
      _today = _minusDays(date, 0),
      _oneDayAgo = _minusDays(date, 1),
      _sevenDaysAgo = _minusDays(date, 7),
      _thirtyDaysAgo = _minusDays(date, 30);
      return requery().then(function(){
        return _data;
      });

    }

    var requery = function requery(){
      return $q.all([
        getStockData(_today),
        getStockData(_oneDayAgo),
        getStockData(_sevenDaysAgo),
        getStockData(_thirtyDaysAgo)
      ])
      .then(function(){
        setData()
      });
    }

    var setData = function setData(){
      for(var symbol in _raw[_today]){
        if(!_data[symbol]) _data[symbol] = { symbol: symbol };
        var high = _raw[_today][symbol].high;
        _data[symbol].price = high;
        _data[symbol].one = _raw[_oneDayAgo][symbol] ? high - _raw[_oneDayAgo][symbol] .high : "N/A";
        _data[symbol].seven = _raw[_sevenDaysAgo][symbol] ? high - _raw[_sevenDaysAgo][symbol].high : "N/A";
        _data[symbol].thirty = _raw[_thirtyDaysAgo][symbol] ? high - _raw[_thirtyDaysAgo][symbol].high : "N/A";
      }
    }

    var getData = function getData(){
      if(_.isEmpty(_data)){
        return $q(function(resolve){
          resolve(updateData(dateWidgetService.get()))
        })
      }
      return $q.resolve(_data);
    }

    var findData = function findData(symbol){
      return getData().then(function(){
        return _data[symbol]
      })
    }

    var _minusDays = function _minusDays(date, numDays) {
      var dateCopy = new Date(date);
      var newDate = new Date(dateCopy.setDate(dateCopy.getDate() - numDays));
      return newDate.toISOString().slice(0,10);
    }

    return {
      get: getData,
      find: findData,
      update: updateData
    };
  }
])
