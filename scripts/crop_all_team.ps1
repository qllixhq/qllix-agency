Add-Type -AssemblyName System.Drawing

function Crop-Image($srcPath, $cx, $cy, $radius, $outPath) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $size = $radius * 2
    $x = [int]($cx - $radius)
    $y = [int]($cy - $radius)
    
    # Boundary check
    if ($x -lt 0) { $x = 0 }
    if ($y -lt 0) { $y = 0 }
    if ($x + $size -gt $src.Width) { $x = $src.Width - $size }
    if ($y + $size -gt $src.Height) { $y = $src.Height - $size }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $size, $size)
    $dest = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $size, $size)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()
    Write-Host "Saved $outPath"
}

$dir = "C:\Users\sq\.gemini\antigravity-ide\brain\7869c293-7884-4a79-b0d2-f0a3187689b8\.user_uploaded"
$outDir = "public\images\team"

$s1 = Join-Path $dir "media_1789994715717.png"
$s2 = Join-Path $dir "media_1789994738636.png"
$s3 = Join-Path $dir "media_1789994749473.png"

$r = 82
$c1 = 170
$c2 = 512
$c3 = 854
$r1_y = 129
$r2_y = 425

# Screenshot 1
Crop-Image $s1 $c1 $r1_y $r $outDir\mohammad-alam.png
Crop-Image $s1 $c2 $r1_y $r $outDir\golam-rabbani.png
Crop-Image $s1 $c3 $r1_y $r $outDir\ripan-hossain.png
Crop-Image $s1 $c1 $r2_y $r $outDir\rimon-ahmed.png
Crop-Image $s1 $c2 $r2_y $r $outDir\mehedi-hassan-emon.png
Crop-Image $s1 $c3 $r2_y $r $outDir\arsin-mahmud.png

# Screenshot 2
Crop-Image $s2 $c1 $r1_y $r $outDir\md-emran-hossen.png
Crop-Image $s2 $c2 $r1_y $r $outDir\mustak-sahariar-miraj.png
Crop-Image $s2 $c3 $r1_y $r $outDir\md-ashiquer-rahman.png
Crop-Image $s2 $c1 $r2_y $r $outDir\ahmmed-imtiaj-shahriar.png
Crop-Image $s2 $c2 $r2_y $r $outDir\bitto.png
Crop-Image $s2 $c3 $r2_y $r $outDir\zobayer-hossain.png

# Screenshot 3
Crop-Image $s3 $c1 $r1_y $r $outDir\md-habibur-rahman.png
Crop-Image $s3 $c2 $r1_y $r $outDir\md-arafat-rahman.png
