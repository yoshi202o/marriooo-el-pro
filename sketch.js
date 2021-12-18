const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(600,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    
    platform2 = new Ground(300, 400, 80, 430);
    platform3 = new Ground(300, 200, 300, 40);
    
    platform = new Ground(5, 300, 50, 600);
    platform4 = new Ground(595, 300, 50, 600);
    platform5 = new Ground(300, 5, 600, 50);
    
    platform6 = new Ground(500, 580, 100, 10);
    platform7 = new Ground(450, 580, 30, 70);
    platform8 = new Ground(550, 580, 30, 70);

    
    
    //log1 = new Log(810,260,300, PI/2);
    box1 = new Box(200,100,70,70);
    box2 = new Box(270,100,70,70);
    box3 = new Box(340,100,70,70);
    box4 = new Box(410,100,70,70);
    
    //log3 =  new Log(810,180,300, PI/2);

    
    //log4 = new Log(230,120,150, PI/7);
    //log5 = new Log(370,1160,150, -PI/7);

    bird = new Bird(50,500);

    
    slingshot = new SlingShot(bird.body,{x:143, y:400});
}

function draw(){
    if(backgroundImg)
          background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    
    box1.display();
    box2.display();
    ground.display();
    
    //log1.display();

    box3.display();
    box4.display();
    
    //log3.display();

   
    //log4.display();
    //log5.display();

    bird.display();
    platform.display();
    platform2.display(); 
    platform3.display();
    platform4.display(); 
    platform5.display();
    platform6.display();
    platform7.display(); 
    platform8.display();

    slingshot.display();  
    
if (box1.y > 200){ 
        World.remove(world, this.body);
        this.Visiblity = this.Visiblity - 5;
        tint(255,this.Visiblity);
}

if (box2.y > 200){ 
    World.remove(world, this.body);
    this.Visiblity = this.Visiblity - 5;
    tint(255,this.Visiblity);
}
if (box3.y > 200){ 
    World.remove(world, this.body);
    this.Visiblity = this.Visiblity - 5;
    tint(255,this.Visiblity);
}
if (box4.y > 200){ 
    World.remove(world, this.body);
    this.Visiblity = this.Visiblity - 5;
    tint(255,this.Visiblity);
}
console.log(box1.y)
}


function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       slingshot.attach(bird.body);
       bird.trajectory = []
       Matter.Body.setPosition(bird.body, {x: 50 , y: 500});
       gameState = "onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Chihuahua");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=20){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}