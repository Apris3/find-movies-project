const button_search = document.querySelector('.button-search')
button_search.addEventListener('click', ()=>{
    const search = document.querySelector('.input-search');
    return fetch(`http://www.omdbapi.com/?apikey=f981b3ad&s=${search.value}`)
    .then(response => response.json())
    .then(data =>{
        const result = data.Search;
        document.querySelector('.notFound').innerHTML = '';
        const container_result = document.querySelector('.container-result')
        container_result.innerHTML = '';
        for(let item of result){
            container_result.innerHTML += templateMovies(item)
        };
    }).catch(() =>{
         document.querySelector('.notFound').innerHTML = templateError(search.value.toUpperCase());
     });
});

const templateMovies = (movie)=>{
    return `
        <div class="movie-item">
            <div class="movie-item-img">
                <img src="${movie.Poster}" width="100%">
            </div>
            <div class="movie-item-desc">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <button class="detail-button" id="${movie.imdbID}">Detail</button>
            </div>
        </div>
    `;
    };

    const templateError = (e)=>{
        return `
            <h4>"${e}" is not found!</h4>
        `;
    };

    document.addEventListener('click', (e)=>{
    const detailButton = document.querySelectorAll('.detail-button')
    for(let button of detailButton){
        if(e.target === button){
           const getId = button.getAttribute('id')
           const movie = getdetailMovie(getId)
        };
    };
    });

    const getdetailMovie = (id)=>{
       fetch(`http://www.omdbapi.com/?apikey=f981b3ad&i=${id}`)
       .then(response => response.json())
       .then(movie =>{
         const detail = detailMovieTemplate(movie)
         const container_detail = document.querySelector('.detail-movie')

        container_detail.innerHTML = '';
        container_detail.innerHTML = detail;
    });
    };

    const detailMovieTemplate =  (movie)=>{
        return `
            <div class="container-detail-movie">
                <div>
                    <h2 class="detail-header">Detail :</h2>
                    <img src="${movie.Poster}" width="100%">
                </div>
                <div class="movie-detail-template">
                    <h3>Title : ${movie.Title}</h3>
                    <p><b>Year</b> : ${movie.Year}</p>
                    <p><b>Ratings</b> : ${movie.Ratings[0].Value}</p>
                    <p><b>Realeased</b> : ${movie.Released}</p>
                    <p><b>Genre</b> : ${movie.Genre}</p>
                    <p><b>Director</b> : ${movie.Director}</p>
                    <p><b><i>Writer</i></b> : ${movie.Writer}</p>
                    <p><b>Plot</b> : ${movie.Plot}</p>
                    <button class="close-item">CLOSE</button>
                </div>
            </div>
            
            
        `;
    };

    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('close-item')){
            const container_detail = document.querySelector('.detail-movie')
            container_detail.innerHTML = '';
        };
    });


