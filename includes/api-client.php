<?php
require_once 'config.php';

function fetchUpstreamApi($endpoint, $params = []) {
    $url = API_BASE_URL . $endpoint;
    if (!empty($params)) {
        $url .= '?' . http_build_query($params);
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, API_TIMEOUT);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'MaruyaReels-Proxy/1.0');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return ['code' => 502, 'data' => json_encode(['error' => 'Bad Gateway: Upstream connection failed.'])];
    }
    return ['code' => $httpCode, 'data' => $response];
}

function serveProxyResponse($endpoint, $params) {
    header('Content-Type: application/json');
    header('X-Content-Type-Options: nosniff');
    $result = fetchUpstreamApi($endpoint, $params);
    http_response_code($result['code'] >= 200 && $result['code'] < 400 ? $result['code'] : 500);
    echo $result['data'] ?: json_encode(['error' => 'Empty response from upstream']);
    exit;
}
