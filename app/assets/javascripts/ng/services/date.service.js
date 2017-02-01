fideligard.factory('dateService', [
  '$rootScope', '$timeout',
  function($rootScope,$timeout){
    // hours*minutes*seconds*milliseconds
    var oneDay = 24*60*60*1000,
        _date = {
          min: new Date('2015/01/01'),
          selected: new Date('2015/01/01'),
          farthest: new Date('2015/01/01'),
          end: new Date('2015/12/31'),
        }

    var daysLeft = function daysLeft(){
      return Math.floor((_date.end.getTime() - _date.farthest.getTime())/(oneDay));
    }

    var getDate = function getDate(){
      return _date.selected
    }

    var minDate = function minDate(){
      return _date.min
    }

    var maxDate = function maxDate(){
      return _date.farthest
    }

    var _farthest = function farthest(){
      if(_date.selected > _date.farthest){
        _date.farthest = _date.selected
      }
    }

    var validTradeDate = function validTradeDate(){
      return (_date.selected >= _date.farthest)
    }

    var goToFarthest = function goToFarthest(){
      if(_date.farthest.getTime() !== _date.selected.getTime()){
        setDate(_date.farthest.toISOString())
        console.log("date set")
      }
    }

    var advanceDate = function advanceDate(){
      setDate(calculateDays(_date.farthest, 1))
      if(daysLeft() < 0){
        console.log("game over");
        alert('Game Over');
        $rootScope.$broadcast('gameEnd');
      }
    }

    var setDate = function parseDate(str){
      _date.selected = new Date(str)
      _farthest();
      $rootScope.$broadcast('dateChange', _date.selected);
    }

    var calculateDays = function calculateDays(date, numDays, formatted) {
      var dateCopy = new Date(date);
      var newDate = new Date(dateCopy.setDate(dateCopy.getDate() + numDays));

      if(formatted) return newDate.toISOString().slice(0,10);
      return newDate;
    }


    return {
      get: getDate,
      min: minDate,
      max: maxDate,
      set: setDate,
      farthest: goToFarthest,
      next: advanceDate,
      left: daysLeft,
      valid: validTradeDate,
      calculate: calculateDays,
    }
  }
])
