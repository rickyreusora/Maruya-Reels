<?php
$provider = htmlspecialchars($_GET['provider'] ?? '');
$id = htmlspecialchars($_GET['id'] ?? '');
$ep = htmlspecialchars($_GET['ep'] ?? '1');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Watch Episode - Maruya Reels</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</head>
<body class="player-body">
    <div class="player-container">
        <video id="reels-player" playsinline></video>
        
        <div class="player-overlay" id="player-overlay">
            <div class="top-controls">
                <a href="/drama/<?= $provider ?>/<?= $id ?>" class="back-btn">← Back</a>
                <span class="ep-title">Episode <?= $ep ?></span>
            </div>
            
            <div class="center-controls" id="play-pause-btn">
                <div class="play-icon">▶</div>
            </div>

            <div class="bottom-controls">
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <span id="time-display">00:00 / 00:00</span>
                    <div>
                        <button id="prev-ep" class="btn btn-sm btn-dark">Prev</button>
                        <button id="next-ep" class="btn btn-sm btn-danger">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/assets/js/player.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            initPlayer('<?= $provider ?>', '<?= $id ?>', '<?= $ep ?>');
        });
    </script>
</body>
</html>
