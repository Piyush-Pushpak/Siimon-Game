let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let box_number = ["one", "two", "three", "four"];

let p = document.querySelector("p");

let btns = document.querySelectorAll(".btn");

function flash(el) {
    el.classList.add("flash");
    setTimeout(function () {
        el.classList.remove("flash");
    }, 250);
}


function levelup() {
    userSeq = [];
    level++;
    p.innerText = `Level - ${level} Score - ${level - 1}`;
    let rand_box = Math.floor(Math.random() * 3);
    let rand_color = box_number[rand_box];
    let rand_button = document.querySelector(`.${rand_color}`);
    gameSeq.push(rand_color);
    flash(rand_button);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        if (highScore <= level) {
            highScore = level-1;
        }
        p.innerText = `Game End! Your score is ${level-1} and Highest score is ${highScore} Press any key to start the game`;
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function () {
            body.style.backgroundColor = "white";
        }, 250)

        reset();
    }
}

function button_press() {
    let pressed = this;
    flash(pressed);
    let userColor = pressed.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelup();
    }
});

for (btn of btns) {
    btn.addEventListener("click", button_press);
}
