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
var enjoyhint_instance;
var timer;
var serverHost = "http://143.248.249.114:4000/room/index.html"
var amModerator = ( document.location.pathname.includes("moderator") ) ? true : false;

function init() {
    enjoyhint_instance = new EnjoyHint({
        onStart: function() {
            document.querySelector(".chatroom-dark-cover").classList.add("hide");
        },
        onEnd: function() {
            document.querySelector(".chatroom-dark-cover").classList.remove("hide");
            timer.stop();
        },
        onSkip: function() {
            document.querySelector(".chatroom-dark-cover").classList.remove("hide");
            timer.stop();
        }
    });
    if (amModerator)
        enjoyhint_instance.set(enjoyhint_steps_moderator)
    else
        enjoyhint_instance.set(enjoyhint_steps);
    enjoyhint_instance.run();

    timer = new easytimer.Timer();
    timer.start();
    timer.addEventListener('secondsUpdated', function (e) {
        var time = timer.getTimeValues();
        $('.chatroom-info-content').html(("0" + time.minutes).slice(-2) + ":" + ("0" + time.seconds).slice(-2));
    });

    document.getElementById("goToRoom").onclick = function(e) {
        var roomNum = document.getElementById("roomNum").value;
        window.location.href = serverHost + "?room=" + roomNum;
    }
}

var tabItems = Array.from(document.querySelectorAll(".overview-tab-item"));
var questions = Array.from(document.querySelectorAll(".overview-sections-wrapper"));
var addButtons = Array.from(document.querySelectorAll(".btn-add span:last-child"));

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

if (input) {
    input.onkeypress = function(e) {
        if (e.keyCode == 13) {
            addItem(input.value);
            input.value = "";
            return false;
        }
    }
}

addButtons.forEach(function(ele) {
    ele.onclick = function(e) {
        let text = ele.parentElement.parentElement.innerText;

        if (enjoyhint_instance.getCurrentStep() == 14 && amModerator) {
            addItem( text.substr(0, text.length - 12) );
            enjoyhint_instance.trigger("next");
        }
        else {
            addItem( text.substr(0, text.length - 6) );
        }
    }
});

chatInput.onkeypress = function(e) {
    if (e.keyCode == 13) {
        addChat(chatInput.value, amModerator);
        chatInput.value = "";
        return false;
    }
}


function addItem(val) {
    var item = document.createElement("div");
    var remover = (amModerator) ? '<a class="list-item-delete"><i class="material-icons">delete</i></a>' : '<a class="list-item-like"><i class="material-icons">thumb_up</i></a>';

    item.className = "section-list-item";
    item.innerHTML = remover
        + '<div class="section-item-content"> <div class="section-item-bar-wrapper"> <div class="section-item-bar" style="width: 0%"></div> </div> <div class="section-item-text">' 
        + val
        + '</div> <div class="section-item-population">(0/5)</div>';
    document.querySelector(".current .overview-section-list").insertBefore(item, document.querySelector(".input-container"));

    var voteBtn = item.querySelector(".list-item-like");
    var delBtn = item.querySelector(".list-item-delete");
    
    if (voteBtn) {
        voteBtn.addEventListener("click", function(e) {
            countVote(voteBtn, 1);
        });
    }
    if (delBtn) {
        delBtn.addEventListener("click", function(e) {
            deleteItem(delBtn);
        });
    }
    
}

function addChat(val, isModerator) {
    var item = document.createElement("div");
    var chatroom = document.querySelector(".chatroom-content-wrapper");
    var user = (isModerator) ? "사회" : "P2";
    var userClass = (isModerator == amModerator) ? "current" : "";
    if (isModerator) {
        userClass += " moderator";
        item.className += "moderator ";
    }
    var value = "";

    value += val;
    let isSecond = val.includes("밀집");
    if (isSecond) {
        value += '<div class="btn-add"><span>후보 등록</span></div>';
    }

    item.className += " chatroom-utterances-wrapper";
    item.innerHTML = '<div class="chatroom-utterances-container"> <div class="user-box ' + userClass + '">' + user + '</div> <div class="chatroom-utterances-text">' 
        + value + '</div></div>';


    // append before hidden
    var hidden = document.querySelector(".chatroom-utterances-wrapper.hide");

    if (hidden)
        chatroom.insertBefore(item, hidden);
    else
        chatroom.appendChild(item);

    // addButton
    if (isSecond) {
        item.querySelector(".btn-add span").onclick = function() {
            addItem( val );
        }
    }
        
    // scroll
    item.scrollIntoView(false);
}

function addTopic(val) {
    let later = document.querySelector(".current ~ .overview-section-container.later");
    let newTopic = later.cloneNode();
    newTopic.innerHTML = later.innerHTML;
    newTopic.querySelector(".overview-section-title").innerText = val;
    questions[0].insertBefore(newTopic, later);
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

function countVote(ele, i) {
    var container = ele.parentElement;
    if (!container.classList.contains("active")) {
        if (ele.className.includes("like") || i > 1) 
            container.classList.add("active");
        container.querySelector(".section-item-population").innerText = "(" + i + "/5)";
        container.querySelector(".section-item-bar").style.width = i/5*100 + "%";
    }
    else {
        container.classList.remove("active");
        container.querySelector(".section-item-population").innerText = "(0/5)";
        container.querySelector(".section-item-bar").style.width = "0";
    }
    
}

function deleteItem(ele) {
    ele.parentElement.remove();
}