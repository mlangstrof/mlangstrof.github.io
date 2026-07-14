# One-off generator for the site's favicon / touch / manifest icons.
# Renders a burgundy monogram ("M") using System.Drawing (Windows GDI+).
# Not part of the build; kept in the repo so the icons can be regenerated.
Add-Type -AssemblyName System.Drawing

$burgundy = [System.Drawing.Color]::FromArgb(255, 128, 0, 64)   # #800040
$ink      = [System.Drawing.Color]::FromArgb(255, 250, 247, 242) # #faf7f2
$static   = Resolve-Path (Join-Path (Split-Path -Parent $PSCommandPath) '..\static')
$iconsDir = Join-Path $static 'icons'

function New-IconBitmap {
    param([int]$size, [bool]$maskable)
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)

    $bg = New-Object System.Drawing.SolidBrush($burgundy)
    if ($maskable) {
        # Full-bleed background so the glyph stays inside the maskable safe zone.
        $g.FillRectangle($bg, 0, 0, $size, $size)
    } else {
        $r = [int]($size * 0.22)
        $d = $r * 2
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddArc(0, 0, $d, $d, 180, 90)
        $path.AddArc($size - $d, 0, $d, $d, 270, 90)
        $path.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
        $path.AddArc(0, $size - $d, $d, $d, 90, 90)
        $path.CloseFigure()
        $g.FillPath($bg, $path)
        $path.Dispose()
    }
    $bg.Dispose()

    $fontFrac = if ($maskable) { 0.5 } else { 0.62 }
    $font = New-Object System.Drawing.Font('Georgia', [float]($size * $fontFrac), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $fg = New-Object System.Drawing.SolidBrush($ink)
    $rect = New-Object System.Drawing.RectangleF(0, [float](-$size * 0.04), [float]$size, [float]$size)
    $g.DrawString('M', $font, $fg, $rect, $sf)

    $font.Dispose(); $sf.Dispose(); $fg.Dispose(); $g.Dispose()
    return $bmp
}

function Save-Png {
    param([int]$size, [string]$name, [bool]$maskable = $false)
    $bmp = New-IconBitmap -size $size -maskable $maskable
    $bmp.Save((Join-Path $iconsDir $name), [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Save-Png -size 180 -name 'apple-touch-icon.png'
Save-Png -size 192 -name 'icon-192.png'
Save-Png -size 512 -name 'icon-512.png'
Save-Png -size 192 -name 'icon-192-maskable.png' -maskable $true
Save-Png -size 512 -name 'icon-512-maskable.png' -maskable $true

# favicon.ico (32px) from a rounded bitmap.
$ico = New-IconBitmap -size 32 -maskable $false
$hicon = $ico.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hicon)
$fs = [System.IO.File]::Create((Join-Path $static 'favicon.ico'))
$icon.Save($fs)
$fs.Close()
$icon.Dispose(); $ico.Dispose()

Write-Output 'Icons generated.'
