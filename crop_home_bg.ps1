Add-Type -AssemblyName System.Drawing

$src = "C:\Users\GXI\.gemini\antigravity\scratch\rydash\public\media_1787241863494.jpg"
$dest = "C:\Users\GXI\.gemini\antigravity\scratch\rydash\public\rydash-home-bg.jpg"

$img = [System.Drawing.Image]::FromFile($src)
$W = $img.Width
$H = $img.Height
Write-Host "Source image: $W x $H"

# Panel 01 is top-left
$cropW = [int]($W * 0.605)
$cropH = [int]($H * 0.412)

$rect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($img, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Saved home bg to $dest ($cropW x $cropH)"
