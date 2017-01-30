fideligard.filter('objArray', [
  function(){
    return function(obj){
      var toArray = [];
      for (var i in obj) {
        toArray.push(obj[i]);
      }
      return toArray;
    };
  }
]);
