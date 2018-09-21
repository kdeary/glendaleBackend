//'use strict';

let cors = require('cors');
let fetch = require('node-fetch');
let cheerio = require('cheerio');
// let mongoose = require('mongoose');
// let User = mongoose.model('User');

exports.get_calendar = function(req, res) {
  fetch("https://streamlyne.stream:88/proxy?link=https://www.glendaleca.gov/residents/calendar").then(raw => raw.text()).then(function(html){
    let $ = cheerio.load(html);
    let days = [];

    Array.from($(".calendar.calendar_grid.calendar-mini-grid-grid tbody td:not(.calendar_othermonthday)")).forEach(function(dayChild, idx){
    	let day = {
    		date: $(dayChild).text().trim().split("\n")[0],
        events: []
    	};

      Array.from($(dayChild).find(".calendar_items .calendar_item")).forEach(function(eventChild, idx){
      	let event = {
      		time: $(eventChild).find(".calendar_eventtime").text(),
          name: $(eventChild).find(".calendar_eventlink").text()
      	};

        day.events.push(event);
      });

      days.push(day);
    });

    res.json({
      events: days
    });
  });
};
