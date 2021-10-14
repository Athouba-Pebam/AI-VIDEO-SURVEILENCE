objects = [];
status = "";
video = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide()
   
}
function setup(){
    canvas = createCanvas(500, 360);
    canvas.center();   

      
}
function draw(){
   image(video, 0, 0, 500,360); 
   if(status != ""){
       detector.detect(video, gotResult);
       for(i = 0; i < objects.length; i++){
           document.getElementById("status").innerHTML = "Status : Object Detected";
           document.getElementById("number_of_objects").innerHTML = "Number pf objects detected are : " + objects.length;
       
             fill("#0000FF");
             percent = floor(objects[i].confidence * 100);
             text(objects[i].label + "" + percent + " % ", objects[i].x + 15, objects[i].y + 15);
             noFill();
             stroke("#0000FF");
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);     
        }


   }
    
}

function start(){
    video.play()
    detector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}


function modelLoaded(){
    console.log("Model Loded!");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
    
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
