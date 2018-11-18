
const imageBox = document.querySelector('#imageBox'),
      loadAnotherBtn = document.querySelectorAll('.anotherDogBtn'),
      alertContainer = document.querySelector('.alertContainer'),
      alertText = alertContainer.querySelector('.alertText'),
      endpoint = 'https://random.dog/woof.json',
      greetings = 'greetings.json';
      greetingArr = [];
let doggyCount = 1;

function showMeADoggy() {
    fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
    console.log(data.url.slice(-3));
        if((data.url.slice(-3) == "jpg") ||
           (data.url.slice(-3) == "png") || 
           (data.url.slice(-3) == "gif") || 
           (data.url.slice(-3) == "JPG")) {
            if(((doggyCount/10)%1 == 0)) {
                let randNum = Math.floor(Math.random()*greetingArr.length);
                alertContainer.style.display = 'flex';
                alertText.innerHTML = `${greetingArr[randNum].greeting} <br>You looked at ${doggyCount} dogs`;
                doggyCount++;
            } else {
                alertContainer.style.display = 'none';
                imageBox.setAttribute('src', data.url);
                doggyCount++;
                console.log((doggyCount/10)%1);
            }
        } else {
            showMeADoggy();
        }
    }).catch(error => console.log(error));
}

fetch(greetings)
.then(blob => blob.json())
.then(data => greetingArr.push(...data));

document.addEventListener('DOMContentLoaded', showMeADoggy);
loadAnotherBtn.forEach(button => {
    button.addEventListener('click', showMeADoggy);
});
