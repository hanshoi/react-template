/* 
   We need to use react in a commonjs way now as we are using browserify transformations.
   Therefore we need to require parent module before using it.
*/
var Parent = require('./parent.js'); 
React.render(<Parent />, document.getElementById('app'));
