function setup()
{
    canvas=createCanvas(600,600);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    fill("blue");
    stroke("black");
   
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);

        InNumberleftWristY=Number(leftWristY);
        removeDecimals=floor(InNumberleftWristY);
        volume=removeDecimals/500;
    
        document.getElementById("volume").innerHTML="Volume = "+ song.setVolume(volume);
    }

   }

song="";

function preload()
{
song=loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function modelLoaded()
{
    console.log('PoseNet has been initiallized.');
}

function gotPoses(results)
{
 if(results.length>0)
 {
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist="+ scoreLeftWrist);
  

 leftWristX=results[0].pose.leftWrist.x;
 leftWristY=results[0].pose.leftWrist.y;

 rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
 }


}
