let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newBtn=document.querySelector("#new");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg")
let win=document.querySelector(".confetti-land");
let turn=document.querySelector(".player");

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
let turnO=true;//at first playerO plays
let count=0;//to track draw

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
    win.classList.add("hide");
    turn.classList.remove("hide");
    turn.innerText="PLAYER O TURN";
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO){
            box.innerText="O";//playerO turn
            turnO=false;
            turn.innerText="PLAYER X TURN"
            box.classList.add("playerO");
        }else{//playerX turn
            box.innerText="X";
            turnO=true;
            turn.innerText="PLAYER O TURN";
            box.classList.add("playerX");
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        if(count===9 && !(isWinner)){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    turn.classList.add("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("playerO");
        box.classList.remove("playerX");
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    win.classList.remove("hide");
    turn.classList.add("hide");
    winning();
    disableBoxes();
};

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if (pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

//CONFETTI
const winning=()=>{
    var confettiPlayers = [];

function makeItConfetti() {
    var confetti = document.querySelectorAll('.confetti');
    if (!confetti[0].animate) {
        return false;
    }
    for (var i = 0, len = confetti.length; i < len; ++i) {
    var candycorn = confetti[i];
    candycorn.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
    var scale = Math.random() * .7 + .3;
    var player = candycorn.animate([
        { transform: `translate3d(${(i/len*100)}vw,-5vh,0) scale(${scale}) rotate(0turn)`, opacity: scale },
        { transform: `translate3d(${(i/len*100 + 10)}vw,105vh,0) scale(${scale}) rotate(${ Math.random() > .5 ? '' : '-'}2turn)`, opacity: 1 }
    ], {
        duration: Math.random() * 3000 + 4000,
        iterations: Infinity,
        delay: -(Math.random() * 7000)
    });
    
    confettiPlayers.push(player);
    }
}

makeItConfetti();
onChange({currentTarget: {value: 'bookmarks'}})

document.getElementById('type').addEventListener('change', onChange)

function onChange(e) {
    document.body.setAttribute('data-type', e.currentTarget.value);
    confettiPlayers.forEach(player => player.playbackRate = e.currentTarget.value === 'bookmarks' ? 2 : 1);
}
}