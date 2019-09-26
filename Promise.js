function Promise(_executable /* Gives User Access to 'resolve()' and 'reject()' */ ) {

  var state = "unknown";
  var thenables = []; // All 'then' Callback Functions
  var catchables = []; // All 'catch' Callback Functions
  var finalables = []; // All 'final' Callback Functions
  var catchablesComplete = false,
    thenablesComplete = false; // If All 'catch' and 'then' Have Been Executed
  var thisPromise = this; // To Allow Chaining of Functions by Returning This Instance

  this._runCatchable = function (response) {
    // This is to protect from both resolve and reject being run
    if (this.state == "resolved") {
      return;
    }
    this.state = "reject";
    if (catchables.length >= 1) {
      response = catchables[0](response);
      catchables.shift();
      thisPromise._runCatchable(response);
    } else {
      thisPromise._runFinalables(response);
    }
  }

  this._runThenables = function (response) {
    // This is to protect from both resolve and reject being run
    if (this.state == "reject") {
      return;
    }
    this.state = "resolved";
    if (thenables.length >= 1) {
      try {
        response = thenables[0](response);
        thenables.shift();
        thisPromise._runThenables(response);
      } catch (err) {
        this.state = "reject";
        thisPromise._runCatchable(err);
      }
    } else {
      thisPromise._runFinalables(response);
    }
  }

  this._runFinalables = function (response) {
    if (finalables.length >= 1) {
      response = finalables[0](response);
      finalables.shift();
      thisPromise._runFinalables(response);
    }
  }

  this.then = function (_thenable) { // Accepts a Function to be Called on 'resolve()'
    thenables.push(_thenable); // Add to the List of 'Thenables'
    return thisPromise; // Return Instance for Chaining
  };
  this.catch = function (_catchable) { // Accepts a Function to be Called on 'catch()'
    catchables.push(_catchable); // Add to the List of 'Catchables'
    return thisPromise; // Return Instance for Chaining
  };
  this.finally = function (_finalable) { // Accepts a Function to be Called When all Others are Complete
    finalables.push(_finalable); // Add to the List of 'Finalables'
    return thisPromise; // Return Instance for Chaining
  };

  _executable(this._runThenables, this._runCatchable);
}