'use strict';
module.exports = function(app) {
  var GD = require('../controllers/GDController');

  // GD Routes
  app.route('/calendar/')
    // Get Glendale Calendar
    .get(GD.get_calendar);

  app.route('/psa/')
    // Get Glendale PSA
    .get(GD.get_psa)
    .post(GD.set_psa);
};
