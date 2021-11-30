// global variable for the player


let player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    alert (11)
    player = new YT.Player("youtube-video", {
        events: {
            // call this function when player is ready to use
            onReady: onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // bind events
    alert('onPlayerReady')
    const playButton = document.getElementById("customPlaybtn");

    playButton.addEventListener("click", function () {
        console.log('click')
        player.playVideo();
        document.querySelector('.video__poster').style.display = 'none'
    });
}


// Inject YouTube API script
const tag = document.createElement("script");
tag.src = "//www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);