fideligard.filter('symbol',[
  '_',
  function(_){
    return function(obj, str){
      if(!str) return obj;
      var arr = [];
      for(prop in obj){
        if(prop.indexOf(str.toUpperCase()) !== -1) arr.push(obj[prop])
      }
      return arr;
    }
  }
])
