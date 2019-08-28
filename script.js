$(document).ready(function() {

  var myTimer;

  function clock() {

    // VARIABLES
    var minutes = 25;
    var updateMinutes = 25;
    var interval = 5
    var breakTime = 5;
    var on;
    var isPaused = false;

    function startTimer(duration, display) {
      var timer = duration -2, minutes, seconds;
      myTimer = setInterval(function() {
        if (!isPaused) {
          $('#workOrBreak').text('Work');
          $('#time').removeClass('breakTime')
          $('#time').addClass('working');
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.text(minutes + ":" + seconds);

          if (--timer < 0) {
            clearInterval(myTimer);
            duration = 60 * interval;
            startBreakTimer(duration, display);
          }
        }
      }, 1000);
    };

    function startBreakTimer(duration, display) {
      var timer = duration -1, minutes, seconds;
      myTimer = setInterval(function() {
        if (!isPaused) {
          $('#workOrBreak').text('Break');
          $('#time').removeClass('working')
          $('#time').addClass('breakTime');
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.text(minutes + ":" + seconds);

          if (--timer < 0) {
            clearInterval(myTimer);
            minutes = updateMinutes;
            duration = 60 * minutes
            startTimer(duration, display);
          }
        }
      }, 1000);
    }

    $('#play').click(function() {
      isPaused = false;
      if (on === true) {
        $(this) === null;
      } else {
        on = true;
        $('#time').addClass('working');
        if (minutes <= 10) {
          $('#time').text('09' + ':59')
        } else {
          $('#time').text(minutes -1 + ':59')
        }
          var time = 60 * minutes
          display = $('#time');
          startTimer(time, display);
          $('.knobs').slideUp('slow');

      };
    });



    function updateTime() {
      $('#time').text(minutes + ":00");
      $('#update-work-minutes').text(minutes);
    }

    function updateBreakTime() {
      $('#break-minutes').text(interval);
    }



    // WORKING MINUTES UPDATE
    $('#work-up').click(function() {
      if (minutes == 60) {
        $('#work-up') === null;
      } else {
        minutes += 1;
        updateMinutes = minutes;
        updateTime(minutes);
      }
    });

    $('#work-down').click(function() {
      if (minutes == 10) {
        $('#work-down') === null;
      } else {
        minutes -= 1;
        updateMinutes = minutes;
        updateTime(minutes);
      }
    });



    // BREAK MINUTES UPDATE
    $('#break-up').click(function() {
      if (interval == 20) {
        $('#break-up') === null;
      } else {
        interval += 1;
        updateBreakTime(interval);
      }
    });

    $('#break-down').click(function() {
      if (interval == 1) {
        $('#break-down') === null;
      } else {
        interval -= 1;
        updateBreakTime(interval);
      }
    });


    // ICONS
    $('#stop').click(function() {
      on = false;
      clearInterval(myTimer);
      $('#time').text(updateMinutes + ':00').removeClass();
      $('#workOrBreak').text('Work');
      $('.knobs').slideDown('fast');
    })

    $('#reset').click(function() {
      on = false;
      clearInterval(myTimer);
      $('.knobs').slideDown('fast');
      $('#update-work-minutes').text('25');
      $('#break-minutes').text('5');
      $('#workOrBreak').text('Work');
      minutes = 25;
      interval = 5;
      breakTime = 5;
      updateMinutes = 25;
      $('#time').text(minutes + ':00').removeClass();
    })

    $('#pause').click(function(e) {
      e.preventDefault()
      isPaused = true;
    })

  };


  clock()

})
