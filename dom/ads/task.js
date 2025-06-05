const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
    const cases = rotator.querySelectorAll('.rotator__case');
    let index = 0;
    let timeout;

    function showNextCase() {
        cases[index].classList.remove('rotator__case_active');
        index = (index + 1) % cases.length;
        cases[index].classList.add('rotator__case_active');

        const speed = cases[index].dataset.speed ? Number(cases[index].dataset.speed) : 1000;
        const color = cases[index].dataset.color;
        if (color) {
            cases[index].style.color = color;
        } else {
            cases[index].style.color = '';
        }
        timeout = setTimeout(showNextCase, speed);
    }

    const activeIndex = Array.from(cases).findIndex(item => item.classList.contains('rotator__case_active'));
    if (activeIndex !== -1) {
        index = activeIndex;
        const color = cases[index].dataset.color;
        if (color) {
            cases[index].style.color = color;
        }
    } else {
        cases[0].classList.add('rotator__case_active');
        const color = cases[0].dataset.color;
        if (color) {
            cases[0].style.color = color;
        }
    }

    const firstSpeed = cases[index].dataset.speed ? Number(cases[index].dataset.speed) : 1000;
    timeout = setTimeout(showNextCase, firstSpeed);
});