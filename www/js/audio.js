function playOpenModalSound() {
    var audio = document.getElementById('openModal');
    audio.currentTime = 0;
    audio.play();
}

function playCloseModalSound() {
    var audio = document.getElementById('closeModal');
    audio.currentTime = 0;
    audio.play();
}

function playBranchSound() {
    var audio = document.getElementById('branchOption');
    audio.currentTime = 0;
    audio.play();
}

$(document).ready(function () {

    $("#store").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-shop fa-2x" aria-hidden="true"></i>');
        loadpage('modal-body', 'html/store.html')
    });

    $("#items").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-briefcase fa-2x" aria-hidden="true"></i>');
        loadpage('modal-body', 'html/items.html')
    });

    $("#discoveries").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-compass fa-2x" aria-hidden="true"></i>');
        loadpage('modal-body', 'html/items.html')
    });

    $("#options").click(function () {
        playOpenModalSound();
        $('.modal-title').html('<i class="fa fa-bars fa-2x" aria-hidden="true"></i>');
        loadpage('modal-body', 'html/options.html')
    });

    $(".btn-close").click(function () {
        playCloseModalSound();
    });

    $(".menu-item").on('click', function () {
        alert('click');
        playOpenModalSound();
    });

});