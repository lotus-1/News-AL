const input = document.getElementById('input');
input.addEventListener('click', (value) => {
  value.preventDefault();
  fetch("/search")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data = data.toLowerCase();
      console.log(data);
})
    .catch(function(error) {
      console.log(error);
    });
});
