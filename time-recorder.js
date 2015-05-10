// Simple time recorder js script in Atom editor
// By Mikey Beck
// Note: Rounds to nearest 5 minutes

//TODO: Total for each day/client - done?
//TODO: Only have one *in progress* per file, don't need to be on same line to use it..maybe?


//window.$ = window.jQuery = require('./jquery.js');
//require('./date.js');

insertCurrentTime = function(editor, startTime) {

  var coeff = 1000 * 60 * 5;
  startTime = new Date(startTime);
  var nowRounded = new Date(Math.round(startTime.getTime() / coeff) * coeff); //round to nearest 5 mins
  //var nowFormatted = nowRounded.toString('dd/MM/yyyy hh:mmtt');

  var nowFormatted = new Date(nowRounded).toFormattedString();

  return editor.insertText(nowFormatted + ' *In progress* ');
};

calculateTimeTaken = function(editor, line) {
    var endTime = new Date();
    var coeff = 1000 * 60 * 5;
    var endTimeRounded = new Date(Math.round(endTime.getTime() / coeff) * coeff); //round to nearest 5 mins

    // Get startTime from line
    startTimeFormatted = line.substr(0, 14);
    console.log(startTimeFormatted);

    startTime = startTimeFormatted;
    startTime2 = startTimeFormatted;

    //Transpose day & month
    startTime = startTime.replaceAt(0, startTime2.substr(3,2));
    console.log('starttime ' + startTime);
    startTime = startTime.replaceAt(3, startTime2.substr(0,2));
    console.log('starttime ' + startTime);

    startTime = new Date(startTime);


    //diff is number of ms between start & end times
    var diff = endTimeRounded.getTime() - startTime.getTime();

    var x;
    var seconds;
    var minutes;
    var hours;
    var ms = diff;
    var days;

    x = ms / 1000
    seconds = Math.trunc(x % 60);
    x /= 60
    minutes = Math.trunc(x % 60);
    x /= 60
    hours = Math.trunc(x % 24);
    x /= 24
    days = Math.trunc(x);

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    console.log(diff);
    console.log(seconds);
    console.log(minutes);
    console.log(hours);
    console.log(days);

    //Get line, replace *In progress* with time taken etc
    var workDone = line.substr(29);

    editor.moveToBeginningOfLine();
    editor.selectToEndOfLine();

    var endTimeOnly = endTimeRounded.toFormattedString().substr(9,14);
    var updatedTime = startTimeFormatted + ' - ' + endTimeOnly;
    var timeTaken = '(' + hours + ':' + minutes + ')';
    return editor.insertText(updatedTime + ' ' + timeTaken + ' ' + workDone);
};

calculateTotalTime = function(editor, selectedText) {

	var totalHours = 0;
    var totalMinutes = 0;

    lines = selectedText.split("\n");

    for(var i = 0;i < lines.length;i++) {
        var duration = lines[i].substr(24, 5);
        var hours = duration.substr(0,1);
        var minutes = duration.substr(2,2);
        console.log(duration);
        console.log(hours);
        console.log(minutes);

        if (isInt(hours) && isInt(minutes)) {
            totalHours = totalHours + parseInt(hours,10);
            console.log(totalHours);
            totalMinutes = totalMinutes + parseInt(minutes,10);
            console.log(totalMinutes);
        }
    }

    console.log(totalMinutes / 60);
    totalHours += Math.trunc(totalMinutes / 60);
	totalMinutes = (totalMinutes % 60);
    if (totalMinutes === 5) {
        totalMinutes = '05';
    } else if (totalMinutes === 0) {
        totalMinutes = '00';
    }

    editor.moveToEndOfLine();
    editor.insertText("Total: (" + totalHours + ":" + totalMinutes + ")");

    function isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }

};

atom.workspaceView.command('dot-atom:time-recorder', function() {
  var editor;
  editor = atom.workspace.activePaneItem;

  var selectedText = editor.getSelectedText();
  if (!selectedText) {

      editor.moveToBeginningOfLine();
      editor.selectToEndOfLine();
      var line = editor.getSelectedText();
      editor.moveToEndOfLine();

      var now = new Date();
      console.log(now);

      if (line.indexOf('*In progress*') > -1) {
          return calculateTimeTaken(editor, line);
      } else {
          return insertCurrentTime(editor, now);
      }
  } else { //Text selected, calculate total time
      calculateTotalTime(editor, selectedText);
  }
});

String.prototype.padLeft = function (length, character) {
    return new Array(length - this.length + 1).join(character || ' ') + this;
};

Date.prototype.toFormattedString = function () {
    return [String(this.getDate()).padLeft(2, '0'),
            String(this.getMonth()+1).padLeft(2, '0'),
            String(this.getFullYear()).substr(2, 2)].join("/") + " " +
           [String(this.getHours()).padLeft(2, '0'),
            String(this.getMinutes()).padLeft(2, '0')].join(":");
};

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};
