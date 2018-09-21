fetch("/calendar").then(res => res.json()).then(function(data){
  data.events.forEach(function(item, idx){
    $("#eventsTable tbody").append(`
      <td>${item.name}</td>
      <td>${item.date} | ${item.time}</td>
    `);
  });
});
