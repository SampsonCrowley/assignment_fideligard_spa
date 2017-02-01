fideligard.factory('rawDataService', [
  '$http', '$q', '$timeout',
  function($http, $q, $timeout){
    var _raw = {}, _currentRequests = {};

    var setData = function setData(data){
      for(var date in data){
        _raw[date] = data[date];
      }
    }

    var getData = function getData(day){
      if (_currentRequests[day]){
        return $timeout(function(){
          return getData(day)
        })
      }
      if(_.isEmpty(_raw) || (day && !_raw[day])){
        _currentRequests[day] = true;
        var dStr = (day ? '/' + day : "")
        return $http.get('/stocks' + dStr).then(function(resp){
          _currentRequests[day] = false;
          setData(resp.data);
          return _raw
        })
      }
      return $q.resolve(_raw);
    }

    return {
      get: getData,
    };
  }
])
