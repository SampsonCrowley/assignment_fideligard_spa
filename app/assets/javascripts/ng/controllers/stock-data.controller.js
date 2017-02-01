fideligard.controller('StockDataCtrl', [
  '$scope', '$window', '$timeout', '$filter', 'dateService', 'stockDataService',
  function($scope, $window, $timeout, $filter, dateService, stockDataService){
    var el = document.getElementById('stock-data-body'),
        panel = el.parentElement,
        rowHeight = 37;
        $scope.offset = {
          new: 0,
          last: 0,
          begin: 0
        }

    var _resetOffset = function _resetOffset(){
      angular.copy({
        new: 0,
        last: 0,
        begin: 0
      }, $scope.offset)
    }

    $scope.currentDate = dateService.get();
    stockDataService.historic().then(function(data){
      $scope.quotes = data;
      _resetOffset();
    })

    $scope.$on('dateChange', function(e, date) {
      stockDataService.update(date).then(function(){
        _resetOffset();
      })
      $scope.currentDate = date;
    });


    //
    // var setVisible = function setVisible(scroll){
    //   var panelHeight = parseInt($window.getComputedStyle(panel).height),
    //       firstEl = _calcFirst(scroll) - 25
    //       lastEl = _calcFirst(scroll) + 25 + Math.ceil(panelHeight/rowHeight)
    //       quotes = $filter('objArray')($scope.quotes);
    //
    //   for(var i = 0; i < quotes.length; i++){
    //     if(i > firstEl && i < lastEl){
    //       quotes[i].watch = true;
    //     }
    //     else {
    //       quotes[i].watch = false;
    //     }
    //   }
    //
    //   $scope.visibleList = quotes;
    // }

    var _calcFirst = function _calcFirst(scroll){
      return Math.floor(($scope.offset.new/rowHeight));
    }

    var delayedExec = function(after, fn) {
        var timer;
        return function() {
            timer && $timeout.cancel(timer);
            timer = $timeout(fn, after);
        };
    };

    $scope.nextPage = function nextPage(){
      $scope.offset.begin += 100
    }

    var _debouncer = delayedExec(100, function() {
        if($scope.offset.new > $scope.offset.last){
          var newOffset = _calcFirst() > 50 ? Math.floor(_calcFirst()/25) - 1 : 0;
          $scope.offset.begin += newOffset * 25;
          el.scrollTop -= rowHeight * newOffset * 25;
        } else if($scope.offset.new < $scope.offset.last) {
          var newOffset = _calcFirst() < 50 ? 25 : 0;
          if($scope.offset.begin <= newOffset){
            el.scrollTop += rowHeight * $scope.offset.begin;
            $scope.offset.begin = 0
          } else{
            $scope.offset.begin -= newOffset;
            el.scrollTop += rowHeight * newOffset;
          }
        }
        $scope.offset.last = el.scrollTop;
    });


    angular.element(el).on('scroll', function (e) {
      $scope.offset.new = e.target.scrollTop;
      _debouncer()
    });
  }
])
