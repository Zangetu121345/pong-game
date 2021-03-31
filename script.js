let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBound = board.getBoundingClientRect();
let x= true; //horizontal chage
let y= false;//vertical change
//lives of players
let leftLives = 3;
let rightLives = 3;
//use input listen
document.addEventListener("keydown", function(e){
    if(e.key=="w"){
        movePaddle(leftPaddle,-window.innerHeight*0.1);
    }else if(e.key=="s"){
        movePaddle(leftPaddle,window.innerHeight*0.1);
    }else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }else if(e.key =="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }
})
function setColor(idx){
    let allIndex = document.querySelectorAll(".fas.fa-circle");
    allIndex[idx].style.color = "green";
}
function movePaddle(cPaddle, change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change >= boardBound.top && cPaddleBounds.bottom+change <= boardBound.bottom)
        cPaddle.style.top=cPaddleBounds.top+change+"px";
    
}

function moveBall(){
    let ballCord = ball.getBoundingClientRect();
    let ballTop = ballCord.top;
    let ballLeft = ballCord.left;
    let ballBottom = ballCord.bottom;
    let ballRight = ballCord.right;
    //is Ball in bound
    //check if collided with any players horizontal boundary
    let hasTouchedLeft = ballLeft < boardBound.left;
    let hasTouchedRight = ballRight > boardBound.right;
    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftLives--;
            setColor(leftLives);
            if(leftLives==0){
                alert('Game over. Player 🅱 won');
                document.location.reload();
            }else{
                 return resetGame();
            }
        }else{
            rightLives--;
            setColor(rightLives);
            if(rightLives==0){
                alert('Game Over. Player 🅰 won');
                document.location.reload();
            }else{
                return resetGame();
            }
        }
    }

    function resetGame(){
        ball.style.top = window.innerHeight*0.5 +"px";
        ball.style.left = window.innerWidth*0.5 + "px";
        requestAnimationFrame(moveBall); 
    }
    //vertical Bound
    if(ballTop <= boardBound.top || ballBottom >= boardBound.bottom){
        //vertically outside
        y=!y;
    }
    //horizontal Bound
    // if(ballLeft <= boardBound.left || ballRight >= boardBound.right){
    //     //horizontally outside
    //     x=!x;
    // }
    //left hit->np
    //right hit->np
    //issue
    //**********collision of ball with paddle***************** */
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballTop+30 >= leftPaddleBounds.top && ballBottom -30 <=leftPaddleBounds.bottom){
            x = !x;
    }
    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballTop+30 >= rightPaddleBounds.top && ballBottom -30 <=rightPaddleBounds.bottom){
            x = !x;
    }

    ball.style.top = y==true ? ballTop + 6 + "px": ballTop - 6 + "px";
    ball.style.left = x==true ? ballLeft + 6 + "px": ballLeft - 6 +"px"; 
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);