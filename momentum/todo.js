const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';




function filterFn(toDo){
    return toDo.id === 1
}



let toDos = []; //arrary 로 할 일 저장공간 만들기


function deleteToDo(event){
    const btn = event.target;
    // console.log(event.target.parentNode); //btn 부모인 li 삭제 확인
    const li = btn.parentNode; //btn 부모 
    toDoList.removeChild(li);
    const clenToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //li의 id 숫자로 변경
    });
    toDos = clenToDos;
    saveToDos();
    
} //toDo 리스트 지우기





function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//object를 string으로 바꿔서 저장 : 로컬 스토리지에는 string만 저장되기 때문
}





function paintToDo(text){
    const li = document.createElement("li"); //ul안에 li 생성하기
    const delBtn = document.createElement("button"); // 삭제 버튼 만들기
    delBtn.innerText = "❌"; //버튼 태그에 이모지 넣기
    delBtn.addEventListener("click",deleteToDo) // li 삭제하기
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span); //li 안에 span 넣기  
    li.appendChild(delBtn); //li안에 삭제버튼 넣기
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id : newId
    }; // to do list 저장하기
    toDos.push(toDoObj); //toDos 배열에 todoObj 넣기
    saveToDos();
}



function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}




function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsdeToDos = JSON.parse(loadedToDos);
        parsdeToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}




    function init(){
        loadToDos();
        toDoForm.addEventListener("submit", handleSubmit);
    }

    init();