const range = document.querySelector('.range');
const rangeFill = document.querySelector('.fill');

range.addEventListener('input', event => {
    //progress effect
    rangeFill.style.width = `${range.value}%`;
})