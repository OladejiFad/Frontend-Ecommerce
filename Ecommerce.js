
// to display my navbar in an evelop
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('actives');
    })
}


// to close my navbar in an evelop
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('actives');
    })
}