let arr;

document.querySelector('.inp').addEventListener('input',function(){
    entlog = enterLogin.test(sel('.login').value)
    if(entlog) sel('.login').style.border = '1px solid green';
    else sel('.login').style.border = '1px solid red';
    
})
const getData = async () =>  {
    try {
        const search = document.querySelector('.inp').value;
        const fil = "http://www.omdbapi.com/?s=";
        const api = "&apikey=eeb56d4b";
        const films = fil + search + api;
        const response = await fetch(films);
        const data = await response.json();
        console.log(data.Search);
        document.querySelector('.content').innerHTML = '';
        data.Search.forEach((movies,index) => {
                imd = movies.imdbID;
                document.querySelector('.content').innerHTML += 
                `<div class="film">
                <div class="film__content">
                    <div class="film__logotype">
                        <img src="${movies.Poster}" width="200px" height="300px" alt="#">
                    </div>
                    <div class="film__title">
                        <h2>${movies.Title}</h2>
                    </div>
                    <div class="film__info">
                        <p>${movies.Type}</p>
                        <p>${movies.Year}</p>
                    </div>
                    <div class="btn">
                        <button type="button" onclick="more(${index})" id="btn__more" class="btn btn-success btn__details">More details</button>
                    </div>
                </div>
            </div>
                `
                document.querySelector('.inp').value = '';
               arr = localStorage.setItem('arr', JSON.stringify(data.Search));
        })
    } catch {
        document.querySelector('.content').innerHTML = `<div class="title__error"><h1>Такого фільму немає</h1></div>`;
        document.querySelector('.inp').value = '';
    }
}

const more = async (index) =>  {
    console.log(index);
    arr = JSON.parse(localStorage.getItem('arr'));
    console.log(arr[index].imdbID); 
    const moreFilm = arr[index].imdbID;
    const fil = "http://www.omdbapi.com/?i=";
    const api = "&apikey=eeb56d4b";
    const Infofilms = fil + moreFilm + api;
    try {
        const response = await fetch(Infofilms);
        const data = await response.json();
        console.log(data);
        document.body.querySelector('.more__Datails').innerHTML+=`
        <div class="more">
        <div class="more__img">
            <img src="${data.Poster}"  alt="#">
        </div>
        <div class = "more__more-info">
            <div class="more__more-info-title">
                <h2>${data.Title}</h2>
            </div>
            <span>${data.Rated}</span>
            <p>"${data.Plot}"</p>
            <p><b>Wrinen by:</b>${data.Writer}</p>
            <p><b>Direct by:</b> ${data.Director}</p>
            <p><b>Actors:</b> ${data.Actors}</p>
            <p><b>BoxOffice:</b> ${data.BoxOffice}</p>
            <p><b>Awards:</b> ${data.Awards}</p>
            <p><b>Rating:</b> ${data.imdbRating}</p>
           
        </div>
    </div>
        `
        document.querySelector('.block').style.display = "block";  
        document.querySelector('.block').style.zIndex = "1";  
        document.querySelector('.more__Datails').style.display = "block";
        document.querySelector('.more__Datails').style.zIndex = "2";
       
    } catch {
        document.querySelector('.content').innerHTML = `<div class="title__error"><h1>Немає інформації про фільм</h1></div>`;
    }     
}
document.querySelector('.block').addEventListener('click',function(){
    document.querySelector('.block').style.display = "none";  
    document.querySelector('.more__Datails').style.display = "none";
    document.querySelector('.more__Datails').innerHTML = "";
    document.querySelector('.block').style.zIndex = "0";  
    document.querySelector('.more__Datails').style.zIndex = "0";
})

