<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maruya Reels - Short Dramas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <nav class="navbar navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand text-danger fw-bold" href="/">MARUYA REELS</a>
            <div class="d-flex">
                <a href="/search" class="btn btn-outline-light me-2">Search</a>
                <a href="/my-list" class="btn btn-danger">My List</a>
            </div>
        </div>
    </nav>
    <div class="container mt-4" id="app-content">
        <div class="text-center text-light" id="loading-spinner">
            <div class="spinner-border text-danger" role="status"></div>
            <p class="mt-2">Loading Dramas...</p>
        </div>
        <div id="catalog-container"></div>
    </div>
    <script src="/assets/js/catalog.js"></script>
    <script src="/assets/js/app.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            loadHomeCatalog();
        });
    </script>
</body>
</html>
