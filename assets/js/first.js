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
        "next .overview-tabs" : "<b>세 단계</b>를 거쳐 토의가 이루어집니다. 현재 '<b>문제 분석</b>' 단계를 보고 계십니다.",
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
        "next #question0" : "'문제 분석' 단계에서<br>토의자들이 답을 찾아나가야 할 질문들입니다.<br>질문 목록을 참고하며 채팅에 참여해주시면 됩니다.",
        showSkip: false
    },
    {
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
    },
    {
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
        "next .chatroom-content-wrapper" : "사회자님께서 답변을 달았네요! <br>이런 식으로 채팅에 참여하시면 됩니다.",
        showSkip: false,
        "nextButton": {text: "Finish"},
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
    }
];
enjoyhint_instance.set(enjoyhint_script_steps);
enjoyhint_instance.run();