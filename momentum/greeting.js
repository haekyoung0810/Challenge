const form = document.querySelector(".js-form"),
    input= form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
    SHOWING_ON = "showing";




function saveName(text){
    localStorage.setItem(USER_LS, text); //유저네임 저장하기
}





function handleSubmit(event){
    event.preventDefault(); //인풋박스 디폴트 상태 없애기
    const currnetValue = input.value;
    painGreeting(currnetValue); //Hello + 유저네임
    saveName(currnetValue); // 유저네임 저장
}




function askForName(){
    form.classList.add(SHOWING_ON); // 유저 이름이 저장되어 있지 않다면, 인풋 박스 생성
    form.addEventListener("submit", handleSubmit);
}


function painGreeting(text){
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello, ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName(); //유저 이름이 저장되어 있지 않을 시 인풋박스 불러오기
    }else{
        painGreeting(currentUser);
    }

}



function init(){
    loadName();

}

init();
