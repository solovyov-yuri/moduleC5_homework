const btn = document.querySelector('button');
const result = document.querySelector('.result')

btn.addEventListener('click', () => {
  useRequest(displayResult);
});

function useRequest(callback) {
  const value = document.querySelector('input').value;

  if (value < 1 || value > 10) {
    console.log('число вне диапазона от 1 до 10')
  } else {
    url = `https://picsum.photos/v2/list?limit=${value}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Response statuse: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        callback(result);
      }
    };

    xhr.onerror = function() {
      console.log('Error! Respond status: ', xhr.status);
    }

    xhr.send();
  }
};

function displayResult(apiData) {
  let cards = '';

  apiData.forEach(element => {
    const cardBlock = `
    <div class="card">
      <img
        src="${element.download_url}"
        class="card-image"
      />
      <p>${element.author}</p>
    </div>
    `;

    cards = cards + cardBlock;
  });

  console.log(cards)

  result.innerHTML = cards;
}
