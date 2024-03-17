const terminal = document.getElementById('terminal');
const text = "Welcome to Ming's Website";
let index = 0;

function typeText() {
    if (index < text.length) {
        terminal.textContent = text.slice(0, index++) + '_';
        setTimeout(typeText, 100); // Adjust the speed of typing
    } else {
        terminal.innerHTML = text + '<span class="cursor">_</span>';
    }
}

typeText();