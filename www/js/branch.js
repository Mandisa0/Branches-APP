// let apiUrl = "http://127.0.0.1:5000/";
var apiUrl = "https://phantomstudio.co.za/branches/";
let currenBranchTitle = '';
let currentBranchImage = '';
let currentBranchFile = '';
let nextBranchFile = '';
let currentBranchId = 1;

function setCurentBranchTitlte(branchTitle) {
    currenBranchTitle = branchTitle;
}

function setCurentBranchFile(branchTitle) {
    currenBranchTitle = branchTitle;
}

function setCurentBranch(branchTitle, branchFile) {

    currenBranchTitle = branchTitle;
    currentBranchFile = branchFile;
    localStorage.setItem(branchTitle, JSON.stringify({
        branchFile: currentBranchFile,
        branchId: currentBranchId
    }));

}

function formatNumberWithSign(number) {
    if (number > 0) {
        return "+" + number;
    } else {
        return String(number); // Convert to string for consistent output
    }
}

function initialiseBranch(object, branchId) {

    var audio = document.getElementById('branchOption');
    audio.currentTime = 0;
    audio.play();

    if (branchId != 1 && $(object).attr('data-health') != undefined) {

        health = parseInt(localStorage.getItem("health")) + parseInt($(object).attr('data-health'));
        energy = parseInt(localStorage.getItem("energy")) + parseInt($(object).attr('data-energy'));
        strength = parseInt(localStorage.getItem("strength")) + parseInt($(object).attr('data-strength'));
        gold = parseInt(localStorage.getItem("gold")) + parseInt($(object).attr('data-gold'));

        let toastext = '';

        if (parseInt($(object).attr('data-health')) != 0) {
            toastext += '<small style="color: tomato;margin:5px;font-size:10px"><i class="fa fa-heart"></i> ' + formatNumberWithSign($(object).attr('data-health')) + ' health</small><br>'
        }

        if (parseInt($(object).attr('data-energy')) != 0) {
            toastext += '<small style="color: lightblue;margin:5px;font-size:10px"><i class="fa fa-bolt"></i> ' + formatNumberWithSign($(object).attr('data-energy')) + ' energy</small><br>'
        }

        if (parseInt($(object).attr('data-strength')) != 0) {
            toastext += '<small style="color: burlywood;margin:5px;font-size:10px"><i class="fa fa-hand-fist"></i> ' + formatNumberWithSign($(object).attr('data-strength')) + ' strength</small><br>'
        }

        if (parseInt($(object).attr('data-gold')) != 0) {
            toastext += '<small style="color: gold;margin:5px;font-size:10px"><i class="fa fa-coins"></i> ' + formatNumberWithSign($(object).attr('data-gold')) + ' gold</small><br>'
        }


        let exit = false;

        if (health < 0) {
            toastext = '<small style="color: tomato;margin:5px;font-size:10px"><i class="fa fa-heart"></i> You do not have enough health</small><br>';
            exit = true;
        }

        if (energy < 0) {
            toastext = '<small style="color: lightblue;margin:5px;font-size:10px"><i class="fa fa-bolt"></i> You do not have enough energy</small><br>';
            exit = true;
        }

        if (strength < 0) {
            toastext = '<small style="color: burlywood;margin:5px;font-size:10px"><i class="fa fa-hand-fist"></i> You do not have enough strength</small><br>';
            exit = true;
        }

        if (gold < 0) {
            toastext = '<small style="color: gold;margin:5px;font-size:10px"><i class="fa fa-coins"></i> You do not have enough gold</small><br>';
            exit = true;
        }

        if (toastext != '') {
            Toast.fire({
                title: toastext
            });
        }

        if (exit == true) {
            return
        }

        $(".health").text(health);
        $(".energy").text(energy);
        $(".strength").text(strength);
        $(".gold").text(gold);

        localStorage.setItem("health", health);
        localStorage.setItem("energy", energy);
        localStorage.setItem("strength", strength);
        localStorage.setItem("gold", gold);

    }

    if (currenBranchTitle != '') {
        currentBranchId = branchId;
        setCurentBranch(currenBranchTitle, currentBranchFile);
    }

    var selectionClean = $(object).find('small').remove();
    selectionClean = $(object);
    var historyText = '<div class="responseChoice">' + selectionClean.text()+"</div>"+'<div class="responseText">'+$(".text").text()+'</div>';
    console.log('selection: ' + selectionClean.text())

    if(selectionClean.text() != ''){
    if (localStorage.getItem(currenBranchTitle + ".history") == null) {
        localStorage.setItem(currenBranchTitle + ".history", historyText);
    } else {
        localStorage.setItem(currenBranchTitle + ".history", historyText + localStorage.getItem(currenBranchTitle + ".history") );
    }
    }

    setTimeout(() => {
        $.ajax({
            async: true,
            type: "GET",
            dataType: "json",
            url: apiUrl + "initialise/branch",
            data: {
                branchId: branchId,
                branchFile: currentBranchFile
            },
            success: function (response) {

                if (branchId = 1) {
                    currentBranchImage = response.branchImage;
                    nextBranchFile = response.nextBranchFile;
                    $(".branchImage").attr('src', apiUrl + "get/image?imageFile=" + currentBranchImage);
                }

                $('.text').text(response.branchText)

                let branchOptions = '';

                for (i = 0; i < response.branchResponses.length; i++) {

                    let healthEffect = 0;
                    let energyEffect = 0;
                    let strengthEffect = 0;
                    let goldEffect = 0;

                    for (let j = 0; j < response.branchResponses[i].branchEffects.length; j++) {

                        if ('health' in response.branchResponses[i].branchEffects[j]) {
                            healthEffect = response.branchResponses[i].branchEffects[j].health;
                        }

                        if ('energy' in response.branchResponses[i].branchEffects[j]) {
                            energyEffect = response.branchResponses[i].branchEffects[j].energy
                        }

                        if ('strength' in response.branchResponses[i].branchEffects[j]) {
                            strengthEffect = response.branchResponses[i].branchEffects[j].strength
                        }

                        if ('gold' in response.branchResponses[i].branchEffects[j]) {
                            goldEffect = response.branchResponses[i].branchEffects[j].gold
                        }

                    }

                    let branchOptionRequirements = '';

                    if (healthEffect != 0) {
                        branchOptionRequirements += '<small style="color: tomato;">[<i class="fa fa-heart"></i> <b id="health">' + formatNumberWithSign(healthEffect) + '</b>]</small> ';
                    }

                    if (energyEffect != 0) {
                        branchOptionRequirements += '<small style="color: lightblue;">[<i class="fa fa-bolt"></i> <b id="energy">' + formatNumberWithSign(energyEffect) + '</b>]</small> ';
                    }

                    if (strengthEffect != 0) {
                        branchOptionRequirements += '<small style="color: burlywood;">[<i class="fa fa-hand-fist"></i> <b id="strength">' + formatNumberWithSign(strengthEffect) + '</b>]</small> ';
                    }

                    if (goldEffect != 0) {
                        branchOptionRequirements += '<small style="color: gold;">[<i class="fa fa-coins"></i> <b id="gold">' + formatNumberWithSign(goldEffect) + '</b>]</small> ';
                    }

                    branchOptions += '<div data-branch-id="' + response.branchResponses[i].branchId + '" data-health="' + healthEffect + '" data-energy="' + energyEffect + '" data-strength="' + strengthEffect + '" data-gold="' + goldEffect + '" onclick="initialiseBranch(this, ' + response.branchResponses[i].branchId + ')" class="option">' + response.branchResponses[i].response + ' ' + branchOptionRequirements + '</div>';
                }

                if (response.branchResponses.length == 0) {
                    currentBranchFile = nextBranchFile
                    branchOptions += '<div onclick="initialiseBranch(this, 1)" class="option">Continue</div>';
                }

                if(localStorage.getItem(currenBranchTitle + ".history") != null){
                $('.branchHistory').html("<div class='branchHistory'><b><i class='fa fa-clock-o'></i> Branch History</b><br><br>"+localStorage.getItem(currenBranchTitle + ".history"))+"</div>";
                $('.responseChoice').prepend("<i style='display:inline-block' class='fa fa-arrow-right'></i> ");
                }

                $('.branchOptions').html(branchOptions);

                $(".health").text(localStorage.getItem("health"));

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            },
            complete: function () {
                console.log("Request complete.");
            }
        });

    }, 500);
}