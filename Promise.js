function Promise(_executable /* Gives User Access to 'resolve()' and 'reject()' */ ) {

  var state = "unknown";
  var thenables = []; // All 'then' Callback Functions
  var catchables = []; // All 'catch' Callback Functions
  var finalables = []; // All 'final' Callback Functions
  var catchablesComplete = false,
    thenablesComplete = false; // If All 'catch' and 'then' Have Been Executed
  var thisPromise = this; // To Allow Chaining of Functions by Returning This Instance

  this._runCatchable = function (error) {
    if (this.state == "resolved") {
      return;
    }
    this.state = "reject";
    catchables.forEach(function (catchable) { // Cycles Through All 'Catchables'
      catchable(error); // Executes the 'Catchable'
    });
    catchablesComplete = true; // Indicates All 'Catchables' Have Been Executed
    if (catchablesComplete) { // Checks if All 'Thenables' and 'Catchables' Have Been Executed
      finalables.forEach(function (finalable) { // Cycles Through All 'Finalables'
        finalable(); // Executes the 'Finalable'
      });
    }
  }

  this._runThenables = function (response) {
    if (this.state == "reject") {
      return;
    }
    this.state = "resolved";
    thenables.forEach(function (thenable) { // Cycles Through All 'Thenables'
      thenable(response); // Executes the 'Thenable'
    });
    thenablesComplete = true; // Indicates All 'Thenables' Have Been Executed
    if (thenablesComplete) { // Checks if All 'Thenables' and 'Catchables' Have Been Executed
      finalables.forEach(function (finalable) { // Cycles Through All 'Finalables'
        finalable(); // Executes the 'Finalable'
      });
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