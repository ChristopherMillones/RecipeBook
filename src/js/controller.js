import * as model from './model.js'
import recipeView from './views/recipeViews.js'
import searchView from './views/searchView.js'
import resultView from './views/resultView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODAL_CLOSE_SEC } from './config.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner()

    resultView.update(model.getSearchResultsPage())

    await model.loadRecipe(id)

    recipeView.render(model.state.recipe)

    bookmarksView.update(model.state.bookmarks)
  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();
    await model.loadSearchResults(query)

    resultView.render(model.getSearchResultsPage())

    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage))

  paginationView.render(model.state.search)
}


const controlServerings = function (newServings) {
  model.updateServings(newServings);


  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {

  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }


  recipeView.update(model.state.recipe)


  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}


const controlAddRecipe = async function (newRecipeData) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipeData)
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`)


    setTimeout(function () {

    }, MODAL_CLOSE_SEC * 1000)
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message)
  }
}

controlSearchResults()
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServerings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  resultView.refreshToHome()
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()