buildFilters = function(key) {
    myFilterBuilder.html(buildHtmlFilter(key)); 
}

    buildHtmlFilter = function(filter) {
        filterArtist = filter[0].artists;
        filterPrices = filter[1].prices;
        return `
        <h5>FILTROS</h5>
        <ul>
          <li class="list-title" onclick="filteredFeaturedSearch(true)" style="cursor:pointer">Destacados</li>
          <hr>
          <li class="list-title">Artista</li>
          <ul id="build-artist">
            ${buildArtist(filterArtist)}
          </ul>
          <hr>
          <li class="list-title">Precio</li>
                <ul>
            ${buildPrices(filterPrices)}
          </ul>
        </ul>
        `
    }

    buildArtist = function(filterArtist) {
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