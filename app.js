let gameSeq = [];
let userseq = [];
let highScore = 0;
let btns = ["yellow","red","purple","green"];


let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function (){
    if (started == false) {
        started = true;
        console.log("stared");

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    if (level > highScore){
        highScore = level;
    }
    let randInx = Math.floor(Math.random()*3);
    let randColor = btns[randInx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){

    if (userseq[idx] === gameSeq[idx]){
        if (userseq.length == gameSeq.length){
           setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game Over ! Your score was : <b>${level-1}</b><br>Highest Score: <b>${highScore-1}</b><br> Press any key to start again.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userseq = [];
    level = 0;
}