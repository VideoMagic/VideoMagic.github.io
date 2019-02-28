var enjoyhint_steps_moderator = [
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
        "next .overview-tabs" : "<b>두 단계</b>를 거쳐 토의가 이루어집니다. 현재 '<b>문제 분석</b>' 단계에 있습니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    {
        "click #step1" : "'해결책 토의' 단계를 <b>클릭</b>해서 미리 살펴보세요!",
        showSkip: false
    },
    {
        "next #question1" : "'해결책 토의' 단계에서<br>토의자들이 답을 찾아나가야 할 질문들입니다.<br><b>질문 목록을 참고하며 채팅에 참여</b>해주시면 됩니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    { // 5
        "click #step0" : "다시 '문제 분석' 단계로 돌아가 볼까요?<br>'문제 분석' 단계를 <b>클릭</b>하세요.",
        showSkip: false
    },
    {
        "next #question0" : "현재는 <b>흰색 배경</b>의 <br>'최상의 상태를 막는 원인은 무엇입니까?'라는 질문에 대해 <br>토의가 이루어지고 있습니다.",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    { // 7
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
        "custom .overview-section-container.current" : "적절한 원인에 <b>투표</b>를 해주세요. 중복 투표가 가능합니다.",
        event: "vote",
        showSkip: false,
        onBeforeStart: function() {
            Array.from(document.querySelectorAll(".list-item-like")).forEach(function(ele) {
                ele.addEventListener("click", function(e) {
                    if (enjoyhint_instance.getCurrentStep() == 8)
                        enjoyhint_instance.trigger("next");
                });
            });

        }
    },
    {
        "next .chatroom-container" : "이곳은 토의가 이루어질 <b>채팅창</b>입니다.",
        showSkip: false, 
        "nextButton": {text: "다음"},
        onBeforeStart: function() {
            
            setTimeout(function() {
                document.querySelector(".enjoy_hint_label").style.transform = "translateX(-400px)";
                document.querySelector(".enjoyhint_svg_wrapper").style.transform = "rotateY(180deg) translateX(400px)";
                document.querySelector(".enjoyhint_next_btn").style.transform = "translateX(-400px)";
            }, 800);
            
            // Array.from(document.querySelectorAll(".list-item-like")).forEach(function(ele) {
            //     ele.removeEventListener("click", countVote);
            // });

            // add some chats
            var chats = Array.from(document.querySelectorAll(".chatroom-utterances-wrapper.hide:not(.reply)"));
            for (const [i, ele] of chats.entries()) {
                setTimeout(function() {
                    ele.classList.remove("hide");
                    ele.scrollIntoView(false);
                }, i * 100);

                if (ele.classList.contains("evidence"))
                    break;
            }
        }
    },
    { // 10
        "custom .chatroom-utterances-wrapper.evidence" : "마찬가지로 특정 메시지 위에 마우스를 두면, 맨 오른쪽에 <b>'후보 등록'</b> 버튼이 나타납니다.<br>'후보 등록' 버튼을 <b>클릭</b>해서 이 메시지를 투표 후보로 올려보세요!",
        showSkip: false,
        onBeforeStart: function() {
            document.querySelector(".chatroom-utterances-wrapper.evidence + .reply").scrollIntoView(false);
            document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
            document.querySelector(".enjoyhint_next_btn").style.transform = "";
        }
    },
    {
        "next .overview-section-container.current" : "후보로 등록이 되었네요!",
        showSkip: false,
        "nextButton": {text: "다음"}
    },
    { // 12
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
        "nextButton": {text: "다음"},
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
                newCurrent.querySelector(".overview-section").innerHTML += '<div class="overview-section-list"><div class="input-container"> <input class="input-list-new" type="text" placeholder="증거를 입력해보세요"> </div> </div>';

                let addTopicBtn = document.querySelector(".pseudo")
                if (addTopicBtn) 
                    document.getElementById("question0").insertBefore(addTopicBtn, newCurrent.nextElementSibling);
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

            let dropdown = document.getElementById("dropdown");
            if (!dropdown.classList.contains("hide")) {
                dropdown.classList.add("hide");
            }
        }

    }
];

// moderator ver
enjoyhint_steps_moderator[4]["next #question1"] = enjoyhint_steps_moderator[4]["next #question1"].replace("에 참여", "을 진행");
enjoyhint_steps_moderator[7] = {
    "custom .overview-section-container.current" : "토의자들이 한계점을 추가하였습니다. <br>부적절한 한계점은 <b>휴지통 버튼을 눌러 삭제</b>해주세요.",
    showSkip: false,
    onBeforeStart: function() {
        addItem("모르게쪄염 >_<")
        setTimeout(function() {
            addItem("단속의 필요성");
        }, 500)
        setTimeout(function() {
            addItem("주차 공간 자체의 부족");
        }, 1000)

        setTimeout(function() {
            Array.from(document.querySelectorAll(".list-item-delete")).forEach(function(ele) {
                ele.addEventListener("click", function(e) {
                    if (enjoyhint_instance.getCurrentStep() == 8)
                        enjoyhint_instance.trigger("next");
                });
            });
        }, 1010)

    }
}
enjoyhint_steps_moderator[8] = {
    "next .overview-section-container.current" : "토의자들이 <b>투표를 진행</b>하였습니다. <br>의견이 어느 정도 모아진 것 같죠?<br>참고로 중복 투표가 가능합니다.",
    showSkip: false,
    "nextButton": {text: "다음"},
    onBeforeStart: function() {
        setTimeout(function() {
            countVote( document.querySelectorAll(".list-item-delete")[0], 5);
        }, 500)
        setTimeout(function() {
            countVote( document.querySelectorAll(".list-item-delete")[1], 1);
        }, 1000)

    }
}
enjoyhint_steps_moderator[9]["next .chatroom-container"] = enjoyhint_steps_moderator[9]["next .chatroom-container"].concat("<br>문제 원인에 대한 토의가 이루어지고 있네요.");
enjoyhint_steps_moderator[12] = {
    "key .chatbox-input-wrapper" : "토의자들의 다음 단계로 넘어가겠냐는 제안에<br><b>엔터</b>를 눌러 <b>답변</b>해보세요!",
    keyCode: 13,
    showSkip: false,
    onBeforeStart: function() {
        // add some chats
        var chats = Array.from(document.querySelectorAll(".chatroom-utterances-wrapper.hide"));
        chats.forEach(function(ele, i) {
            setTimeout(function() {
                ele.classList.remove("hide");
                ele.scrollIntoView(false);
            }, i * 100);
        })

        // give a placeholder
        var example = "네, 그럼 넘어가도록 하겠습니다.";
        Array.from(example).forEach(function(ele, i) {
            setTimeout(function(){
                chatInput.value += ele;
            }, i*50)
        })

        chatInput.focus();
    }
}

// splice (from back)
enjoyhint_steps_moderator.splice(13, 0, {
    "click .overview-next-button" : "<b>'다음 단계' 버튼을 클릭</b>해서 <br>다음 질문으로 넘어가보세요.",
    showSkip: false,
    onBeforeStart: function() {
        document.querySelector(".overview-next-button").onclick = function() {
            let original = this;
            let btn = original.cloneNode();
            btn.innerHTML = original.innerHTML;
            let here = original.parentElement.parentElement.nextElementSibling.nextElementSibling.querySelector(".overview-section");

            setTimeout(function() {
                original.remove();
                here.insertBefore(btn, here.firstChild);
            }, 1000);
            

        }
    }
});

enjoyhint_steps_moderator.splice(6, 0, {
    "custom .overview-add-section-button.bottom" : "질문을 추가할 수 있습니다. <br><b>더하기 표시를 클릭</b>해서 <br>문제 분석 과정을 위해 필요하다고 생각되는 <br>새로운 질문을 추가해보세요.",
    showSkip: false,
    onBeforeStart: function() {
        var topicInput = document.getElementById("topic");
        var example = "그 원인은 현실적으로 해결 가능한 것입니까?";
        Array.from(example).forEach(function(ele, i) {
            setTimeout(function(){
                topicInput.value += ele;
            }, i*50)
        })

        var addQuestionButton = document.getElementById("submit-btn");

        addQuestionButton.onclick = function(e) {
            if (enjoyhint_instance.getCurrentStep() == 6) {
                enjoyhint_instance.trigger("next");
            }
            
            addTopic(topicInput.value);
        }
    }
});
enjoyhint_steps_moderator[7]["next #question0"] = enjoyhint_steps_moderator[7]["next #question0"].replace("현재는", "질문이 추가되었네요! 현재는");

// added only for moderator ver

enjoyhint_steps_moderator.splice(11, 0, {
    "custom .chatroom-utterances-wrapper.inline" : "의견을 제시한 메시지에 대해 답변이 추천되었네요. <br><b>클릭해서 추천된 답변을 사용</b>해보세요!",
    showSkip: false,
    onBeforeStart: function() {
        document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
        document.querySelector(".enjoyhint_next_btn").style.transform = "";

        Array.from(document.querySelectorAll(".feedback .btn")).forEach(function(ele, i) {
            ele.onclick = function() {
                let reply = ele.parentElement.parentElement.parentElement.nextElementSibling;
                reply.querySelector(".chatroom-utterances-text").innerText = ele.innerText;
                reply.classList.remove("hide");

                if (enjoyhint_instance.getCurrentStep() == 11 || enjoyhint_instance.getCurrentStep() == 13) {
                    document.querySelector(".chatroom-utterances-wrapper.evidence").scrollIntoView(false);
                    enjoyhint_instance.trigger("next");
                }
            }
        });
    }
});

enjoyhint_steps_moderator.splice(17, 0, {
    "custom .feedback-wrapper" : "이곳에는 토론에 도움이 되는 사회자 상용구가 표시됩니다. <br>이번 단계를 소개하는 상용구가 추천되었네요. <br><b>클릭해서 해당 상용구를 사용</b>해보세요!",
    showSkip: false,
    onBeforeStart: function() {
        document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
        document.querySelector(".enjoyhint_next_btn").style.transform = "";

        let card = document.querySelector(".feedback-card");
        card.classList.remove("hide");
        document.querySelector(".feedback-default").classList.add("hide");

        card.onclick = function() {
            card.remove();
            document.querySelector(".feedback-default").classList.remove("hide");

            if (enjoyhint_instance.getCurrentStep() == 19)
                enjoyhint_instance.trigger("next");
        }
    }
});
enjoyhint_steps_moderator.splice(18, 0, {
    "next .chatroom-content-wrapper" : "이번 단계를 소개하셨습니다.<br>이런 식으로 추천된 상용구를 이용하시면 됩니다.",
    showSkip: false,
    "nextButton": {text: "다음"},
    onBeforeStart: function() {
        addChat("이번 단계는 전 단계에서 합의한 문제 원인의 증거가 무엇인지에 대해 논의해보도록 하겠습니다.", true);

        setTimeout(function() {
            document.querySelector(".enjoy_hint_label").style.transform = "translateX(-400px)";
            document.querySelector(".enjoyhint_svg_wrapper").style.transform = "rotateY(180deg) translateX(400px)";
            document.querySelector(".enjoyhint_next_btn").style.transform = "translateX(-400px)";
        }, 800);
    }
});
enjoyhint_steps_moderator.splice(19, 0, {
    "next .feedback-more" : "이 버튼을 클릭하시면 추천되지 않은 다른 상용구도 이용하실 수 있습니다.",
    showSkip: false,
    "nextButton": {text: "다음"},
    onBeforeStart: function() {
        document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
        document.querySelector(".enjoyhint_next_btn").style.transform = "";
    }
});

enjoyhint_steps_moderator.splice(12, 0, {
    "custom .chatroom-utterances-wrapper.evidence" : "참여자의 메시지 위에 마우스를 두면, 오른쪽에서 두 번째에 <b>'답글 달기'</b> 버튼이 나타납니다.<br>답변이 추천되지 않았지만 답변을 달고 싶을 때에는, 이 '답글 달기' 버튼을 <b>클릭</b>해주세요.<br>클릭해서 답글을 달아 볼까요?",
    showSkip: false,
    onBeforeStart: function() {
        document.getElementById("add-reply").onclick = function(e) {
            document.querySelector(".evidence .feedback").classList.remove("hide");
            enjoyhint_instance.trigger("next");
        }
        document.querySelector(".enjoyhint_svg_wrapper").style.transform = "";
        document.querySelector(".enjoyhint_next_btn").style.transform = "";
    }
});
enjoyhint_steps_moderator.splice(13, 0, {
    "custom .chatroom-utterances-wrapper.evidence" : "답변 선택지가 나타났네요! <b>클릭</b>해서 답변을 달아보세요!",
    showSkip: false,
    onBeforeStart: function() {
        document.querySelector(".chatroom-utterances-wrapper.evidence").scrollIntoView(false);
    }
});

init();

// feedback more
let moreBtn = document.querySelector(".feedback-more");
moreBtn.onclick = function(e) {
    if (e.target != moreBtn) return;
    document.getElementById("dropdown").classList.remove("hide");
}

Array.from( document.querySelectorAll(".dropdown-option") ).forEach(function(ele) {
    ele.onclick = function() {
        addChat(ele.innerText, true);
        document.getElementById("dropdown").classList.add("hide");

        if (enjoyhint_instance.getCurrentStep() == 21)
            enjoyhint_instance.trigger("next");
    }
})