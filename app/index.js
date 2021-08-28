import 'regenerator-runtime/runtime';

import {
  createApi
} from "unsplash-js";

import './css/main.css';
import './icons/css/all.min.css';

const api = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});


const apiBase = 'https://api.unsplash.com';

const imageContainer = document.querySelector('.photohub-content__wrapper');
const loader = document.querySelector('.loading');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


let count = 5;
const apiKey = process.env.UNSPLASH_ACCESS_KEY;
let apiUrl = `${apiBase}/photos/random/?client_id=${apiKey}&count=${count};`

//new count api
function updatedCount(newCount) {
  newCount = 10;
  apiUrl = `${apiBase}/photos/random/?client_id=${apiKey}&count=${newCount};`
}


function imageLoaded() {

  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    updatedCount()
  }
}


function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }

}


const getPhotos = async () => {
  const response = await fetch(`${apiUrl}`);
  let photosArray = await response.json();

  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.map((photo) => {
    const figure = document.createElement('figure');
    const item = document.createElement('a');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    setAttributes(figure, {
      class: 'photohub-content__image'
    });

    setAttributes(item, {
      title: photo.alt_description
    });


    setAttributes(image, {
      alt: photo.alt_description,
      src: photo.urls.regular,
      class: 'img-responsive'

    });

    image.addEventListener('load', imageLoaded)

    figure.appendChild(item);
    item.appendChild(image);
    figure.appendChild(figcaption)
    imageContainer.appendChild(figure);

  });

}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos()
  }
})


getPhotos();



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

// const output = document.querySelector('#output-card');
// const search = document.querySelector('#search');

// search.addEventListener('input', () => searchTopics(search.value));

// const searchTopics = async searchText => {
//   const res = await fetch(`https://api.unsplash.com/topics/?per_page=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
//   const topics = await res.json();

//   let matches = topics.filter(topic => {
//     const regex = new RegExp(`^${searchText}`, 'gi');
//     return topic.title.match(regex);
//   });

//   if (searchText.length === 0) {
//     matches = []
//     output.innerHTML = '';
//     output.classList.remove('output-card__inner');

//   }

//   outputHtml(matches);
// };


// const outputHtml = (matches) => {
//   if (matches.length > 0) {

//     output.classList.add('output-card__inner');
//     const htmlOutput = matches.map((match) => {
//       return `<div class="search-results" > 
//           <a href="javascript:void(0)">  ${match.title} </a> 
//         </div >`
//     }).join('');


//     output.innerHTML = htmlOutput;
//   } 
// }




// Tags - topics
const tags = document.querySelector('.topics');

const getTopic = async () => {
  await fetch(`${apiBase}/topics/?per_page=12&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    .then(response => response.json())
    .then(topics => {
      const ul = document.createElement('ul');

      topics.forEach(topic => {
        const item = document.createElement('li');
        const link = document.createElement('a');

        setAttributes(item, {
          class: 'topic__list',
        });

        setAttributes(link, {
          class: 'topic__list--link',
          href: 'javascript:void(0)'
        });

        link.innerText = `${topic.title}`;

        ul.appendChild(item);
        item.appendChild(link);
      })


      tags.appendChild(ul);
    })

    .catch(error => console.log(error));

}

getTopic();