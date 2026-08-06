# One Stop Service - Robust TCP Web Server for PWA & Internet Tunnels
# Uses TcpListener (no http.sys Host header restrictions)

param(
    [int]$Port = 3000
)

$root = "C:\Users\Victus\.gemini\antigravity\scratch\life-super-app"

# Kill old process using the port
$existing = netstat -ano | findstr ":$Port " | Where-Object { $_ -match "LISTENING" }
if ($existing) {
    foreach ($line in $existing) {
        $parts = $line -split '\s+'
        $pidnum = $parts[-1]
        if ($pidnum -and $pidnum -ne "4" -and $pidnum -ne "0" -and $pidnum -ne "$PID") {
            try { Stop-Process -Id ([int]$pidnum) -Force -ErrorAction SilentlyContinue } catch {}
        }
    }
}

function Get-MimeType {
    param([string]$Path)
    $fn = [System.IO.Path]::GetFileName($Path).ToLower()
    $ext = [System.IO.Path]::GetExtension($Path).ToLower()
    if ($fn -eq "manifest.json") { return "application/manifest+json; charset=utf-8" }
    if ($fn -eq "sw.js" -or $fn -eq "service-worker.js") { return "application/javascript; charset=utf-8" }
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

$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, $Port)
$listener = New-Object System.Net.Sockets.TcpListener($endpoint)

try {
    $listener.Start()
} catch {
    Write-Host "ERROR: Could not bind TcpListener on port $Port - $($_.Exception.Message)"
    exit 1
}

Write-Host "=========================================="
Write-Host "  PWA TCP Web Server Ready on Port $Port"
Write-Host "  Accepts ALL Host Headers (Local, LAN, Public Tunnel)"
Write-Host "=========================================="

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        # Set short timeouts
        $stream.ReadTimeout = 3000
        $stream.WriteTimeout = 5000

        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)
        $requestLine = $reader.ReadLine()

        if ([string]::IsNullOrEmpty($requestLine)) {
            $client.Close()
            continue
        }

        # Parse request line: e.g. "GET /path HTTP/1.1"
        $tokens = $requestLine -split ' '
        $method = $tokens[0]
        $rawUrl = if ($tokens.Length -gt 1) { $tokens[1] } else { "/" }

        # Extract path without query parameters
        $urlPath = $rawUrl.Split('?')[0]

        if ($urlPath -eq "/" -or $urlPath -eq "/index.html") {
            $urlPath = "/standalone.html"
        }

        $filePath = Join-Path $root $urlPath.TrimStart('/')

        # Consume remaining request headers
        while ($true) {
            $headerLine = $reader.ReadLine()
            if ([string]::IsNullOrEmpty($headerLine)) { break }
        }

        $writer = New-Object System.IO.BinaryWriter($stream)

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $mime  = Get-MimeType -Path $filePath

            $headerText  = "HTTP/1.1 200 OK`r`n"
            $headerText += "Content-Type: $mime`r`n"
            $headerText += "Content-Length: $($bytes.Length)`r`n"
            $headerText += "Access-Control-Allow-Origin: *`r`n"
            $headerText += "Access-Control-Allow-Methods: GET, OPTIONS`r`n"
            $headerText += "Access-Control-Allow-Headers: *`r`n"
            $headerText += "Cache-Control: no-cache`r`n"
            if ($filePath -like "*sw.js" -or $filePath -like "*service-worker.js") {
                $headerText += "Service-Worker-Allowed: /`r`n"
            }
            $headerText += "Connection: close`r`n`r`n"

            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headerText)
            $writer.Write($headerBytes)
            $writer.Write($bytes)
            $writer.Flush()
        } else {
            $notFoundText = "404 Not Found: $urlPath"
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundText)

            $headerText  = "HTTP/1.1 404 Not Found`r`n"
            $headerText += "Content-Type: text/plain; charset=utf-8`r`n"
            $headerText += "Content-Length: $($notFoundBytes.Length)`r`n"
            $headerText += "Access-Control-Allow-Origin: *`r`n"
            $headerText += "Connection: close`r`n`r`n"

            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headerText)
            $writer.Write($headerBytes)
            $writer.Write($notFoundBytes)
            $writer.Flush()
        }

        $client.Close()
    } catch {
        try { $client.Close() } catch {}
    }
}
