const reveals = document.querySelectorAll('.reveal');

function checkVisible() {
    reveals.forEach(element => {
        const { top, bottom } = element.getBoundingClientRect();
        if (bottom > 0 && top < window.innerHeight) {
            element.classList.add('reveal_active');
        } else {
            element.classList.remove('reveal_active');
        }
    });
}

window.addEventListener('scroll', checkVisible);
checkVisible();