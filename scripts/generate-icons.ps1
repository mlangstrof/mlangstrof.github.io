# One-off generator for the site's favicon / touch / manifest icons.
# Renders the burgundy cloud-glass mark (a wine glass whose bowl is a cloud)
# using System.Drawing (Windows GDI+). Mirrors static/favicon.svg.
# Not part of the build; kept in the repo so the icons can be regenerated.
Add-Type -AssemblyName System.Drawing

$burgundy = [System.Drawing.Color]::FromArgb(255, 128, 0, 64)   # #800040
$ink      = [System.Drawing.Color]::FromArgb(255, 250, 247, 242) # #faf7f2
$static   = Resolve-Path (Join-Path (Split-Path -Parent $PSCommandPath) '..\static')
$iconsDir = Join-Path $static 'icons'

function New-IconBitmap {
    # $favicon: render the outline mark (burgundy stroke on a transparent
    # $favicon: render the outline mark (burgundy stroke) on a subtle cream
    # rounded tile so the browser-tab icon matches the header brand mark.
    # Otherwise render the filled tile (white mark on a burgundy square) used
    # for the Apple touch icon and installable PWA icons.
    param([int]$size, [bool]$maskable, [bool]$favicon)
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.Color]::Transparent)

    if ($favicon) {
        $bg = New-Object System.Drawing.SolidBrush($ink)
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
        $bg.Dispose()
    } else {
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
    }

    # Cloud-glass mark, defined in a 32-unit design grid (mirrors favicon.svg)
    # and scaled to the icon size.
    $s = $size / 32.0
    function P([double]$x, [double]$y) {
        New-Object System.Drawing.PointF([float]($x * $s), [float]($y * $s))
    }
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $foot = if ($favicon) { 23.5 } else { 23.0 }
    # Cloud bowl (closed figure).
    $path.AddBezier((P 16 16), (P 12 16), (P 9 14), (P 9 11))
    $path.AddBezier((P 9 11), (P 9 8.4), (P 11.2 7.2), (P 13.2 7.6))
    $path.AddBezier((P 13.2 7.6), (P 14 5.2), (P 18 5.2), (P 18.8 7.6))
    $path.AddBezier((P 18.8 7.6), (P 20.8 7.2), (P 23 8.4), (P 23 11))
    $path.AddBezier((P 23 11), (P 23 14), (P 20 16), (P 16 16))
    $path.CloseFigure()
    # Stem.
    $path.StartFigure()
    $path.AddLine((P 16 16), (P 16 $foot))
    # Foot.
    $path.StartFigure()
    $path.AddLine((P 10.5 $foot), (P 21.5 $foot))

    $strokeColor = if ($favicon) { $burgundy } else { $ink }
    $strokeWidth = if ($favicon) { 2.4 } else { 1.9 }
    $pen = New-Object System.Drawing.Pen($strokeColor, [float]($strokeWidth * $s))
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    if ($favicon) {
        # Enlarge the glyph around the tile centre so it reads at 16px.
        $c = 16.0 * $s
        $g.TranslateTransform([float]$c, [float]$c)
        $g.ScaleTransform(1.18, 1.18)
        $g.TranslateTransform([float](-$c), [float](-$c))
    }
    $g.DrawPath($pen, $path)
    $g.ResetTransform()

    $pen.Dispose(); $path.Dispose(); $g.Dispose()
    return $bmp
}

function Save-Png {
    param([int]$size, [string]$name, [bool]$maskable = $false)
    $bmp = New-IconBitmap -size $size -maskable $maskable -favicon $false
    $bmp.Save((Join-Path $iconsDir $name), [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Save-Png -size 180 -name 'apple-touch-icon.png'
Save-Png -size 192 -name 'icon-192.png'
Save-Png -size 512 -name 'icon-512.png'
Save-Png -size 192 -name 'icon-192-maskable.png' -maskable $true
Save-Png -size 512 -name 'icon-512-maskable.png' -maskable $true

# favicon.ico (32px) - outline mark on transparent, matching the header brand.
$ico = New-IconBitmap -size 32 -maskable $false -favicon $true
$hicon = $ico.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hicon)
$fs = [System.IO.File]::Create((Join-Path $static 'favicon.ico'))
$icon.Save($fs)
$fs.Close()
$icon.Dispose(); $ico.Dispose()

Write-Output 'Icons generated.'
