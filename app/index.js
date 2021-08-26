import {
    createApi
} from "unsplash-js";
import './css/main.css';

const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
});

// Get image container

const imageContainer = document.querySelector('.photohub-content__wrapper');
const url = 'https://api.unsplash.com/photos'


api.photos.list(url).then(result => {
    if (result.type === 'success') {
        const photos = result.response;
        console.log(photos);

        photos.results.map((photo) => {
            const figure = document.createElement('figure');
            figure.classList.add('photohub-content__image');
            figure.innerHTML = `<img src="${photo.urls.raw}" class="img-responsive"/>`;
            imageContainer.appendChild(figure);
            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = `<div class="cite">
                    <img src=${photo.user.profile_image.small} class="cite__rounded" alt=${photo.alt_description}>
                     <a href="javascript:void(0)" class="cite__title" title=${photo.alt_description}> ${photo.user.first_name}</a>
                </div>`;
            figure.appendChild(figcaption);
        })
        // unsplash.photos.trackDownload({
        //   downloadLocation: photo.links.download_location,
        // });
    }
});


{/* <small> ${photo.sponsorship.sponser.tagline == 'undefined' ? photo.sponsorship.sponser.tagline : '' } </small> */}