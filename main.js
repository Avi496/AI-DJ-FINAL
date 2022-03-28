song1="";
song2="";
leftx=0;
lefty=0;
rightx=0;
righty=0;
rscore=0;
lscore=0;
status1="";
status2="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    status1=song1.isPlaying();
    status2=song2.isPlaying();
    fill("red");
    stroke("red");
    if(lscore>0.2){
        circle(leftx, lefty, 20);
        song1.stop();
        if(status2==false){
            song2.play();
            document.getElementById("song").innerHTML="Peter Pan Song";
        }
    }
    if(rscore>0.2){
        circle(rightx, righty, 20);
        song2.stop();
        if(status1==false){
            song1.play();
            document.getElementById("song").innerHTML="Harry Potter Theme";
        }
    }
}
function modelloaded(){
    console.log("Model has been loaded.");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftx=results[0].pose.leftWrist.x;
        lefty=results[0].pose.leftWrist.y;
        rightx=results[0].pose.rightWrist.x;
        righty=results[0].pose.rightWrist.y;
        lscore=results[0].pose.keypoints[9].score;
        rscrore=results[0].pose.keypoints[10].score;
    }
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}