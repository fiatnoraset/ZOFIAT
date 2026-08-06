# One Stop Service - PWA Web Server (Multi-Device Support)
# Supports: localhost + all network interfaces (Wi-Fi/LAN)

param(
    [int]$Port = 3000
)

$root = "C:\Users\Victus\.gemini\antigravity\scratch\life-super-app"

# Kill any existing listener on the same port first
$existing = netstat -ano | findstr ":$Port " | Where-Object { $_ -match "LISTENING" }
if ($existing) {
    $pid_match = ($existing -split '\s+')[-1]
    if ($pid_match -and $pid_match -ne "4" -and $pid_match -ne "0") {
        try { Stop-Process -Id ([int]$pid_match) -Force -ErrorAction SilentlyContinue } catch {}
    }
}

$listener = New-Object System.Net.HttpListener

# Try to bind all interfaces first (requires admin), fall back to localhost only
$bindAll = $false
try {
    $testListener = New-Object System.Net.HttpListener
    $testListener.Prefixes.Add("http://+:$Port/")
    $testListener.Start()
    $testListener.Stop()
    $bindAll = $true
} catch {
    $bindAll = $false
}

if ($bindAll) {
    $listener.Prefixes.Add("http://+:$Port/")
    Write-Host "Binding to ALL interfaces (admin mode)"
} else {
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Prefixes.Add("http://127.0.0.1:$Port/")
    Write-Host "Binding to localhost only (non-admin mode)"
}

try {
    $listener.Start()
} catch {
    Write-Host "ERROR: Could not start server on port $Port - $($_.Exception.Message)"
    Write-Host "Try running as Administrator or use a different port."
    exit 1
}

# Get local network IP
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback" -and $_.IPAddress -notmatch "^169" } | Select-Object -First 1).IPAddress

Write-Host ""
Write-Host "=========================================="
Write-Host "  One Stop Service PWA - Server Ready"
Write-Host "=========================================="
Write-Host "  Local:   http://localhost:$Port"
Write-Host "  LAN/WiFi: http://$($localIP):$Port"
Write-Host "  (Share LAN link with mobile on same WiFi)"
Write-Host "=========================================="
Write-Host "  Press Ctrl+C to stop"
Write-Host ""

function Get-MimeType {
    param([string]$Path)
    $fn = [System.IO.Path]::GetFileName($Path).ToLower()
    $ext = [System.IO.Path]::GetExtension($Path).ToLower()
    if ($fn -eq "manifest.json") { return "application/manifest+json; charset=utf-8" }
    if ($fn -eq "sw.js") { return "application/javascript; charset=utf-8" }
    switch ($ext) {
        ".html" { return "text/html; charset=utf-8" }
        ".css"  { return "text/css; charset=utf-8" }
        ".js"   { return "application/javascript; charset=utf-8" }
        ".json" { return "application/json; charset=utf-8" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".svg"  { return "image/svg+xml" }
        ".ico"  { return "image/x-icon" }
        ".webp" { return "image/webp" }
        default { return "application/octet-stream" }
    }
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request  = $context.Request
        $response = $context.Response

        # CORS headers - allow all origins
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "*")
        $response.AddHeader("Cache-Control", "no-cache")

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "/index.html") {
            $urlPath = "/standalone.html"
        }

        $filePath = Join-Path $root $urlPath.TrimStart('/')

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $mime  = Get-MimeType -Path $filePath
            $response.ContentType = $mime
            if ($filePath -like "*sw.js" -or $filePath -like "*service-worker.js") {
                $response.AddHeader("Service-Worker-Allowed", "/")
            }
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found: $urlPath")
            $response.StatusCode = 404
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }

        $response.Close()
    } catch [System.Net.HttpListenerException] {
        # Listener stopped - exit cleanly
        break
    } catch {
        try { $context.Response.Close() } catch {}
    }
}
