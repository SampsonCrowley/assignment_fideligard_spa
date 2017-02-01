fideligard.filter('portfolioSort', [
  '$filter', '_', 'portfolioSortService',
  function($filter, portfolioSortService){
    return function(items, filt, reverse, comparator){
      return $filter('orderBy')(items, portfolioSortService[filt], reverse, comparator)
    }
  }
])
