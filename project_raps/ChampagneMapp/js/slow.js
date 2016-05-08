function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

var ypos;
var image;
function paralex() {
    ypos = window.pageYOffset;
    image = document.getElementById('paralax');
    image.style.top = ypos * .4 + 'px';
}window.addEventListener('space',paralex);