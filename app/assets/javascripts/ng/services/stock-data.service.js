fideligard.factory('stockDataService', [
  '$http', '$q', '$timeout', '$rootScope', '_', 'dateService', 'rawDataService',
  function($http, $q, $timeout, $rootScope, _, dateService, rawDataService){
    var _data = {
          historic: {},
          current: {}
        },
        _raw = {},
        _today, _oneDayAgo, _sevenDaysAgo, _thirtyDaysAgo;

    rawDataService.get().then(function(raw){
      _raw = raw
    })

    var rawData = rawDataService.get

    var _clearData = function _clearData(type){
      for(var sym in _data[type]){
        angular.copy({ symbol: sym }, _data[type][sym])
      }
    }

    var _dataType = function(){
      return dateService.valid() ? "current" : "historic"
    }

    var updateData = function updateData(date, type){
      var type = type || _dataType();
      _clearData("historic");

      return $timeout(function(){
        if(type === "current") {
          _clearData(type);
        }
        _today = _minusDays(date, 0),
        _oneDayAgo = _minusDays(date, 1),
        _sevenDaysAgo = _minusDays(date, 7),
        _thirtyDaysAgo = _minusDays(date, 30);
        return requery(type).then(function(){
          return _data[type];
        });
      })


    }

    var requery = function requery(type){
      return $q.all([
        rawData(_today),
        rawData(_oneDayAgo),
        rawData(_sevenDaysAgo),
        rawData(_thirtyDaysAgo)
      ])
      .then(function(){
        setData(type)
      });
    }

    var setData = function setData(type){
      for(var symbol in _raw[_today]){
        if(!_data[type][symbol]) _data[type][symbol] = { symbol: symbol };
        var high = _raw[_today][symbol].high;
        _data[type][symbol].price = high;
        _data[type][symbol].one = _raw[_oneDayAgo][symbol] ? high - _raw[_oneDayAgo][symbol] .high : "N/A";
        _data[type][symbol].seven = _raw[_sevenDaysAgo][symbol] ? high - _raw[_sevenDaysAgo][symbol].high : "N/A";
        _data[type][symbol].thirty = _raw[_thirtyDaysAgo][symbol] ? high - _raw[_thirtyDaysAgo][symbol].high : "N/A";
      }
      if(type === "current") {
        setData("historic");
        $rootScope.$broadcast('stockChange');
      }
      
    }

    var getData = function getData(type){
      type = type || _dataType()
      if(_.isEmpty(_data[type])){
        return $q.resolve(updateData(dateService.get(), type))
      }
      return $q.resolve(_data[type]);
    }

    var findData = function findData(symbol, type){
      type = type || _dataType();
      return getData(type).then(function(){
        return _data[type][symbol]
      })
    }

    var _minusDays = function _minusDays(date, numDays) {
      return dateService.calculate(date, (numDays * -1), true)
    }

    var currentData = function currentData(){
      return getData("current")
    }

    var historicData = function historicData(){
      return getData("historic")
    }

    return {
      get: getData,
      find: findData,
      update: updateData,
      current: currentData,
      historic: historicData
    };
  }
])
