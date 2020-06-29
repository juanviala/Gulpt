
var products;
var myShoppingCart;
var myFilterBuilder;
var showBadgeAmount;
var showTotalPrice;
var searchKey;
var amountKey;
var keySearchInput;
var formSearch;
var results = [];

function lessProduct(id) {
  myShoppingCart.remove(data[id-1]);
  var totalPrice = totalPrice - data[id-1].price;
}

function moreProduct(id) {
  myShoppingCart.add(data[id-1]);
  var totalPrice = totalPrice + data[id-1].price;
}

$(document).ready(() => {

  productsContainer = $('#products-container');
  buildList(data);

  myShoppingCart = new ShoppingCart();
  myShoppingCart.populate();
  myShoppingCart.buildCart('cart-container');

  myFilterBuilder = $('#filter-list');
  buildFilters();
        
  myShoppingCart.totalPriceRender();
  myShoppingCart.setBadgeAmount();
  
  $('#delete-input').click(function(){
		deleteInput();
  });

  $('.bg-white').hide()
  $('#contacto').hide()

  $('.go-shopping').click(function(){
    $('.bg-white').show(5000)
    $('#landing').hide(5000)
    $('#contacto').hide(5000)
    $('nav').attr("style", "");
  })

  $('#go-home').click(function(){
    $('#landing').show(5000)
    $('.bg-white').hide(5000)
    $('#contacto').hide(5000)
    $('nav').attr("style", "z-index:1100");
  })

  $('#go-contact').click(function(){
    $('#contacto').show(5000)
    $('#landing').hide(5000)
    $('.bg-white').hide(5000)
    $('nav').attr("style", "z-index:1100");
  })

  searchKey = $('#search-key');
  amountKey = $('#search-result-length');

  keySearchInput = $('#search-bar-input');
  keySearchInput.on('input', function (event) {
    if (event.target.value.length > 2) {
      getSearchBoxValue();
    } else if (event.target.value.length == 0 && event.target.value.length < 3 ) {
        $(searchKey.empty());
        $(amountKey.empty());
        buildList(data);
    }
  })

  formSearch = $('#form-search');
	formSearch.submit(function(e) {
    e.preventDefault();
	  getSearchBoxValue();
  });
});