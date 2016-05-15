var imageCount = 1;
var total = 9;

function slide(x) {
    var image = document.getElementById("slideImg");
    imageCount = imageCount + x;
    if (imageCount > total) {
        imageCount = 1;
    }
    if (imageCount < 1) {
        imageCount = total;
    }
    image.src = "ChampagneMapp/pics/img" + imageCount + ".jpg";
}

setInterval(function slideA() {
    var image = document.getElementById("slideImg");
    imageCount = imageCount + 1;
    if (imageCount > total) {
        imageCount = 1;
    }
    if (imageCount < 1) {
        imageCount = total;
    }
    image.src = "ChampagneMapp/pics/img" + imageCount + ".jpg";
}, 7500);