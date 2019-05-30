


const allBeer = 'http://localhost:3000/beers'
const beerList = document.querySelector('#list-group')
const beerDetial = document.querySelector('#beer-detail')

//render all beer list
fetch(allBeer, {method: "GET"})
.then(respond => respond.json())
.then(data => {
  // console.log(beerList);
  data.forEach( function (beer) {
    beerList.innerHTML += `<li class="list-group-item" id = '${beer.id}'>${beer.name}</li>`
  })//end of forEach
})//end of first fetch



//render beer detials
beerList.addEventListener('click', function (e) {
  // console.log(beerArray[0]);
  fetch(`http://localhost:3000/beers/${e.target.id}`)
  .then(respond => respond.json())
  .then(data => {
    beerDetial.innerHTML = `<h1>${data.name}</h1>
                            <img src="${data.image_url}">
                            <h3>${data.tagline}</h3>
                            <textarea>${data.description}</textarea>
                            <button id="edit-beer" class="btn btn-info">
                            Save
                            </button>`
  })//end of fetch
})//end of addEventListener


//edit beer description

beerDetial.addEventListener('click', function (e) {
  let editingTag = document.querySelector('textarea')
  console.log(editingTag.innerText);
  const saveBtn = document.querySelector('#edit-beer')
  // console.log(saveBtn);
  fetch(`http://localhost:3000/beers/${e.target.id}`, {
    method: "PATCH",
    headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
    body: JSON.stringify({description: editingTag.innerText.value})
})
  if (e.target.className == "btn btn-info") {
     editingTag.innerText.save()
  }
  // console.log(e.target.id);
})
