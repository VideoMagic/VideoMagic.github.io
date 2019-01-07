startChat();

document.querySelector(".button-start").onclick = function(e) {
    startChat();
}

function startChat() {
    var $ = document.querySelector(".chatroom-dark-cover");
    var siblings = $.parentNode.children;
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove("hide");
    }
    $.classList.add("hide");
}
