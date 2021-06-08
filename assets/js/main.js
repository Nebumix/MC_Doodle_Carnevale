"use strict";

const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

const logo = new Image();
logo.src = "assets/img/logo.png";

const confSize = 6;

let confArr = new Array();

function confClass(x, y, r, g, b){
    this.conf_x = x;
    this.conf_y = y;
    this.conf_height = confSize;
    this.r = r;
    this.g = g;
    this.b = b;

    this.drawConf = function(){
        ctx.fillStyle = 'rgb('+r+', '+g+', '+b+')';
        ctx.fillRect(this.conf_x, this.conf_y, confSize, this.conf_height);
        ctx.stroke();
    }


    this.logicConf = function(){
        this.conf_y++;

        if(this.conf_y > 200){
            this.conf_y = -10;
        }

        this.conf_x += getRandomIntInclusive(-1, 1);
        this.conf_height += getRandomIntInclusive(-1, 1);

        if(this.conf_height > confSize || this.conf_height < -confSize){
            this.conf_height = 2;
        }
    }

}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

function logic(){
    for(let i = 0; i < 500; i++){
        confArr[i].logicConf(); 
    }
}

function draw(){
    ctx.fillStyle = "#24a2ec";
    ctx.fillRect(0,0, cnv.width, cnv.height);
    ctx.stroke();

    ctx.drawImage(logo, 
        (cnv.width/2) - (logo.width/2), 
        (cnv.height/2) - (logo.height/2));

    for(let i = 0; i < 500; i++){
        confArr[i].drawConf(); 
    }
}

function gameLoop(){
    logic();
    draw();

    requestAnimationFrame(gameLoop);
}

function init(){
    for(let i = 0; i < 500; i++){
        confArr[i] = new confClass(
            getRandomIntInclusive(0, 850),
            getRandomIntInclusive(-200, 0), 
            getRandomIntInclusive(0, 250),
            getRandomIntInclusive(0, 250),
            getRandomIntInclusive(0, 250)
        );
    }
}

init();
gameLoop();