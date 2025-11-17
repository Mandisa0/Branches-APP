function buyHealth(amount, cost) {

    if (!buy(cost)) {
        return;
    }

    var amountValue = parseInt($('.health').text()) + amount;
    localStorage.setItem("health", amountValue);
    $('.health').text(amountValue);

    var toast = '<small style="color: gold;margin:5px;font-size:10px"><strong>-</strong> <i class="fa fa-coins"></i> ' + cost + ' Gold</small> <br>';

    LongToast.fire({
        title: '<small style="color: tomato;margin:5px;font-size:10px"><strong>+</strong> <i class="fa fa-heart"></i> ' + amount + ' Health</small> <br>'+toast
    });

}

function buyEnergy(amount, cost) {

    if (!buy(cost)) {
        return;
    }

    var amountValue = parseInt($('.energy').text()) + amount;
    localStorage.setItem("energy", amountValue);
    $('.energy').text(amountValue);

    var toast = '<small style="color: gold;margin:5px;font-size:10px"><strong>-</strong> <i class="fa fa-coins"></i> ' + cost + ' Gold</small> <br>';

    LongToast.fire({
        title: toast + '<small style="color: lightblue;margin:5px;font-size:10px"><strong>+</strong> <i class="fa fa-bolt"></i> ' + amount + ' Energy</small> <br>'
    });

}

function buyStrength(amount, cost) {

    if (!buy(cost)) {
        return;
    }

    var amountValue = parseInt($('.strength').text()) + amount;
    localStorage.setItem("strength", amountValue);
    $('.strength').text(amountValue);


    var toast = '<small style="color: gold;margin:5px;font-size:10px"><strong>-</strong> <i class="fa fa-coins"></i> ' + cost + ' Gold</small> <br>';

    LongToast.fire({
        title: toast + '<small style="color: burlywood;margin:5px;font-size:10px"><strong>+</strong> <i class="fa fa-hand-fist"></i> ' + amount + ' Strength</small> <br>'+toast
    });

}

function buy(cost) {
    var gold = parseInt($('.gold').text()) - cost;

    if (gold < 0) {

        playCloseModalSound();

        LongToast.fire({
            title: '<small style="color: whitesmoke;margin:5px;font-size:10px"><i class="fa fa-info-circle"></i> You don\'t have enough gold</small> <br>'
        });

        return false
    }

    localStorage.setItem("gold", gold);
    $('.gold').text(gold);
    $('.storeGold').text(gold);

    playBranchSound();

    return true;
}