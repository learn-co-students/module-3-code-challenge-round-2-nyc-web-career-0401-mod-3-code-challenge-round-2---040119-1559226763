const BEERS_URL = "http://localhost:3000/beers"
const listGroup = document.querySelector("#list-group")
const beerDetail = document.querySelector("#beer-detail")

fetch(BEERS_URL)
  .then(r => r.json())
  .then(beersObject => {
      console.log(beersObject)
      beersObject.forEach(beer => {
        listGroup.innerHTML+= `
          <li class="list-group-item" id=${beer.id}> ${beer.name}</li>
          `

          })
      })

  listGroup.addEventListener("click", event => {
    console.log(event.target)
    let targetId = event.target.id
    const BEER_URL = `http://localhost:3000/beers/${targetId}`

    fetch(BEER_URL)
      .then(r => r.json())
      .then(beerObj => {
        console.log(beerObj)
        beerDetail.innerHTML=`
        <h1>${beerObj.name}</h1>
        <img src="${beerObj.image_url}">
        <h3>${beerObj.tagline}</h3>
        <textarea>${beerObj.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>
        `
        const editBeer = document.querySelector('#edit-beer')
        console.log(editBeer)
        editBeer.addEventListener('click', event => {
            console.log(event.target)
            let targetValue = event.target.previousElementSibling.value
            fetch(BEER_URL, {
              method:"PATCH",
              headers:   {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(
                  {description: targetValue}
                )
            }).then(r => r.json())
              .then(console.log)
            // debugger
          })

      })

  })
