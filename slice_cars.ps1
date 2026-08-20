Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\GXI\.gemini\antigravity\scratch\rydash\public\rydash-cars-master.jpg"
$outDir = "C:\Users\GXI\.gemini\antigravity\scratch\rydash\public\cars"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$img = [System.Drawing.Image]::FromFile($sourcePath)
$W = $img.Width
$H = $img.Height
Write-Host "Source Image: $W x $H"

$cardsX = @(
    @{ col = 0; x = [int]($W * 0.014); w = [int]($W * 0.178) },
    @{ col = 1; x = [int]($W * 0.210); w = [int]($W * 0.178) },
    @{ col = 2; x = [int]($W * 0.406); w = [int]($W * 0.178) },
    @{ col = 3; x = [int]($W * 0.604); w = [int]($W * 0.178) },
    @{ col = 4; x = [int]($W * 0.802); w = [int]($W * 0.178) }
)

$rowsY = @(
    @{ row = 0; y = [int]($H * 0.228); h = [int]($H * 0.150) },
    @{ row = 1; y = [int]($H * 0.626); h = [int]($H * 0.150) }
)

$idx = 0
for ($r = 0; $r -lt 2; $r++) {
    for ($c = 0; $c -lt 5; $c++) {
        $x = $cardsX[$c].x
        $w = $cardsX[$c].w
        $y = $rowsY[$r].y
        $h = $rowsY[$r].h

        $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

        $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
        $g.DrawImage($img, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()

        $outPath = Join-Path $outDir ("car-" + $idx + ".jpg")
        $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $bmp.Dispose()

        Write-Host "Saved car-$idx to $outPath ($w x $h)"
        $idx++
    }
}

$img.Dispose()
Write-Host "All 10 cars cropped with perfection!"
