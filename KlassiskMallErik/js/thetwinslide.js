var imageCounter = 1;
var total1 = 4;

setInterval(function slideC() {
    var image = document.getElementById("img1Slide");
    imageCounter = imageCounter + 1;
    if (imageCounter > total1) {
        imageCounter = 1;
    }
    if (imageCounter < 1) {
        imageCounter = total1;
    }
    image.src = "pics/bla" + imageCounter + ".jpg";
}, 5000);