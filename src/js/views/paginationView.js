import View from "./View.js";
import icons from 'url:../../img/icons.svg'
import { async } from 'regenerator-runtime';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')


  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')

      if (!btn) return;

      const goToPage = +btn.dataset.goto
      handler(goToPage)
    })
  }

  _generateMarkup() {
    const curPage = this._data.page
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    const nextButton = this._nextButton(curPage)
    const prevButton = this._prevButton(curPage)
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextButton
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return prevButton
    }
    // Other page 
    if (curPage < numPages) {
      return nextButton + prevButton
    }
    // page 1, and there are  no other pages
    return ''

  }

  _nextButton(curPage) {
    return `
    <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `
  }

  _prevButton(curPage) {
    return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `
  }
}

export default new PaginationView()