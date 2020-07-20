
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
var data;

function lessProduct(id) {
  myShoppingCart.remove(data[id-1]);
}

function addTags(tags) {
  $('#tags-product').empty();
  tags.forEach(tag => {
    $('#tags-product').append(`<span class="badge badge-light m-1"><a href="#" onclick="straightSearch('${tag}')">${tag}</a></span>`);
  })
}

function addImg(images) {
  $('#img-product').empty();
  images.forEach(img => {
    $('#img-product').append(`
      <div class="carousel-item">
        <img src="./images/products/${img}" class="d-block w-100">
      </div>
    `);
  })
  $( ".carousel-item:first-child" ).addClass("active");
}


function viewDetails(id) {
  $('#title-product').html(data[id-1].name);
  if((data[id-1].image).length > 1) {
    $('.carousel-control-prev, .carousel-control-next').show()
  } else {
    $('.carousel-control-prev, .carousel-control-next').hide()
  }
  $('#img-product').html(addImg(data[id-1].image));
  $('#artist-product').html(`Artista: <a href="#" onclick="straightSearch('${data[id-1].artist}')">${data[id-1].artist}</a>`);
  $('#price-product').html(`Precio: ${data[id-1].price}`);
  $('#tags-product').html(addTags(data[id-1].tags));  
  $('#cart-product').html(`<a style="color:black; cursor:pointer" onclick="moreProduct('${data[id-1].id}')"><i class="fas fa-plus-circle tooltips" data-toggle="tooltip" data-placement="right" title="Agregar al Carrito"></i> Agregar al carrito</a>`)
}

function moreProduct(id) {
  myShoppingCart.add(data[id-1]);
}

function payPal() {
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: totalPrice  //Precio del producto
          }
        }]
      });
    },
    
  }).render('#paypal-button-container');
}


$(document).ready(() => {

  payPal()

  myFilterBuilder = $('#filter-list');
  $.ajax({
    method: 'GET',
    url: "./data/filters.json",
    dataType: 'json',
    }).done( function(filters){
      buildFilters(filters);
      }).fail( function(){
        console.log('Hubo un problema, no podrá utilizar filtros');
        })

  productsContainer = $('#products-container');
  $.ajax({
    method: 'GET',
    url: "./data/data.json",
    dataType: 'json',
    }).done( function(d) {
        buildList(d);
        data = d;
      }).fail( function(){
        alert('Hubo un problema, por favor vuelva a intentarlo');
        })

  myShoppingCart = new ShoppingCart();
  myShoppingCart.populate();
  myShoppingCart.buildCart('cart-container');
      
  myShoppingCart.totalPriceRender();
  myShoppingCart.setBadgeAmount();
  
  $('#delete-input').click(function(){
		deleteInput();
  });

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

  $('.bg-white, #lipsum, #badge-counter').hide();
  $('#go-home').show();

  $( "#badge-counter" ).mouseenter(function() {
    $( this ).effect( "bounce", { distance: 5, times: 3 }, 1000 );
  });

  var jqueryContainer = $('#landing'); // PARA EVITAR CONFLICTOS DE SELECTORES CON UI JQUERY
  $('.go-shopping').click(function() {    
    $(jqueryContainer).hide("fold", 'fast', function() {
        $('nav').attr("style", ""); // PARA QUE EL MODAL DEL CARRITO NO SE ESCONDA TRAS EL NAV 
        $('.bg-white').show("puff", 500);
        $('#badge-counter').show();
        jqueryContainer = $('.bg-white');
      })
  })

  $('#go-home').click(function() {
    $('nav').attr("style", "z-index:1100"); // PARA QUE EL NAV NO SE TAPE
    $(jqueryContainer).hide("fold", 'fast', function() {
      $('#badge-counter').hide();
      $('#landing').show("puff", 500);
      jqueryContainer = $('#landing');
    })
  })

  $('#go-lipsum').click(function() {
    $('nav').attr("style", "z-index:1100"); // PARA QUE EL NAV NO SE TAPE
    $(jqueryContainer).hide("fold", 'fast', function() {
      $('#badge-counter').hide();
      $('#lipsum').show("puff", 500);
      jqueryContainer = $('#lipsum');
    })
  })
  
  $(".tooltips").tooltip({ boundary: "window" }) 
});