function triggerHealthReward(rewardValue) {

    var reward = parseInt($('#health').text()) + rewardValue;
    localStorage.setItem("health", reward);
    $('#health').text(reward);

    LongToast.fire({
        title: '<small style="color: tomato;margin:5px;font-size:10px">Daily Reward <strong>+</strong> <i class="fa fa-heart"></i> '+rewardValue+' Health</small> <br>'
    });

}

function triggerEnergyReward(rewardValue) {

    var reward = parseInt($('#energy').text()) + rewardValue;
    localStorage.setItem("energy", reward);
    $('#energy').text(reward);

    LongToast.fire({
        title: '<small style="color: lightblue;margin:5px;font-size:10px">Daily Reward <strong>+</strong> <i class="fa fa-bolt"></i> '+rewardValue+' Energy</small> <br>'
    });

}

function triggerStrengthReward(rewardValue) {

    var reward = parseInt($('#strength').text()) + rewardValue;
    localStorage.setItem("strength", reward);
    $('#strength').text(reward);

    LongToast.fire({
        title: '<small style="color: burlywood;margin:5px;font-size:10px">Daily Reward <strong>+</strong> <i class="fa fa-hand-fist"></i> '+rewardValue+' Strength</small> <br>'
    });

}

function triggerGoldReward(rewardValue) {

    var reward = parseInt($('#gold').text()) + rewardValue;
    localStorage.setItem("gold", reward);
    $('#gold').text(reward);

    LongToast.fire({
        title: '<small style="color: gold;margin:5px;font-size:10px">Daily Reward <strong>+</strong> <i class="fa fa-coins"></i> '+rewardValue+' Gold</small> <br>'
    });

}

function triggerRewards(){

    setTimeout(function(){
            triggerHealthReward(100);
        }, 2000)

        
        setTimeout(function(){
            triggerEnergyReward(100);
        }, 4000)

        setTimeout(function(){
            triggerStrengthReward(100);
        }, 6000)

        setTimeout(function(){
            triggerGoldReward(100);
        }, 8000)

}


$(document).ready(function () {

    var today = new Date();
    var formattedDate = today.toISOString().split('T')[0];
    today.setHours(0, 0, 0, 0);

    if (localStorage.getItem("rewardDate") == null) {
        localStorage.setItem("rewardDate", formattedDate);
        triggerRewards();
    }

});