import '/src/modules/imc.js';
import '/src/modules/tablaDinamica.js';
import '/src/modules/imageGallery.js';
import '/src/modules/interactiveList.js';

const pageChanger = document.querySelectorAll('.page-changer')
const pagesDiv = document.querySelector('.selected-page')

pageChanger.forEach(button => {
    button.addEventListener("click", (e) => {
        pagesDiv.innerHTML = ''
        if (e.target.classList.contains('page-imc')) {
            pagesDiv.innerHTML = "<imc-calculator></imc-calculator>"
            console.log('clickkk')
        } else if (e.target.classList.contains('page-gallery')) {
            pagesDiv.innerHTML = "<image-gallery></image-gallery>"
        } else if (e.target.classList.contains('page-table')) {
            pagesDiv.innerHTML = "<dynamic-table></dynamic-table>"
        }
        else if (e.target.classList.contains('page-list')) {
            pagesDiv.innerHTML = "<api-data-list></api-data-list>"
        }
    });
});
