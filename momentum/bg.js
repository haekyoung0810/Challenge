const body = document.querySelector("body");


const IMG_NUMBER = 5;


function handleImgLoad(){
    console.log("finished loading")
}


function paintImage(imgNumber){
    const image = new Image();
    image.src= `img/${imgNumber + 1}.jpg`; //random 함수가 0부터 시작이므로 +1
    image.classList.add('bgImage');
    body.appendChild(image);
}



function genRandom(){
    const number = Math. floor(Math.random()* IMG_NUMBER);
    return number;
}



function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);

}

init();