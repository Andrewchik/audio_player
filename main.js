const MUSIC_PLAYER = document.querySelector('.music-player')
const COVER = MUSIC_PLAYER.querySelector('.music-player__cover')
const COVER_IMG = COVER.querySelector('img')
const AUDIO = MUSIC_PLAYER.querySelector('.music-player__audio')
const AUDIO_NAME = MUSIC_PLAYER.querySelector('.audio-info__name')
const AUDIO_AETIST = MUSIC_PLAYER.querySelector('.audio-info__artist')
const PLAY_BACK = document.getElementById('backward')
const PLAY_PLAY = document.getElementById('play')
const PLAY_NEXT = document.getElementById('forward')
const AUDIO_TRACK = MUSIC_PLAYER.querySelector('.audio-progress')
const AUDIO_BAR = AUDIO_TRACK.querySelector('span')
const REQUEST_URL = './data.json'

let audioIndex = 0

async function getData(url) {
    const RESPONSE = await fetch(url)
    const AUDIO_DATA = await RESPONSE.json()
    return AUDIO_DATA
}

getData(REQUEST_URL).then(data => {
    renderData(data)
})


const renderData = data =>{
    getAudio(data.audio[audioIndex])
    PLAY_PLAY.addEventListener('click', ()=> {
        const IS_PLAYING = MUSIC_PLAYER.classList.contains('music-player--play')

        if(IS_PLAYING){
            stopAudio()
        }else{
            playAudio()
        }
      

        
    })

     
    PLAY_BACK.addEventListener('clock', () => {
        alert('CLick')
        audioIndex--
        const IS_PLAYING = MUSIC_PLAYER.classList.contains('music-player--play')

        if (audioIndex < 0) {
            audioIndex = data.audio.length - 1
        }

        getAudio(data.audio[audioIndex])

        if(IS_PLAYING){
            stopAudio()
        }
    })
    

}

function getAudio(data) {
    AUDIO_NAME.textContent = data.audioName
    AUDIO_AETIST.textContent = data.audioArtist
    COVER_IMG.src = data.audioCover
    AUDIO.src = data.audioFile
}

function playAudio() {
    MUSIC_PLAYER.classList.add('music-player--play')
    PLAY_PLAY.querySelector('i.fas').classList.remove('fa-play')
    PLAY_PLAY.querySelector('i.fas').classList.add('fa-pause')

    AUDIO.play()
}

function stopAudio() {
    MUSIC_PLAYER.classList.remove('music-player--play')
    PLAY_PLAY.querySelector('i.fas').classList.add('fa-play')
    PLAY_PLAY.querySelector('i.fas').classList.remove('fa-pause')

    AUDIO.pause()
}