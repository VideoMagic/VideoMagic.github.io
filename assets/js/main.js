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
    item.className = "chatroom-utterances-wrapper";
    item.innerHTML = '<div class="chatroom-utterances-container"> <div class="user-box current">P2</div> <div class="chatroom-utterances-text">' 
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

// tutorial

var enjoyhint_script_steps = [
    {
        "next .overview-wrapper": "이곳은 토의의 개요를 볼 수 있는<br> Overview 탭입니다.",
        showSkip: false
    },
    {
        "next .overview-title-wrapper": "최상단에는 <b>토의의 주제</b>가 있습니다.",
        showSkip: false
    },
    {
        "next .overview-tabs" : "<b>세 단계</b>를 거쳐 토의가 이루어집니다. 현재 '<b>문제 분석</b>' 단계에 있습니다.",
        showSkip: false
    },
    {
        "click #step1" : "'해결책 토의' 단계를 클릭해서 미리 살펴보세요!",
        showSkip: false
    },
    {
        "next #question1" : "'해결책 토의' 단계에서<br>토의자들이 답을 찾아나가야 할 질문들입니다.",
        showSkip: false
    },
    {
        "click #step0" : "다시 '문제 분석' 단계로 가보죠.",
        showSkip: false
    },
    {
        "next #question0" : "현재는 흰색 배경의 <br>'최상의 상태를 막는 원인은 무엇입니까?'라는 질문에 대해 <br>토의가 이루어지고 있습니다.",
        showSkip: false
    },
    {
        "key .input-list-new" : "엔터를 눌러 원인을 입력해보세요!",
        keyCode: 13,
        showSkip: false,
        onBeforeStart: function() {
            var example = "자발적 단속 의지가 없음";
            Array.from(example).forEach(function(ele, i) {
                setTimeout(function(){
                    input.value += ele;
                }, i*50)
            });

            input.focus();
        }
    },
    {
        "custom .overview-section-container.current" : "다른 토의자들도 원인을 추가하였습니다. 적절한 원인에 투표를 해주세요. 중복 투표가 가능합니다.",
        event: "vote",
        showSkip: false,
        onBeforeStart: function() {
            setTimeout(function() {
                addItem("단속의 필요성");
            }, 500)
            setTimeout(function() {
                addItem("주차 공간 자체의 부족");
            }, 1000)

            setTimeout(function() {
                Array.from(document.querySelectorAll(".list-item-like")).forEach(function(ele) {
                    ele.addEventListener("click", countVote);
                });
            }, 1010)

        }
    },{
        "next .chatroom-container" : "이곳은 토의가 이루어질 채팅창입니다.",
        showSkip: false,
        onBeforeStart: function() {
            
            setTimeout(function() {
                document.querySelector(".enjoy_hint_label").style.transform = "translateX(-400px)";
                document.querySelector(".enjoyhint_svg_wrapper").style.transform = "rotateY(180deg) translateX(400px)";
                document.querySelector(".enjoyhint_next_btn").style.transform = "translateX(-400px)";
            }, 800);
            
            Array.from(document.querySelectorAll(".list-item-like")).forEach(function(ele) {
                ele.removeEventListener("click", countVote);
            });

            // add some chats
            var chats = Array.from(document.querySelectorAll(".chatroom-utterances-wrapper.hide"));
            chats.forEach(function(ele, i) {
                setTimeout(function() {
                    ele.classList.remove("hide");
                }, i * 100);
            })
        }
    },{
        "key .chatbox-input-wrapper" : "사회자의 다음 단계로 넘어가겠냐는 제안에 답변해보세요!",
        keyCode: 13,
        showSkip: false,
        onBeforeStart: function() {
            document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
            document.querySelector(".enjoyhint_next_btn").style.transform = "";
            
            // add some chats
            var example = "네, 넘어가는 것 좋아요!";
            Array.from(example).forEach(function(ele, i) {
                setTimeout(function(){
                    chatInput.value += ele;
                }, i*50)
            })

            chatInput.focus();
        }
    },
    {
        "next .overview-wrapper" : "다음 질문으로 넘어갔습니다. <br>지난 질문의 결과는 Overview 탭에서 <br>계속해서 확인하실 수 있습니다.",
        showSkip: false,
        "nextButton": {text: "Finish"},
        onBeforeStart: function() {
            var newCurrent = document.querySelector(".overview-section-container.current")
            var content = "";
            newCurrent.classList.remove("current");
            Array.from(newCurrent.querySelectorAll(".section-item-text")).forEach(function(ele, i) {
                content += '<div class="section-list-item'
                if (i == 0)
                    content += " active"
                content += '">' + ele.innerText + '</div>';
            });
            newCurrent.querySelector(".overview-section-list").innerHTML = content;

            newCurrent = document.querySelector("#question0 .overview-section-container.later");
            newCurrent.classList.add("current");
            newCurrent.querySelector(".overview-section").innerHTML += '<div class="overview-section-list"><div class="input-container"> <input class="input-list-new" type="text" placeholder="증거를 입력해보세요"> </div> </div>'
        }

    }
];
enjoyhint_instance.set(enjoyhint_script_steps);
enjoyhint_instance.run();