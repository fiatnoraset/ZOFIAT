Add-Type -AssemblyName System.Drawing
$imgDir = "C:\Users\Victus\.gemini\antigravity\scratch\life-super-app"
$srcPath = Join-Path $imgDir "logo.jpg"
$src = [System.Drawing.Image]::FromFile($srcPath)

function Resize-Image($source, $width, $height, $outputPath) {
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($source, 0, 0, $width, $height)
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Resize-Image $src 192 192 (Join-Path $imgDir "icon-192.png")
Resize-Image $src 512 512 (Join-Path $imgDir "icon-512.png")
$src.Dispose()
Write-Host "Icons icon-192.png and icon-512.png generated successfully!"
