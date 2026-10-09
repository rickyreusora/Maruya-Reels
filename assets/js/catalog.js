// Adaptive Mapper: Inspects JSON objects safely without assuming strict field names
function adaptDramaItem(item) {
    if (!item) return null;
    return {
        id: item.id || item.drama_id || item.vod_id || null,
        provider: item.provider || item.source || 'default',
        title: item.title || item.name || item.vod_name || 'Untitled Drama',
        poster: item.poster || item.cover || item.vod_pic || '/assets/images/placeholder.jpg',
        description: item.description || item.synopsis || item.vod_content || 'No description available.',
        episodes: item.episodes || item.total_episodes || item.vod_total || '?',
        category: item.category || item.genre || item.vod_class || 'Short Drama'
    };
}

async function apiFetch(endpoint, params = {}) {
    const url = new URL(`/api/${endpoint}`, window.location.origin);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}
