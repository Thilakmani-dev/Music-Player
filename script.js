const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music Array
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Thilak Design'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist:'Thilak Design'
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist:'Thilak Design'
    },
    {
        name:'metric-1',
        displayName:'Metric/Jacinto Design',
        artist:'Thilak Design'
    }
]

//check if playing
let isPlaying = false;
 


//Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause'); 
    music.play();
}

//Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

//play or pause event listenersx

playBtn.addEventListener('click',()=>{
    (isPlaying ? pauseSong() : playSong())
});

//update dom

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}

//current song

let songIndex = 0;

//Previous Song Function
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song Function
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//on load - select song
loadSong(songs[songIndex]);

//update progress bar and time
function updateProgressBar(e){
    if(isPlaying){
        // update progress bar width
        const {duration,currentTime} = e.srcElement;
        const progressPercent  = (currentTime/duration)*100;
        progress.style.width=`${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //calculate display for current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;    
    }
}

//set progress bar 
function setprogressBar(e){
const width = this.clientWidth;
const clickX = e.offSet;
const {duration} = music;
music.currentTime = ((clickX/width)*duration);
}


//Ecent Listeners 
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong());
progressContainer.addEventListener('click',setprogressBar);