//'use strict';

let cors = require('cors');
let fetch = require('node-fetch');
let cheerio = require('cheerio');
// let mongoose = require('mongoose');
// let User = mongoose.model('User');

let current_psa = "TEST PSA";

exports.get_calendar = function(req, res) {
  fetch("https://streamlyne.stream:88/proxy?link=https://www.glendaleca.gov/residents/calendar").then(raw => raw.text()).then(function(html){
    let $ = cheerio.load(html);
    let events = [];
    let month = $(".current_month_title").text().trim().split(" ");

    Array.from($(".calendar.calendar_grid.calendar-mini-grid-grid tbody td:not(.calendar_othermonthday)")).forEach(function(dayChild, idx){
      Array.from($(dayChild).find(".calendar_items .calendar_item")).forEach(function(eventChild, idx){
        let timeDiff = (new Date(month[0] + " " + $(dayChild).text().trim().split("\n")[0] + ", " + month[1]) - Date.now());

        console.log(timeDiff);
        if(timeDiff > 0){
        	let event = {
            date: month[0] + " " + $(dayChild).text().trim().split("\n")[0],
        		time: $(eventChild).find(".calendar_eventtime").text(),
            link: "https://www.glendaleca.gov" + $(eventChild).find(".calendar_eventlink").attr("href"),
            name: $(eventChild).find(".calendar_eventlink").text()
        	};

          events.push(event);
        }
      });
    });

    res.json({
      month: month[0],
      year: month[1],
      events: events
    });
  });
};

exports.get_psa = function(req, res) {
  res.json({
    psa: current_psa
  });
};

exports.set_psa = function(req, res) {
  current_psa = req.body.psa;
  res.json({
    psa: current_psa
  });
};
