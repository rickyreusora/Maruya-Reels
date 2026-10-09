async function loadHomeCatalog() {
    const data = await apiFetch('home.php');
    document.getElementById('loading-spinner').style.display = 'none';
    const container = document.getElementById('catalog-container');
    
    if (!data) {
        container.innerHTML = '<div class="alert alert-danger">Failed to load catalog. Please try again later.</div>';
        return;
    }

    // Adapt to common API array wrappings
    const list = Array.isArray(data) ? data : (data.list || data.data || data.results || []);
    
    if (list.length === 0) {
        container.innerHTML = '<p class="text-muted">No dramas found.</p>';
        return;
    }

    let html = '<div class="row g-3">';
    list.forEach(item => {
        const drama = adaptDramaItem(item);
        if (!drama.id) return;
        html += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="drama-card" onclick="window.location.href='/drama/${drama.provider}/${drama.id}'">
                    <img src="${drama.poster}" alt="Poster" class="poster-img" onerror="this.src='/assets/images/placeholder.jpg'">
                    <div class="card-body">
                        <h3 class="card-title">${drama.title}</h3>
                        <small class="text-muted">${drama.episodes} Episodes</small>
                    </div>
                </div>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

async function loadDramaDetails(provider, id) {
    const data = await apiFetch('drama.php', { provider, id });
    const container = document.getElementById('drama-details');
    if (!data) {
        container.innerHTML = '<div class="alert alert-danger">Failed to load details.</div>';
        return;
    }
    
    // Some APIs wrap details in a 'data' object or array
    let rawItem = Array.isArray(data) ? data[0] : (data.data || data);
    const drama = adaptDramaItem(rawItem);
    
    // Parse episodes safely
    let epsHtml = '';
    const epsList = rawItem.episodes_list || rawItem.vod_play_list || [];
    if (epsList.length > 0) {
        epsList.forEach((ep, index) => {
            epsHtml += `<a href="/watch/${provider}/${id}?ep=${index + 1}" class="btn btn-outline-danger m-1">Ep ${index + 1}</a>`;
        });
    } else {
        // Fallback grid if count is known but list is not provided
        const count = parseInt(drama.episodes) || 10; 
        for(let i=1; i<=count; i++) {
            epsHtml += `<a href="/watch/${provider}/${id}?ep=${i}" class="btn btn-outline-danger m-1">${i}</a>`;
        }
    }

    container.innerHTML = `
        <div class="row">
            <div class="col-md-4 mb-3">
                <img src="${drama.poster}" class="img-fluid rounded" alt="${drama.title}">
            </div>
            <div class="col-md-8">
                <h2>${drama.title}</h2>
                <p class="text-muted">${drama.category}</p>
                <p>${drama.description}</p>
                <button class="btn btn-danger btn-lg mb-3" onclick="window.location.href='/watch/${provider}/${id}?ep=1'">Watch Now</button>
                <button class="btn btn-outline-light btn-lg mb-3 ms-2" onclick="toggleFavorite('${id}', '${drama.title}', '${drama.poster}')">♥ Favorite</button>
                <h4>Episodes</h4>
                <div class="d-flex flex-wrap">${epsHtml}</div>
            </div>
        </div>
    `;
}

function toggleFavorite(id, title, poster) {
    let list = JSON.parse(localStorage.getItem('maruya_favorites') || '[]');
    const exists = list.findIndex(i => i.id === id);
    if (exists >= 0) {
        list.splice(exists, 1);
        alert('Removed from My List');
    } else {
        list.push({id, title, poster, provider: 'default'});
        alert('Added to My List');
    }
    localStorage.setItem('maruya_favorites', JSON.stringify(list));
}
