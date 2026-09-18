/* =========================================
   ELEMENTS
========================================= */

const coverStage = document.getElementById("coverStage");
const insideStage = document.getElementById("insideStage");
const candleStage = document.getElementById("candleStage");
const cakeStage = document.getElementById("cakeStage");
const giftStage = document.getElementById("giftStage");
const finalStage = document.getElementById("finalStage");

const coverCard = document.querySelector(".cover-card");

const openBtn = document.getElementById("openBtn");
const continueBtn = document.getElementById("continueBtn");
const cakeContinueBtn = document.getElementById("cakeContinueBtn");
const giftBtn = document.getElementById("giftBtn");
const restartBtn = document.getElementById("restartBtn");

const giftBox = document.getElementById("giftBox");

const candleVideo = document.getElementById("candleVideo");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");


/* =========================================
   STAGE FUNCTION
========================================= */

function showStage(stage) {

    const stages = [
        coverStage,
        insideStage,
        candleStage,
        cakeStage,
        giftStage,
        finalStage
    ];

    stages.forEach(function(item) {
        item.classList.remove("active");
    });

    stage.classList.add("active");
}


/* =========================================
   BACKGROUND MUSIC
========================================= */

let musicStarted = false;

function startMusic() {

    if (musicStarted) {
        return;
    }

    bgMusic.volume = 0.45;

    bgMusic.play()
        .then(function() {
            musicStarted = true;
            musicBtn.textContent = "🔊 Music";
        })
        .catch(function() {
            /*
                Browser autoplay protection may block music.
                The user can press the Music button manually.
            */
        });
}


musicBtn.addEventListener("click", function() {

    if (bgMusic.paused) {

        bgMusic.play()
            .then(function() {
                musicStarted = true;
                musicBtn.textContent = "🔊 Music";
            })
            .catch(function() {});

    } else {

        bgMusic.pause();

        musicBtn.textContent = "🔇 Music";
    }

});


/* =========================================
   OPEN CARD
========================================= */

openBtn.addEventListener("click", function() {

    startMusic();

    /*
        First animate the cover opening.
    */

    coverCard.classList.add("opened");

    /*
        Wait for the opening animation to finish,
        then show inside card.
    */

    setTimeout(function() {

        showStage(insideStage);

    }, 1200);

});


/* =========================================
   CONTINUE → CANDLE
========================================= */

let candleTimer = null;

continueBtn.addEventListener("click", function() {

    showStage(candleStage);

    /*
        Reset candle video every time.
    */

    clearTimeout(candleTimer);

    candleVideo.pause();

    candleVideo.currentTime = 0;

    /*
        Candle video is muted so mobile browsers
        allow it to autoplay.
    */

    candleVideo.muted = true;

    candleVideo.play()
        .catch(function() {
            /*
                If autoplay is blocked, the video is still
                visible and the stage will continue after 10 sec.
            */
        });


    /*
        EXACTLY 10 SECONDS
        after entering candle stage,
        move to cake.
    */

    candleTimer = setTimeout(function() {

        candleVideo.pause();

        showStage(cakeStage);

    }, 10000);

});


/* =========================================
   CAKE → GIFT
========================================= */

cakeContinueBtn.addEventListener("click", function() {

    showStage(giftStage);

});


/* =========================================
   OPEN GIFT
========================================= */

giftBtn.addEventListener("click", function() {

    giftBox.classList.add("opened");

    /*
        Give the lid animation time to happen,
        then reveal final message.
    */

    setTimeout(function() {

        showStage(finalStage);

    }, 900);

});


/* =========================================
   PLAY AGAIN
========================================= */

restartBtn.addEventListener("click", function() {

    /*
        Stop candle video.
    */

    clearTimeout(candleTimer);

    candleVideo.pause();

    candleVideo.currentTime = 0;


    /*
        Reset gift.
    */

    giftBox.classList.remove("opened");


    /*
        Reset cover.
    */

    coverCard.classList.remove("opened");


    /*
        Go back to beginning.
    */

    showStage(coverStage);

});


/* =========================================
   INITIAL STATE
========================================= */

showStage(coverStage);
