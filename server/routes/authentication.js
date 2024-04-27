var express = require('express');
var axios = require('axios');
var app = express();
var authFlow = require('./helper/authflowSwitcher');

/**
 * @param {{ flow_choices: any[]; }} result
 * @param {any} choice
 */
function choiceIsAvailable(result, choice) {
  let filter = result.flow_choices.filter(function (fc) {
    return fc.choice === choice;
  });

  return filter.length > 0;
}

app.post('/signin', async (req, res) => {
  (async () => {
    try {
      const result = await authFlow('SIGN_IN', req.body);
      res.json(result);
    } catch (error) {
      res.status(401).json({ status: 'error', message: error.message });
    }
  })();
});

module.exports = app;
