async function initPlayer(provider, id, ep) {
    const video = document.getElementById('reels-player');
    const playBtn = document.getElementById('play-pause-btn');
    const playIcon = document.querySelector('.play-icon');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');

    // Fetch authorized playback URL
    const data = await apiFetch('video.php', { provider, id, ep });
    let videoUrl = '';
    
    if (data) {
        videoUrl = data.url || data.play_url || data.vod_play_url || '';
    }

    if (!videoUrl) {
        alert("Playback URL not found or unauthorized.");
        return;
    }

    // Save History
    let history = JSON.parse(localStorage.getItem('maruya_history') || '[]');
    history = history.filter(i => i.id !== id);
    history.unshift({id, provider, ep, date: Date.now()});
    localStorage.setItem('maruya_history', JSON.stringify(history.slice(0, 20)));

    // HLS Support
    if (videoUrl.includes('.m3u8')) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(e => console.log('Autoplay blocked')));
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
            video.addEventListener('loadedmetadata', () => video.play().catch(e => {}));
        }
    } else {
        video.src = videoUrl;
        video.play().catch(e => console.log('Autoplay blocked'));
    }

    // Controls
    playBtn.addEventListener('click', () => {
        if (video.paused) { video.play(); playIcon.style.display = 'none'; } 
        else { video.pause(); playIcon.style.display = 'block'; }
    });

    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
        timeDisplay.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration || 0)}`;
    });

    document.getElementById('next-ep').addEventListener('click', () => {
        window.location.href = `/watch/${provider}/${id}?ep=${parseInt(ep) + 1}`;
    });
    
    document.getElementById('prev-ep').addEventListener('click', () => {
        if (ep > 1) window.location.href = `/watch/${provider}/${id}?ep=${parseInt(ep) - 1}`;
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}
