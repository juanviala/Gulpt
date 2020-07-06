var totalPrice = 0;

function ShoppingCart() {
	var cart = [];

	this.populate = function() {
    cart = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.forEach(product => {
      totalPrice = totalPrice + product.price;
    });
	}
	
	this.add = function(product) {
		cart.push(product);
		localStorage.setItem('cart', JSON.stringify(cart));
		totalPrice = totalPrice + product.price;
		this.buildCart('cart-container');
		this.setBadgeAmount();        
	}

	this.remove = function(id) {
		var removeIndex = cart.findIndex(x => x.id === id.id);
		cart.splice(removeIndex, 1)
		localStorage.setItem('cart', JSON.stringify(cart));
		totalPrice = totalPrice - id.price;
		this.buildCart('cart-container');
		this.setBadgeAmount();
	}

  this.get = function() {
    return cart;
  }

  this.buildList = function() {
    var html = '';
    cart.forEach(product => {
        html = html + `<li>${ product.name } / <b>${ product.price }</b></li>`;
    });

    return html;
  }

  this.buildListMinusProduct = function() {
    var html = '';
    cart.forEach(product => {
        html = html + `<li><a style="color:black; cursor:pointer;" onclick="lessProduct('${product.id}')" class="tooltips" data-toggle="tooltip" data-placement="right" title="Sacar del Carrito"><i class="far fa-minus-square"></i></a></li>`;
    });

    return html;
  }

  this.setBadgeAmount = function() {
    var badgeAmount = myShoppingCart.get().length
    if(badgeAmount >= 0){
        this.setBadgeAmountRender(badgeAmount);
    }
  }
  
  this.setBadgeAmountRender = function(key) {
    $('#badge-counter').html(`<button class="btn btn-sm p-0" data-toggle="modal" data-target="#cartModal"><i class="fas fa-cart-plus"></i> ${key}</button>`);
  }

  this.totalPriceRender = function() {
    if(totalPrice != '') {
        $('#total-price').html(totalPrice);
    }
  }

  this.buildCart = function(containerId) {
    var container = document.getElementById(containerId);
    container.innerHTML = "";
    var html = `
        <div class="container">
			    <div class="row">
				    <div class="col-6 mx-auto">
              <ul>
                ${ this.buildList() }
              </ul>
            </div>
            <div class="col-2 mx-auto" style="border-right: 1px solid #c5c5c5">
              <ul>
                ${ this.buildListMinusProduct() }
              </ul>
				    </div>
				    <div class="col-4 my-auto">
					  	<h6>TOTAL <span id="total-price" class="font-weight-bold">${totalPrice}</span></h6>
					    <div><button id="chance-discount" type="button" class="btn btn-sm btn-outline-success my-2 py-1">CHECKOUT</button></div>
					    <span id="discount-true"></span>     
				    </div>
			    </div>
        </div>
        `
    
    container.innerHTML = html;
    }
}