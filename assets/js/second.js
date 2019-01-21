var enjoyhint_script_steps = [
    {
        "next .overview-wrapper": "이곳은 <b>토의의 개요</b>를 볼 수 있는<br> 탭입니다.",
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
        "click #step1" : "'해결책 토의' 단계를 <b>클릭</b>해서 미리 살펴보세요!",
        showSkip: false
    },
    {
        "next #question1" : "'해결책 토의' 단계에서<br>토의자들이 답을 찾아나가야 할 질문들입니다.",
        showSkip: false
    },
    {
        "click #step0" : "다시 '문제 분석' 단계로 돌아가 볼까요?<br>'문제 분석' 단계를 <b>클릭</b>하세요.",
        showSkip: false
    },
    {
        "next #question0" : "현재는 <b>흰색 배경</b>의 <br>'최상의 상태를 막는 원인은 무엇입니까?'라는 질문에 대해 <br>토의가 이루어지고 있습니다.",
        showSkip: false
    },
    {
        "key .input-list-new" : "<b>엔터</b>를 눌러 원인을 입력해보세요!",
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
        "custom .overview-section-container.current" : "다른 토의자들도 원인을 추가하였습니다. 적절한 원인에 <b>투표</b>를 해주세요. 중복 투표가 가능합니다.",
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
    },
    {
        "next .chatroom-container" : "이곳은 토의가 이루어질 <b>채팅창</b>입니다.",
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
            for (const [i, ele] of chats.entries()) {
                setTimeout(function() {
                    ele.classList.remove("hide");
                }, i * 100);

                if (ele.classList.contains("evidence"))
                    break;
            }
        }
    },
    {
        "click .chatroom-utterances-wrapper.evidence" : "특정 메시지 위에 마우스를 두면, 우측에 <b>'후보 등록'</b> 버튼이 나타납니다.<br>'후보 등록' 버튼을 <b>클릭</b>해서 이 메시지를 투표 후보로 올려보세요!",
        showSkip: false,
        onBeforeStart: function() {
            document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
            document.querySelector(".enjoyhint_next_btn").style.transform = "";
        }
    },
    {
        "next .overview-section-container.current" : "후보로 등록이 되었네요!",
        showSkip: false
    },
    {
        "key .chatbox-input-wrapper" : "사회자의 다음 단계로 넘어가겠냐는 제안에<br><b>엔터</b>를 눌러 <b>답변</b>해보세요!",
        keyCode: 13,
        showSkip: false,
        onBeforeStart: function() {
            // add some chats
            var chats = Array.from(document.querySelectorAll(".chatroom-utterances-wrapper.hide"));
            chats.forEach(function(ele, i) {
                setTimeout(function() {
                    ele.classList.remove("hide");
                }, i * 100);
            })

            // give a placeholder
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
        "next .overview-wrapper" : "다음 질문으로 넘어갔습니다. <br><b>지난 질문의 결과</b>는 이곳에서 <br>계속해서 확인하실 수 있습니다.",
        showSkip: false,
        "nextButton": {text: "Finish"},
        onBeforeStart: function() {
            setTimeout(function() {
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
            }, 1000);
            
        }

    }
];

init();