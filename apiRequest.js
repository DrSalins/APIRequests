const jokeElement = document.querySelector(".jokeElement");
const jokeBtn = document.querySelector(".jokeBtn");
const countryElement = document.querySelector(".country");
const populationElement = document.querySelector(".population");
const countryBtn = document.querySelector(".countryBtn");
const cryptoBtn = document.querySelector(".cryptoBtn");
const coinNameSpan = document.querySelector(".coinNameSpan");
const coinInfo = document.querySelector(".coinInfo");
const hkdInfo = document.querySelector(".hkdInfo");
/*Joke API*/
jokeBtn.addEventListener("click", function () {
  let http = new XMLHttpRequest();
  http.open("GET", "https://v2.jokeapi.dev/joke/Any?format=txt");
  http.onreadystatechange = function () {
    if (http.readyState != XMLHttpRequest.DONE) {
      return;
    } else if (http.status == 200) {
      jokeElement.innerHTML = http.responseText;
    } else {
      console.log("An Error Occurred " + http.status);
    }
  };
  http.send();
});
/*RESTCountries API*/
countryBtn.addEventListener("click", function () {
  const countryData = () => {
    let name = document.querySelector(".countryText").value;
    countryElement.innerHTML = name.toUpperCase();
    const requestData = fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    )
      .then((response) => response.json())
      .then(
        (data) =>
          (populationElement.innerHTML = data[0].population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      );
  };
  countryData();
});
/*Coin Cap API*/
cryptoBtn.addEventListener("click", function () {
  const coinData = () => {
    let cryptoNameValue = document
      .querySelector(".cryptoText")
      .value.toLowerCase();
    coinNameSpan.innerHTML = cryptoNameValue.toUpperCase();
    const requestData = fetch(
      `https://api.coincap.io/v2/assets/${cryptoNameValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        coinInfo.innerHTML = Math.floor(data.data.priceUsd)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        hkdInfo.innerHTML = Math.floor(data.data.priceUsd * 7.75)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
  };
  coinData();
});
