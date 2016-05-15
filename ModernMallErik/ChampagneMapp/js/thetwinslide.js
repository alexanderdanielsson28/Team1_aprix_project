var imageCounter = 1;
var total2 = 4;

setInterval(function slideC() {
    var image = document.getElementById("img1Slide");
    imageCounter = imageCounter + 1;
    if (imageCounter > total2) {
        imageCounter = 1;
    }
    if (imageCounter < 1) {
        imageCounter = total2;
    }
    image.src = "ChampagneMapp/pics/bla" + imageCounter + ".jpg";
}, 5000);