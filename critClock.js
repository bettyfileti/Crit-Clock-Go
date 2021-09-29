let time1;
let time2;
let totalTimeForCrit;
let timeAvailable;
let timePadding = 1; //Possible variable in future

//--------------------------------------------------------------
//Get the time inputs from the user

var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var valueStartTime = document.getElementById("valueStartTime");
var valueEndTime = document.getElementById("valueEndTime");


startTime.addEventListener("input", function () {
    valueStartTime.innerText = startTime.value;
}, false);

endTime.addEventListener("input", function () {
    valueEndTime.innerText = endTime.value;
}, false);

//--------------------------------------------------------------
//Set the start values for participants, hot seat time, and break time
//Make Event Listeners for participants, hot seat time, and break time
let participants = document.getElementById("participants");
let hotSeatTime = document.getElementById("hotSeatTime");
let breakTime = document.getElementById("breakTime");
let valueParticipants = 5;
let valueHotSeatTime = 0;
let valueBreakTime = 10;


participants.addEventListener("input", function () {
    valueParticipants = parseInt(participants.value);
});

breakTime.addEventListener("input", function () {
    valueBreakTime = parseInt(breakTime.value);
});

//--------------------------------------------------------------
//Setup the Padding Checkbox
let addPadding = document.getElementById("addPadding");
let valueAddPadding = true;

addPadding.addEventListener("click", function () {
    valueAddPadding = !valueAddPadding;
});

//--------------------------------------------------------------
//Do the math to determine Total Minutes for Crit. Run on load and when something changes.

let breakBonus = document.getElementById("breakBonus");
let breakBonusText = document.getElementById("breakBonusText");
let bonusAlertDiv = document.getElementById("bonusAlert");

doTheMath();
document.addEventListener("change", doTheMath);

function doTheMath() {
    console.log("----");
    console.log("Doing the math...")

    //Ensure that you are starting with the current values
    valueBreakTime = parseInt(breakTime.value);
    valueParticipants = parseInt(participants.value);
    

    time1 = endTime.valueAsNumber;
    time2 = startTime.valueAsNumber;
    totalTimeForCrit = (time1 - time2) / 60000;

    //account for PM --> AM
    if (totalTimeForCrit < 0) {
        totalTimeForCrit = 1440 + totalTimeForCrit;
    };

    //Subtract breaktime and padding to determine total minutes available
    if (valueAddPadding) {
        timeAvailable = totalTimeForCrit - valueBreakTime;
        timeAvailable = timeAvailable - (valueParticipants * timePadding);
    } else {
        timeAvailable = totalTimeForCrit - valueBreakTime;
    }

    //Determine Time in the Hot Seat
    valueHotSeatTime = Math.floor(timeAvailable / valueParticipants);
    hotSeatTime.innerText = valueHotSeatTime;
    hotSeatTime2.innerText = valueHotSeatTime;


    //Bonus, you can take a longer break <-- ADD-ON
    //Determine the maximum break time that one could make
    timeBeingUsed = (valueHotSeatTime * valueParticipants);

    let extraTime = timeAvailable - timeBeingUsed;

    if (extraTime != 0) {
        valueBreakTime = valueBreakTime + extraTime;
        breakBonus.innerText = valueBreakTime;
        breakBonusText.style.display = "block";
        document.getElementById("bonusAlert").style.display = "block";
    } else {
        breakBonusText.style.display = "none";
        document.getElementById("bonusAlert").style.display = "none";
    }

}


