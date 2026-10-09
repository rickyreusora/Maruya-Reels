<?php
require_once '../includes/api-client.php';
// Allows basic caching for the home catalog to reduce upstream load
header('Cache-Control: public, max-age=' . CACHE_TIME);
serveProxyResponse('/home', $_GET);
