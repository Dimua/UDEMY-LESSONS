'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "ЗВЕЗДНЫЕ ВОЙНЫ",
            "ИВАН ВАСИЛЬЕВИЧ",
            "БРИЛЛИАНТОВАЯ РУКА",
            "НЕ МОЖЕТ БЫТЬ!",
            "ИНОПЛАНЕТЯНИН"
        ]
    };

    const advertisingBlock = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        bgPlan = document.querySelector('.promo__bg'),
        moviesList = document.querySelector('.promo__interactive-list'),
        genreItem = document.querySelector('nav.promo__menu-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        addChek = document.querySelector('[type="checkbox"]'),
        genreItems = genreItem.querySelectorAll('ul>li>a');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const newCheck = addChek.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (newCheck) {
                console.log('Добавили любимый фильм!')
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            creatMovieList(movieDB.movies, moviesList);
        }
        event.target.reset();

    });

const  hideItem =() =>{
    genreItems.forEach(item =>{
        item.classList.remove('promo__menu-item_active');
    });
}
hideItem();

const showItem =(i=0)=>{
    genreItems[i].classList.add('promo__menu-item_active');
}
showItem();

genreItem.addEventListener('click', (event) =>{
   const target = event.target;
   if(target && target.classList.contains('promo__menu-item')){}
   genreItems.forEach((item, i) =>{
       if(target === item){
           hideItem();
           showItem(i);
       }
   });
});

    const deleteAdv = () => {
        advertisingBlock.forEach(item => {
            item.remove();
        });
    }
    deleteAdv();


    const makeChanges = () => {
        genre.textContent = 'Драма';
        bgPlan.style.backgroundImage = 'url("img/bg.jpg")';
    }
    makeChanges();


    const sortArr = () => {
        movieDB.movies.sort();
    }
    sortArr(movieDB.movies);


    function creatMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(movieDB.movies);
        films.forEach((film, i) => {
            parent.innerHTML +=
                `<li class="promo__interactive-item">${i + 1}) ${film}
            <div class="delete"></div>
        </li>`;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                creatMovieList(films, parent);
            })
        })
    }
    creatMovieList(movieDB.movies, moviesList);
});
