function Promise (_executable) {
  
  var thenables = [];
  var catchables = [];
  var finalables = [];
  var catchablesComplete = false, thenablesComplete = false;
  var thisPromise = this;
  
  _executable(function(response) {
    thenables.forEach(function(thenable) {
      thenable(response);
    });
    thenablesComplete = true;
    if(thenablesComplete && catchablesComplete) {
      finalables.forEach(function(finalable) {
        finalable();
      });
    }
  }, function(error) {
    catchables.forEach(function(catchable) {
      catchable(error);
    });
    catchablesComplete = true;
    if(thenablesComplete && catchablesComplete) {
      finalables.forEach(function(finalable) {
        finalable();
      });
    }
  });
  
  this.then = function(_thenable) {
    thenables.push(_thenable);
    return thisPromise;
  };
  this.catch = function(_catchable) {
    catchables.push(_catchable);
    return thisPromise;
  };
  this.finally = function(_finalable) {
    finalables.push(_finalable);
    return thisPromise;
  };
}
