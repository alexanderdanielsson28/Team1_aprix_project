var newCount = 1;
var totaler = 4;

setInterval(function slideB() {
    var image2 = document.getElementById("img2Slide");
    newCount = newCount + 1;
    if (newCount > totaler) {
        newCount = 1;
    }
    if (newCount < 1) {
        newCount = totaler;
    }
    image2.src = "pics/bild" + newCount + ".jpg";
}, 5000);