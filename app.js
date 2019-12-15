/*
  main entry file
  entry file for serving the express app
*/
/*
 * Module dependencies
 */
const express = require('express');
const bodyparser = require('body-parser');

/*
 * Create Express server
 */
const app = express();
app.set('port', 4000);

const RouterU = require('./routes');

/*
 * Express configuration
 */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.use('/', RouterU);

app.use((req,res) => {
    res.status(404).json({ msg: 'not found' });
})

/*
 * Starts Express Server
 */
function listen() {
  const server = app.listen(app.get('port'), () => {
    console.log(
      'App is running at http://localhost:%d',
      app.get('port'),
    );
    console.log('  Press CTRL-C to stop\n');
  });
}

module.exports = { app, listen };