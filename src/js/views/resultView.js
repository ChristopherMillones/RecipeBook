import View from "./View.js";
import previewView from "./previewView.js";
import { async } from 'regenerator-runtime';

class ResultsView extends View {
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipes found for your search! Please try again!'
    _message = 'Success!'

    _generateMarkup() {
        return this._data
            .map(result => previewView.render(result, false))
            .join('')
    }

    refreshToHome() {
        const temp = document.querySelector('.header__logo')
        temp.addEventListener('click', function (e) {
            e.preventDefault()
            console.log(window);
            window.location.href = 'http://localhost:1234/'
        })
    }

}

export default new ResultsView();