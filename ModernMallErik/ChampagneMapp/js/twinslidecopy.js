var newCount = 1;
var total3 = 4;

setInterval(function slideB() {
    var image2 = document.getElementById("img2Slide");
    newCount = newCount + 1;
    if (newCount > total3) {
        newCount = 1;
    }
    if (newCount < 1) {
        newCount = total3;
    }
    image2.src = "ChampagneMapp/pics/bild" + newCount + ".jpg";
}, 5000);