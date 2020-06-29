filtersJson = filtersJson;
filterArtist = filtersJson[0].artists;
filterPrices = filtersJson[1].prices;
    
buildFilters = function(key) {
    myFilterBuilder.html(buildHtmlFilter()); 
}

    buildHtmlFilter = function(filter) {
        return `
        <h5>FILTROS</h5>
        <ul>
          <li class="list-title" onclick="filteredFeaturedSearch(true)" style="cursor:pointer">Destacados</li>
          <hr>
          <li class="list-title">Artista</li>
          <ul id="build-artist">
            ${buildArtist()}
          </ul>
          <hr>
          <li class="list-title">Precio</li>
                <ul>
            ${buildPrices()}
          </ul>
        </ul>
        `
    }

    buildArtist = function() {
        var html = '';
        filterArtist.forEach(filter => {
            html = html + `<li onclick="filteredArtistSearch('${ filter['value'] }')" style="cursor:pointer">${ filter['name'] }</li>`;
        });

        return html;
    }

    this.buildPrices = function() {
        var html = '';
        filterPrices.forEach(filter => {
            html = html + `<li onclick="filteredPriceSearch(${ filter['value'] })" style="cursor:pointer">< ${ filter['price'] }</li>`;
        });

        return html;
    }