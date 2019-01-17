// startChat();

// document.querySelector(".button-start").onclick = function(e) {
//     startChat();
// }

// function startChat() {
//     var $ = document.querySelector(".chatroom-dark-cover");
//     var siblings = $.parentNode.children;
//     for (var i = 0; i < siblings.length; i++) {
//         siblings[i].classList.remove("hide");
//     }
//     $.classList.add("hide");
// }
var enjoyhint_instance = new EnjoyHint({
    onEnd: function() {
        document.querySelector(".chatroom-dark-cover").classList.remove("hide");
    },
    onSkip: function() {
        document.querySelector(".chatroom-dark-cover").classList.remove("hide");
    }
});

var isModerator = false;

var tabItems = Array.from(document.querySelectorAll(".overview-tab-item"));
var questions = Array.from(document.querySelectorAll(".overview-sections-wrapper"))
var input = document.querySelector(".input-list-new");
var chatInput = document.querySelector(".chatbox-input");

tabItems.forEach(function(ele, i) {
    ele.onclick = function(e) {
        if (ele.classList.contains("active")) return;

        makeTabsInactive();
        ele.classList.add("active");
        makeQuestionsInactive();
        document.getElementById("question" + ele.id[4]).classList.remove("hide");
    }
});

input.onkeypress = function(e) {
    if (e.keyCode == 13) {
        addItem(input.value);
        input.value = "";
    }
}

chatInput.onkeypress = function(e) {
    if (e.keyCode == 13) {
        addChat(chatInput.value);
        chatInput.value = "";
        return false;
    }
}


function addItem(val) {
    var item = document.createElement("div");
    item.className = "section-list-item";
    item.innerHTML = '<a class="list-item-like"><i class="material-icons">thumb_up</i></a>'
        + '<div class="section-item-content"> <div class="section-item-bar-wrapper"> <div class="section-item-bar" style="width: 0%"></div> </div> <div class="section-item-text">' 
        + val
        + '</div> <div class="section-item-population">(0/5)</div>';
    document.querySelector(".current .overview-section-list").insertBefore(item, document.querySelector(".input-container"));
}

function addChat(val) {
    var item = document.createElement("div");
    var user = (isModerator) ? "사회" : "P2";

    item.className = "chatroom-utterances-wrapper";
    item.innerHTML = '<div class="chatroom-utterances-container"> <div class="user-box current">' + user + '</div> <div class="chatroom-utterances-text">' 
        + val + '</div></div>';
    document.querySelector(".chatroom-content-wrapper").appendChild(item);
}

function makeTabsInactive() {
    tabItems.forEach(function(ele) {
        ele.classList.remove("active");
    })
}

function makeQuestionsInactive() {
    questions.forEach(function(ele) {
        ele.classList.add("hide");
    })
}

function countVote() {
    var container = this.parentElement;
    container.classList.add("active");
    container.querySelector(".section-item-population").innerText = "(1/5)";
    container.querySelector(".section-item-bar").style.width = 1/5*100 + "%";
    enjoyhint_instance.trigger("next");
}