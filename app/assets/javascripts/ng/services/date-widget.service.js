fideligard.factory('dateWidgetService', [
  '$rootScope', '$timeout',
  function($rootScope,$timeout){

    var _date = new Date();

    getDate = function getDate(){
      return _date
    }

    setDate = function parseDate(str){
      _date = new Date(str)
      $rootScope.$broadcast('dateChange', _date);
    }

    return {
      get: getDate,
      set: setDate
    }
  }
])
