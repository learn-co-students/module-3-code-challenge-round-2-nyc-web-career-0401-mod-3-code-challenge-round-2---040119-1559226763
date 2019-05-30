document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

const beersURL = "http://localhost:3000/beers"
const beerRow = document.querySelector(".list-group")
const beerArray = []
const beerDetail = document.querySelector("#beer-detail")

// console.log(beerDetail);

    fetch(beersURL)
     .then(function(response) {
       return response.json();
     })
     .then(function(beers) {
       console.log(beers);
       beers.forEach(function(beer){
         beerArray.push(beer)
         beerRow.innerHTML += ` <li id=${beer.id} class="list-group-item">${beer.name}</li>`
       }) //beers.forEach(function(beer){

         beerRow.addEventListener("click", function (e) {
           // console.log(typeof(e.target.id));
           let selectedBeer = beerArray.find(function(beer) {
             return parseInt(e.target.id) === beer.id})

           beerDetail.innerHTML = `
           <h1 id="${selectedBeer.id}">${selectedBeer.name}</h1>
           <img src= ${selectedBeer.image_url}>
           <h3>${selectedBeer.tagline}</h3>
           Description:
           <textarea id="text_area">${selectedBeer.description}</textarea>
           <button id="edit-beer" class="btn btn-info">
             Save
           </button>
           `

           const text_area = document.querySelector("#text_area")
           beerDetail.addEventListener("click", function(e) {
             if (e.target.id === "edit-beer") {
             // console.log(e.target.parentNode.children[0].id);
             let beerId = e.target.parentNode.children[0].id
             // let chosen = beerArray.find(function(beer) {
             //   return beer.id === parseInt(beerDetail.children[0].id)
             // }) //let chosen = beerArray
             // console.log(chosen.id);
             console.log(beerId);
             // console.log(e.target.id)
               fetch(`http://localhost:3000/beers/${beerId}`, {
                 method: "PATCH",
                 headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
                  }, //headers:
                body: JSON.stringify({"description": text_area.value})
              }) //fetch(`http://localhost:3000/beers/:id`, {
              } //if (e.target.id === "edit-beer") {
           })//beerDetail.addEventListener("cli

         }) //beerRow.addEventListener("click", function (e) {



     }); //.then(function(beers) {


});
