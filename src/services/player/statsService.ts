$(document).ready(function () {

    if (localStorage.getItem("health") == null) {
        localStorage.setItem("health", '100');
    }

    if (localStorage.getItem("energy") == null) {
        localStorage.setItem("energy", '100');
    }

    if (localStorage.getItem("strength") == null) {
        localStorage.setItem("strength", '100');
    }

    if (localStorage.getItem("gold") == null) {
        localStorage.setItem("gold", '100');
    }

    $(".health").text(localStorage.getItem("health"));
    $(".energy").text(localStorage.getItem("energy"));
    $(".strength").text(localStorage.getItem("strength"));
    $(".gold").text(localStorage.getItem("gold"));

});

loadpage('main-content', 'html/branches.html');
getBranches();