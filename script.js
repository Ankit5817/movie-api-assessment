var movieObj;
document.getElementById('popUp').style.visibility = 'hidden'

let display = () => {
  let title = document.getElementById('movieName').value;
  fetch(`http://www.omdbapi.com/?apikey=96497625&t=${title}`)
    .then(res => res.json())
    .then(data => {
      movieObj = {
        Poster: data.Poster,
        Title: data.Title,
        Actors: data.Actors,
        Plot: data.Plot,
        Director: data.Director,
        Genre: data.Genre,
        Runtime: data.Runtime
      }
      document.getElementById('card').innerHTML =
        `
        <div class="card border border-dark border-2" style="width: 15rem;" id='cardContent'>
            <img src="${data.Poster}" class="card-img-top w-50 mx-auto mt-3" alt="...">
            <div class="card-body" id='movieDetails'>
              <h5 class="card-title">${data.Title}</h5>
              <p class="card-text">${data.Actors}</p>
              <p class="card-text">${data.Plot}</p>
              <p class="card-text">${data.Director}</p>
              <p class="card-text">${data.Genre}</p>
              <p class="card-text">${data.Runtime}</p>
              <button class="btn btn-primary" type="button" onclick='addMovie()'>Add Movie</button>
            </div>
        </div>
        `
    })

}

const addMovie = () => {
  fetch(`http://localhost:3000/movies?title=${movieObj.Title}`)
    .then(res => res.json())
    .then(data => {
      if (data.length == 0) {
        fetch('http://localhost:3000/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            poster: `${movieObj.Poster}`,
            title: `${movieObj.Title}`,
            actors: `${movieObj.Actors}`,
            plot: `${movieObj.Plot}`,
            director: `${movieObj.Director}`,
            genre: `${movieObj.Genre}`,
            runtime: `${movieObj.Runtime}`,
            rating: 'NA'
          })
        })
      }
      else{
        document.getElementById('popUp').style.visibility = 'visible'
        setTimeout(() => {
          document.getElementById('popUp').style.visibility = 'hidden'
        },3000);
      }
    })
}

var input = document.getElementById('movieName');
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    display();
  }
})

const movieCardList = () => {
  fetch('http://localhost:3000/movies')
    .then(res => res.json())
    .then(data => {
      let listItem = ''
      data.map(item => {
        listItem += `
        <div class="col-md-4 col-11 my-5 d-flex justify-content-center">
      <div class="card border border-dark border-2" style="width: 15rem;" id='cardContent'>
          <img src="${item.poster}" class="card-img-top w-50 mx-auto mt-3" alt="...">
          <div class="card-body" id='movieDetails'>
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.actors}</p>
            <p class="card-text">${item.plot}</p>
            <p class="card-text">${item.director}</p>
            <p class="card-text">${item.genre}</p>
            <p class="card-text">${item.runtime}</p>
            <p class="card-text">Rating - ${item.rating}</p>
            <button class="btn btn-primary" type="button" onclick='deleteMovie(${item.id})'>Remove</button>
            <div class="btn-group">
            <button type="button" class="btn btn-danger dropdown-toggle ms-2" data-bs-toggle="dropdown" aria-expanded="false">
            Rating
            </button>
            <ul class="dropdown-menu bg-light py-0" id='dropDown'>
              <li onclick='giveRating(1,${item.id})' class=' border border-bottom-dark ps-3'>1</li>
              <li onclick='giveRating(2,${item.id})' class=' border border-bottom-dark ps-3'>2</li>
              <li onclick='giveRating(3,${item.id})' class=' border border-bottom-dark ps-3'>3</li>
              <li onclick='giveRating(4,${item.id})' class=' border border-bottom-dark ps-3'>4</li>
              <li onclick='giveRating(5,${item.id})' class=' border border-bottom-dark ps-3'>5</li>
              <li onclick='giveRating(6,${item.id})' class=' border border-bottom-dark ps-3'>6</li>
              <li onclick='giveRating(7,${item.id})' class=' border border-bottom-dark ps-3'>7</li>
              <li onclick='giveRating(8,${item.id})' class=' border border-bottom-dark ps-3'>8</li>
              <li onclick='giveRating(9,${item.id})' class=' border border-bottom-dark ps-3'>9</li>
              <li onclick='giveRating(10,${item.id})' class=' border border-bottom-dark ps-3'>10</li>
            </ul>
          </div>
          </div>
      </div>
      </div>
      `
      })
      document.getElementById(`movieCardList`).innerHTML = listItem
    })

}

const deleteMovie = (id) => {
  fetch(`http://localhost:3000/movies/${id}`, {
    method: "DELETE"
  })
}

const giveRating = (num, id) => {
  fetch(`http://localhost:3000/movies/${id}`)
    .then(res => res.json())
    .then(data => {
      fetch(`http://localhost:3000/movies/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          poster: `${data.poster}`,
          title: `${data.title}`,
          actors: `${data.actors}`,
          plot: `${data.plot}`,
          director: `${data.director}`,
          genre: `${data.genre}`,
          runtime: `${data.runtime}`,
          rating: num
        })
      })
    })
}

movieCardList();

