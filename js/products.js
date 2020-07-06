function search(key) {
    results = [];
    data.forEach((product) => {
        if(product.name.toLowerCase().includes(key.toLowerCase()) || product.artist.toLowerCase().includes(key.toLowerCase()) || product.tags.includes(key.toLowerCase())){
            results.push(product);
        }
    });
    return results;
}

function deleteInput() {
    $(keySearchInput.val(''))
    buildList(data);
    setKeySearchRender('');
  }
  
  function getSearchBoxValue() {
    var searchResult = search(keySearchInput.val());
  
    if (keySearchInput.val().trim() !== '') {
        setKeySearchRender(searchResult.length);
        buildList(searchResult);
    }
  }
  
  function setKeySearchRender(lengthResult) {
    if(lengthResult == '') {
        $(amountKey.html(''));
      } else {
        $(amountKey.html(`${lengthResult} resultados de búsqueda`));
      }
  }

  straightSearch = function (key) {
    var searchResult = search(key);
    setKeySearchRender(searchResult.length);
    buildList(searchResult);
  }

filteredArtistSearch = function(key) {
    filterArtist = [];    
    if(keySearchInput.val() != '') {
        filterArtist = results.filter(filtered => filtered.artistvalue === key);
    } else {
        filterArtist = data.filter(filtered => filtered.artistvalue === key);
    }
    buildList(filterArtist);
    setKeySearchRender(filterArtist.length);
}

filteredPriceSearch = function(key) {
    filterPrice = [];
    if(keySearchInput.val() != '') {
        filterPrice = results.filter(filtered => filtered.price < key);
    } else {
        filterPrice = data.filter(filtered => filtered.price < key);
    }
    buildList(filterPrice);
    setKeySearchRender(filterPrice.length);
}

filteredFeaturedSearch = function(key) {
    filterFeatured = [];
    if(keySearchInput.val() != '') {
        filterFeatured = results.filter(filtered => filtered.featured == key);
    } else {
        filterFeatured = data.filter(filtered => filtered.featured == key);
    }
    buildList(filterFeatured);
    setKeySearchRender(filterFeatured.length);
}

function buildHtmlProduct(product) {
        productsContainer.append(`
        <article class="col-xs-12 col-md-6 col-lg-3 themed-grid-col search-item">
            <div class="row">            
                <div class="col-xs-12">
                    <img src="./images/products/${product.image[0]}">
                    <hr>
                </div>
                <div class="col-12 mb-2">
                    <a style="color:black; cursor:pointer" onclick="viewDetails('${product.id}')" data-toggle="modal" data-target="#productModal"><i class="far fa-eye tooltips" data-toggle="tooltip" data-placement="right" title="Ver en Detalle"></i></a> | 
                    <a style="color:black; cursor:pointer" onclick="moreProduct('${product.id}')"><i class="fas fa-plus-circle tooltips" data-toggle="tooltip" data-placement="right" title="Agregar al Carrito"></i></a>
                </div>
                <div class="col-12">
                    <h1 id="product-title">${product.name}</h1>
                    <h2>$ ${product.price}</h2>
                </div>
            </div>
        </article>`
    );
}

function buildList(key) {
    if(!sessionStorage["featuredview"]) {
        productsContainer.empty();
        key.forEach(product => {
            if(product.featured) {
                productsContainer.html(buildHtmlProduct(product)); 
                sessionStorage["featuredview"] = true
            }
        });            
    } else {
        productsContainer.empty();
        key.forEach(product => {
            productsContainer.html(buildHtmlProduct(product));
        })
    }
}