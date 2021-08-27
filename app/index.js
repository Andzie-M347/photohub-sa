import 'regenerator-runtime/runtime';

import {
  createApi
} from "unsplash-js";
import './css/main.css';
import './icons/css/all.min.css';

const api = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});




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


// Get Images 

const fetchTopics = async () => {
  await fetch(`https://api.unsplash.com/topics/?client_id=qz7nM7QbPhljmodzwiDmPRkgQqiY8V8D32-syPrcchQ`)
};

fetchTopics();


// Get single Image 
const banner = document.querySelector('.showcase-banner');

api.photos.getRandom('https://api.unsplash.com/photos/photos/random', {
  collectionIds: ['abc123'],
  topicIds: ['def456'],
  featured: true,
  username: 'naoufal',
  query: 'dog',
  count: 1,
}).then(result => {
  const photo = result.response;
  banner.style.background = `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${photo.urls.regular}) 0% 0% / cover no-repeat`;
  const cite = document.createElement('div');
  cite.classList.add('showcase-banner__cite');
  cite.innerHTML = `<div class="cite-box">
         <small class="box-cite__user">
            <a href="javascript:void(0)">
                <span> Photo by ${photo.user.first_name} </span
            </a>
         </small>
    </div>`;
  banner.appendChild(cite);
});


// Get image container
const imageContainer = document.querySelector('.photohub-content__wrapper');

api.photos.list('https://api.unsplash.com/photos').then(result => {
  if (result.type === 'success') {
    const photos = result.response;
    photos.results.map((photo) => {
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
    })
    // unsplash.photos.trackDownload({
    //   downloadLocation: photo.links.download_location,
    // });
  }
});

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