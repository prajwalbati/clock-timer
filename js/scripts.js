// display current date
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var setCurrentDateTime = function() {
    var today = new Date();
    var year = today.getFullYear();
    var month = MONTHS[today.getMonth()];
    var day = today.getDate();
    var dayName = WEEK_DAYS[today.getDay()];
    var dateItem = dayName+", "+month+" "+day+", "+year;
    document.querySelector('#currentDateTime .clock .date').innerHTML = dateItem;

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    document.querySelector('#currentDateTime .clock .time .hours').innerHTML = hours;
    document.querySelector('#currentDateTime .clock .time .minutes').innerHTML = minutes;
    document.querySelector('#currentDateTime .clock .time .seconds').innerHTML = seconds;
};

setInterval(setCurrentDateTime, 1000);

// display current date ends


var schedule = [
    ['Jul 25 2018', 'Sept 20 2018'],
    ['Sept 21 2018', 'Jul 25 2018'],
    ['Jul 25 2018', 'Jul 25 2038']
];

var timeInMinutes = 10;
var currentTime = Date.parse(new Date());

// to store in cookie
// if there's a cookie with the name myClock, use that value as the deadline
if(document.cookie && document.cookie.match('myClock')){
  // get deadline value from cookie
  var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
}

// otherwise, set a deadline 10 minutes from now and 
// save it in a cookie with that name
else{
  // create deadline 10 minutes from now
  var timeInMinutes = 10;
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + timeInMinutes*60*1000);

  // store deadline in cookie for future reference
  document.cookie = 'myClock=' + deadline + '; path=/;';
}

        // console.log(deadline);
        initializeClock("clockdiv", deadline);

// to take schedule dates
        // iterate over each element in the schedule
// for(var i=0; i<schedule.length; i++){
//   var startDate = schedule[i][0];
//   var endDate = schedule[i][1];

//   // put dates in milliseconds for easy comparisons
//   var startMs = Date.parse(startDate);
//   var endMs = Date.parse(endDate);
//   var currentMs = Date.parse(new Date());

//   // if current date is between start and end dates, display clock
//   if(endMs > currentMs && currentMs >= startMs ){
//       initializeClock('clockdiv', endDate);
//   }
// }

        function getTimeRemaining(endDate) {
            var t = Date.parse(endDate) - Date.parse(new Date());
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime){
            var clock = document.getElementById(id);
            clock.style.display = 'block';
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');
            function updateClock(){
                var t = getTimeRemaining(endtime);
                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
                if(t.total<=0){
                    clearInterval(timeinterval);
                }
            }

            updateClock(); // run function once at first to avoid delay
            var timeinterval = setInterval(updateClock, 1000);
        }