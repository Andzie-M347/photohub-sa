import 'regenerator-runtime/runtime';

import {
  createApi
} from "unsplash-js";

import './css/main.css';
import './icons/css/all.min.css';

const api = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});

const loader = document.querySelector('.loader');
const apiKey = '783f46460ebede7f21f34b84eb80206e27d042af75812821ffbcd17828afee3f'
const count = 10;
let page = 0;
const url = 'https://api.unsplash.com';
const apiEndpoint = `${url}/photos/?client_id=${apiKey}&page=${page}&per_page=${count}` ;




// async function getResponse() {
//   const pro = await fetch(apiEndpoint);
//   return pro;
// }

// getResponse();

// Get image container
const imageContainer = document.querySelector('.photohub-content__wrapper');

const loadMore = async () => {
  loader.style.display = "block";

    // console.log(`${url}/photos/?client_id=${apiKey}&page=${page++}&per_page=${count}`);
    await fetch(`${url}/photos/?client_id=${apiKey}&page=${page++}&per_page=${count}`)
  
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {

        data.map(photo => {
          const figure = document.createElement('figure');
          figure.classList.add('photohub-content__image');
          figure.innerHTML = `
                <a href="javascript:void(0)" >
                    <img src="${photo.urls.thumb}" class="img-responsive" title="${photo.alt_description}" />
                </a>
            `;
          imageContainer.appendChild(figure);
          const figcaption = document.createElement('figcaption');
          figcaption.innerHTML = `<div class="cite">
                    <img src=${photo.user.profile_image.small} class="cite__rounded" alt="${photo.alt_description}">
                     <a href="javascript:void(0)" class="cite__title" title="${photo.user.first_name}"> ${photo.user.first_name}</a>
                </div>`;
          figure.appendChild(figcaption);

          console.log(photo);
        })
      }


      loader.style.display = "none";
    })
    .catch(err => {
      console.log(err)
    })
}



window.addEventListener('scroll', function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
    
    loadMore();
  }
});

loadMore();


// Dropdown menu
(function () {
  var elements = document.querySelectorAll(".dropdown-button");

  function openDropdown(event) {
    event.target.parentNode.classList.add("open");
  }

  function resetDropdowns() {
    var element = document.querySelector(".dropdown-button.open");
    if (element) {
      element.classList.remove("open");
    }
  }

  function documentHandler() {
    resetDropdowns();
    document.removeEventListener('click', documentHandler, false);
  };

  if (elements.length > 0) {
    elements.forEach(el => {
      el.addEventListener('click', function (e) {
        var isActive = e.target.parentNode.classList.contains("open");
        resetDropdowns();
        if (isActive) {
          return;
        }
        e.stopPropagation();
        e.preventDefault();
        openDropdown(e);
        document.addEventListener('click', documentHandler, false);
      }, false);
    })
  }

})();


// Search Autocomplete 

const output = document.querySelector('#output-card');
const search = document.querySelector('#search');

search.addEventListener('input', () => searchTopics(search.value));

const searchTopics = async searchText => {
  const res = await fetch(`${url}/topics/?per_page=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
  const topics = await res.json();

  let matches = topics.filter(topic => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return topic.title.match(regex);
  });

  if (searchText.length === 0) {
    matches = []
    output.innerHTML = '';
    output.classList.remove('output-card__inner');

  }

  outputHtml(matches);
};


const outputHtml = (matches) => {
  if (matches.length > 0) {

    output.classList.add('output-card__inner');
    const htmlOutput = matches.map((match) => {
      return `<div class="search-results" > 
          <a href="javascript:void(0)">  ${match.title} </a> 
        </div >`
    }).join('');


    output.innerHTML = htmlOutput;
  }
}



// Get single Image 
// const banner = document.querySelector('.showcase-banner');

// api.photos.getRandom('https://api.unsplash.com/photos/photos/random', {
//   collectionIds: ['abc123'],
//   topicIds: ['def456'],
//   featured: true,
//   username: 'naoufal',
//   query: 'dog',
//   count: 1,
// }).then(result => {
//   const photo = result.response;
//   banner.style.background = `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${photo.urls.regular}) 0% 0% / cover no-repeat`;
//   const cite = document.createElement('div');
//   cite.classList.add('showcase-banner__cite');
//   cite.innerHTML = `<div class="cite-box">
//          <small class="box-cite__user">
//             <a href="javascript:void(0)">
//                 <span> Photo by ${photo.user.first_name} </span
//             </a>
//          </small>
//     </div>`;
//   banner.appendChild(cite);
// });





// Tags - topics
const tags = document.querySelector('.topics');

api.topics.list('https://api.unsplash.com/topics', {
  page: 1,
  perPage: 12,

}).then(result => {
  const topics = result.response;
  topics.results.map((topic) => {
    const li = document.createElement('li');
    li.classList.add('topic__list');
    li.innerHTML = `<div class="swiper">
                <a href="javascript:void(0)">${topic.title}</a>
        </div>`;
    tags.appendChild(li);
  });

})


// Load more button

const more = document.querySelector('#load-more');

more.addEventListener('click', () => {
  page++;

  if (fetchLink) {
    `${url}/photos/?per_page=12&page=${page}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  }

  console.log(fetchLink);

});