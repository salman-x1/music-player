console.log("Spotify");

let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    { songName: "Song 1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Song 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Song 3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Song 4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Song 5", filePath: "songs/5.mp3 ", coverPath: "covers/5.jpg" }
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

});


// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    // console.log(audioElement.currentTime);
    // console.log(audioElement.duration);
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
// audioElement.play();

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(element => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        console.log(songIndex);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity=1;
    })
});

document.getElementById('next').addEventListener('click', ()=> {
    if (songIndex>=9) {
        songIndex=0
    }
    else {
        songIndex +=1;
    }
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause-circle')
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.play();

})

document.getElementById('previous').addEventListener('click', ()=> {
    if (songIndex<=0) {
        songIndex=0
    }
    else {
        songIndex -=1;
    }

    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause-circle')
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.play();

})