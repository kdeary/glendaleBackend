'use strict';
module.exports = function(app) {
  var GD = require('../controllers/GDController');

  // GD Routes
  app.route('/calendar/')
    // Get Glendale Calendar
    .get(GD.get_calendar);
};
