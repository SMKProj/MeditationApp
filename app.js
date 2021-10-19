const app = () => {
    

const song=document.querySelector('.song');
console.log(song);
const play=document.querySelector('.play');
//const replay=document.querySelector(".replay");
const outline = document.querySelector('svg.moving-outline circle');
const video = document.querySelector('div.vid-container video');

//FOR ALL SOUNDS
const sounds=document.querySelectorAll('div.sound-picker button');
// Time Display
const timeDisplay = document.querySelector('h3.time-display');

//get length of outline
const outlineLength = outline.getTotalLength(); 
//Duration
const timeSelect = document.querySelectorAll("div.time-select button");

var fakeDuration;
outline.style.strokeDasharray = 300;
//outline.style.strokeDashoffset = outlineLength;



//Select Durations
timeSelect.forEach(option =>{
    option.addEventListener('click', function(){

        const fk = this.getAttribute("data-time");
        timeDisplay.textContent = Math.floor(fk / 60) + ":" + Math.floor(fk % 60);
        fakeDuration = fk;
    })
});

// Select sounds and videos
sounds.forEach(sound => {
    sound.addEventListener('click', function(){
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
    })
});

 //play sound
 play.addEventListener("click", () =>{  
     checkPlaying(song); 
    });


//create function specific to stop and play song
const checkPlaying = song => {
    if(song.paused)
    {
        song.play();
        video.play();
        play.src = './svg/pause.svg';

    }
    else{
        song.pause();
        video.pause();
        play.src = './svg/play.svg';
    }
};

// lets animate the circle
song.ontimeupdate = () => {   
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDasharray = progress;
    // animate the text
    timeDisplay.textContent = minutes + ":" + seconds;
    
    if(currentTime >= fakeDuration)
    {
        song.pause();
        song.currentTime = 0;
        fakeDuration = 0;
        play.src = "./svg/play.svg";
        video.pause();
        
    }
};
};
app();
