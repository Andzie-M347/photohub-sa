import {
    createApi
} from "unsplash-js";
import './css/main.css';
import './icons/css/all.min.css';

const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
});

// Get image container
const imageContainer = document.querySelector('.photohub-content__wrapper');
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
    console.log(photo);
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
})





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


{
    /* <small> ${photo.sponsorship.sponser.tagline == 'undefined' ? photo.sponsorship.sponser.tagline : '' } </small> */ }