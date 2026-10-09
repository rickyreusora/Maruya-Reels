<?php
$provider = htmlspecialchars($_GET['provider'] ?? '');
$id = htmlspecialchars($_GET['id'] ?? '');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drama Details - Maruya Reels</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <nav class="navbar navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand text-danger fw-bold" href="/">MARUYA REELS</a>
            <a href="javascript:history.back()" class="btn btn-outline-light">Back</a>
        </div>
    </nav>
    <div class="container mt-4 text-light" id="drama-details">
        <div class="text-center"><div class="spinner-border text-danger"></div></div>
    </div>
    <script src="/assets/js/catalog.js"></script>
    <script src="/assets/js/app.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            loadDramaDetails('<?= $provider ?>', '<?= $id ?>');
        });
    </script>
</body>
</html>
