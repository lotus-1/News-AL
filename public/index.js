const submitButton = document.getElementById('input');

submitButton.addEventListener('click',(event) => {
event.preventDefault();
const userInput = document.getElementById('userInput').value;
console.log(userInput);

fetch('/search?sources='+userInput)
      .then((response) => {
      console.log('my response is', response);
      return response.json();
      })
    .then((data) => {
        console.log('this is my data', data);
        var info = document.createElement('a');
        var text = document.createTextNode('Click Here');
        info.href = data;
        info.appendChild(text);
        var div = document.getElementById('info');
        div.appendChild(info);
        window.open(data,"_blank");
    })
      .catch((err) => {
      console.log(err);
    });
});
