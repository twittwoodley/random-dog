//Grab elements
const imageBox = document.querySelector('#imageBox'),
      loadAnotherBtn = document.querySelectorAll('.anotherDogBtn'),
      alertContainer = document.querySelector('.alertContainer'),
      alertText = alertContainer.querySelector('.alertText'),
      spinner = document.querySelector('.spinner');
      //Get data url's
      endpoint = 'https://random.dog/woof.json',
      greetings = 'greetings.json';
      //Empty array for greetings to be pushed to
      greetingArr = [];
//Count of how many dogs the user has looked at
let doggyCount = 1;

function showMeADoggy() {
    //Get data from external source
    fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
    
    //Check that the data recieved is a static image. If not, re-run the function
    if((data.url.slice(-3) == "jpg") ||
        (data.url.slice(-3) == "png") || 
        //(data.url.slice(-3) == "gif") || 
        (data.url.slice(-3) == "JPG")) {
            //If all the above is true
            //Show spinner, start timeout, and then hide after the given amount of time
           showSpinner();
            setTimeout(hidespinner, 2200);
            //If the doggyCount is at a multiple of 10, show greeting message modal
            if(((doggyCount/10)%1 == 0)) {
                hidespinner();
                let randNum = Math.floor(Math.random()*greetingArr.length);
                alertContainer.style.display = 'flex';
                alertText.innerHTML = `${greetingArr[randNum].greeting} <br>You looked at ${doggyCount} dogs`;
                doggyCount++;
            } else {
                //Make sure message/alert container is hidden
                alertContainer.style.display = 'none';
                //change image source
                imageBox.setAttribute('src', data.url);
                doggyCount++;
                console.log((doggyCount/10)%1);
                //hidespinner();
            }
    } else {
        showMeADoggy();
    }
    }).catch(error => console.log(error));
}

function showSpinner() {
    spinner.style.display = 'flex';
    imageBox.style.opacity = '0.5';
}

function hidespinner() {
    spinner.style.display = 'none';
    imageBox.style.opacity = '1.0';
}
//get greeting data and push into empty array
fetch(greetings)
.then(blob => blob.json())
.then(data => greetingArr.push(...data));


//Event listeners
document.addEventListener('DOMContentLoaded', showMeADoggy);
loadAnotherBtn.forEach(button => {
    button.addEventListener('click', showMeADoggy);
});
