var imageCounter = 1;
var total = 4;

setInterval(function slideC() {
    var image = document.getElementById("img1Slide");
    imageCounter = imageCounter + 1;
    if (imageCounter > total) {
        imageCounter = 1;
    }
    if (imageCounter < 1) {
        imageCounter = total;
    }
    image.src = "ChampagneMapp/pics/bla" + imageCounter + ".jpg";
}, 5000);