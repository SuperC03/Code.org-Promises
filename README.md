# Code.org-Promises
Adding Promises to [code.org's](https://code.org) App Lab

### The Story
After years (1) of being subjected to using callbacks and the word 'function' in AP Comp. Sci. Principles, something had to change. We still don't have fat arrow functions (RIP), but we can do that other thing (I think).

### Usage
It works identically to how normal JS promises do (I'm Hoping), and all you have to do is paste the contents of Promise.js to the top (or bottom, I don't really care) of your project and it should work. MDN has a great article on Promises [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). 

### Example
```javascript
  var thing = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("Resolved");
    }, 1000);
    setTimeout(function() {
      reject("Rejected");
    }, 3000);
  });

  thing
    .then(function(res) {
      console.log(res);
    })
    .then(function() {
      console.log("Hey");
    })
    .finally(function() {
      console.log("Finally Done :)");
    })
    .catch(function(err){
      console.log(err);
    });
```

### Closing
If this works for you (and you're still here), I hope it can help you better your code. Please bring up an issue if you find any errors or have a suggestion. Peace Out😃
