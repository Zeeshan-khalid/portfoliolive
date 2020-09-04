var date = new Date();
var date1 = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0' + minutes : minutes;
var strTime = date1 + ' - ' + hours + ':' + minutes + ' ' + ampm;
var cTimeZone = date.toString().split('(');
cTimeZone = cTimeZone[1].toString().split(')');
cTimeZone = cTimeZone[0];
// $.getJSON('https://ipinfo.io/?token=40bdeb367b7535', function (data) {
//   UserIP = data.query;
//   data['query'] = data.ip;
//   data.time = strTime;
//   data.cTimeZone = cTimeZone;
//   ipInfo = data;
//   $.post("/api/v1/visit", data, function (data) { });
// });
/**********************************/
/*********** 1.0 Countdown ********/
/**********************************/
// $(window).on("load", function () {
//   $("#countdown").countdown($("#countdown").attr("data-time"), function (e) {
//     $(this).html(e.strftime("<div>%D<span>Days</span></div> <div>%H<span>Hours</span></div> <div>%M<span>Minutes</span></div> <div>%S<span>Seconds</span></div>"))
//   });
// });



