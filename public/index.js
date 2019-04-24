const submitButton = document.getElementById('input');

submitButton.addEventListener('click', (event) => {
event.preventDefault();
var userInput = document.getElementById('userInput').value;

console.log(userInput);

fetch('/search?sources='+userInput)
      .then((response) => {
      return response;
      })
    .then((data) => {
        console.log(data);
    })
      .catch((err) => {
      console.log(err);
    });
});
