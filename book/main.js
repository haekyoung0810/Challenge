(() => {


    const actions = {
        animalFlies(key){
            if(key){
                document.querySelector('[data-content="2"] .bird').style.transform = 
                `translateX(${window.innerWidth}px)` ;
            }//true일때 , data-content= 2인 부모의 클래스 bird 스타일 변경
            
            else{
                document.querySelector('[data-content="2"] .bird').style.transform = 
                `translateX(-100%)` ;
            }//false일때, 다시 스타일 되돌려 놓기
            
        },
        animalFlies2(key){
            if(key){
                document.querySelector('[data-content="5"] .bird').style.transform = 
                `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            }//true일때 , data-content= 2인 부모의 클래스 bird 스타일 변경
            
            else{
                document.querySelector('[data-content="5"] .bird').style.transform = 
                `translateX(-100%)` ;
            }//false일때, 다시 스타일 되돌려 놓기
            
        }
    } // 새 날아다니는 효과(반복)

    // console.log(actions);


    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; //현재 활성화된 첫번째 이미지
    let ioContent; //눈에 보이는 말풍선

    const io = new IntersectionObserver((entries, observer) => {
        ioContent = entries[0].target.dataset.content * 1
        // console.log(entries[0].target.dataset.content * 1);
    }); //눈에 보이는 부분 확인하기(ioContent는 인덱스값이므로 *1 해주어 문자를 숫자로 바꿔주기)




    for (let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i]);//말풍선 observe 대상으로 등록
        stepElems[i].setAttribute('data-content', i);
        graphicElems[i].setAttribute('data-content', i);
    }

    function activate(action){
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);//actions의 key 액션 호출
        }
    }//활성화 이벤트

    function inactivate(action){
        currentItem.classList.remove('visible');
        if(action){
            actions[action](false);//actions의 key 액션 호출
        }
    }//비활성화 이벤트


    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        // for (let i =0; i < stepElems.length; i++){
            for (let i = ioContent - 1; i < ioContent + 2; i++){
            step = stepElems[i];
            if(!step) continue; //step 값이 없다면 다음 조건문 실행
            boundingRect = step.getBoundingClientRect();//스크롤 X,Y값


            if(boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8){
                    // console.log(step.dataset.content);
                   inactivate(currentItem.dataset.action);
                   currentItem = graphicElems[step.dataset.content];
                   activate(currentItem.dataset.action); //data-action 값을 지정하고 액션 활성화
                }         
        }

    });
    window.addEventListener('load', ()=>{
        setTimeout(() => scrollTo(0,0),100);

    });//새로고침하면 다시 맨위 창으로 올라가기

    activate();

})(); //즉시 실행, 익명함수(전역변수 사용 피하기위해 지역변수 사용)




