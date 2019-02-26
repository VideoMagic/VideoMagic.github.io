var enjoyhint_steps = [
    { // 0
        "next .overview-title-wrapper": "최상단에는 <b>토의의 주제</b>가 있습니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    { // 1
        "next .overview-content-wrapper": "이곳은 <b>토의의 개요</b>를 볼 수 있는<br> 탭입니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    {
        "next .overview-tabs" : "<b>두 단계</b>를 거쳐 토의가 이루어집니다. 현재 '<b>문제 분석</b>' 단계를 보고 계십니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    {
        "click #step1" : "'해결책 토의' 단계를 <b>클릭</b>해서 미리 살펴보세요!",
        showSkip: false
    },
    {
        "next #question1" : "'해결책 토의' 단계에서<br>토의자들이 답을 찾아나가야 할 질문들입니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    { // 5
        "click #step0" : "다시 '문제 분석' 단계로 돌아가 볼까요?<br>'문제 분석' 단계를 <b>클릭</b>하세요.",
        showSkip: false
    },
    { // 6
        "next #question0" : "'문제 분석' 단계에서<br>토의자들이 답을 찾아나가야 할 질문들입니다.<br><b>질문 목록을 참고하며 채팅에 참여</b>해주시면 됩니다.",
        showSkip: false
    },
    {
        "next .chatroom-container" : "이곳은 토의가 이루어질 <b>채팅창</b>입니다. <br>다음 질문으로 넘어가자는 내용의 <br>채팅이 이루어지고 있네요.",
        showSkip: false,
        "nextButton": {text: "다음"},
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
                    ele.scrollIntoView(false);
                }, i * 100);
            })
        }
    },
    { // 8
        "key .chatbox-input-wrapper" : "사회자의 다음 단계로 넘어가겠냐는 제안에<br><b>엔터</b>를 눌러 <b>답변</b>해보세요!",
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
        "next .chatroom-content-wrapper" : "사회자님이 답변을 달았네요! <br>이런 식으로 채팅에 참여하시면 됩니다.",
        showSkip: false,
        "nextButton": {text: "다음"},
        onBeforeStart: function() {
            setTimeout(function() {
                document.querySelector(".enjoy_hint_label").style.transform = "translateX(-400px)";
                document.querySelector(".enjoyhint_svg_wrapper").style.transform = "rotateY(180deg) translateX(400px)";
                document.querySelector(".enjoyhint_next_btn").style.transform = "translateX(-400px)";
            }, 800);

            setTimeout(function() {
                addChat("답변 감사드립니다.", true)
            }, 1000);
        }
    },
    {
        "next .chatroom-time-container" : "제한 시간은 20분입니다. 여기에 경과 시간이 표시가 됩니다.<br><b>20분 동안 '해결책 토의' 단계까지</b> 마치는 것이 목표입니다.",
        showSkip: false,
        "nextButton": {text: "종료"},
        onBeforeStart: function() {
            document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
            document.querySelector(".enjoyhint_next_btn").style.transform = "";
        }

    }
];

// moderator ver
var enjoyhint_steps_moderator = [...enjoyhint_steps];
enjoyhint_steps_moderator[6]["next #question0"] = enjoyhint_steps_moderator[6]["next #question0"].replace("에 참여", "을 진행");
enjoyhint_steps_moderator[8] = { // 8
    "key .chatbox-input-wrapper" : "참가자들의 다음 질문으로 넘어가자는 제안에<br><b>엔터</b>를 눌러 <b>답변</b>해보세요!",
    keyCode: 13,
    showSkip: false,
    onBeforeStart: function() {
        document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
        document.querySelector(".enjoyhint_next_btn").style.transform = "";
        
        // add some chats
        var example = "네, 그럼 다음 질문으로 넘어가겠습니다.";
        Array.from(example).forEach(function(ele, i) {
            setTimeout(function(){
                chatInput.value += ele;
            }, i*50)
        })

        chatInput.focus();
    }
}
enjoyhint_steps_moderator[9] = {
    "next .chatroom-content-wrapper" : "참가자 분이 답변을 했네요! <br>이런 식으로 채팅에 참여하시면 됩니다.",
    showSkip: false,
    "nextButton": {text: "다음"},
    onBeforeStart: function() {
        setTimeout(function() {
            document.querySelector(".enjoy_hint_label").style.transform = "translateX(-400px)";
            document.querySelector(".enjoyhint_svg_wrapper").style.transform = "rotateY(180deg) translateX(400px)";
            document.querySelector(".enjoyhint_next_btn").style.transform = "translateX(-400px)";
        }, 800);

        setTimeout(function() {
            addChat("네, 사회자님! 감사합니다.", false)
        }, 1000);
    }
},


init();