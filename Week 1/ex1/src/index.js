if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  let breeds = ["malinois","bluetick","beagle","hound","maltese", "kelpie"];
  let wikipediaBreeds = ["Belgian_Malinois","Bluetick","Beagle","Hound","Maltese dog","Kelpie (dog)"];

  let iterator = 0;
  while (iterator <= 5) {
    let wikiItem = document.getElementById("app").appendChild(document.createElement("div"));
    wikiItem.setAttribute("class", "wiki-item");


    let wikiHeader = wikiItem.appendChild(document.createElement("h1"));
    wikiHeader.setAttribute("class", "wiki-header");
    wikiHeader.innerHTML = `${breeds[iterator]}`;


    let wikiContent = wikiItem.appendChild(document.createElement("div"));
    wikiContent.setAttribute("class", "wiki-content");
    let content = wikiContent.appendChild(document.createElement("p"));
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaBreeds[iterator]}`)
      .then(response => response.json())
      .then(data => {
        content.innerHTML = `${data.extract}`;
      });


    let wikiImage = wikiContent.appendChild(document.createElement("div"));
    wikiImage.setAttribute("class", "img-container");
    wikiImage.appendChild(document.createElement("img")).setAttribute("class", "wiki-image");
    fetch(`https://dog.ceo/api/breed/${breeds[iterator]}/images/random`)
      .then(response => response.json())
      .then(data => {
        wikiImage.firstChild.setAttribute("src", data.message);
      });
    iterator++;
  }
}