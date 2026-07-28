# Generates the static building blocks for the social share (Open Graph) card:
#   assets/images/og/og-canvas.png - solid cream 1200x630 background
#   assets/images/og/og-frame.png  - cream 1200x630 with a transparent circular
#                                     window; overlaid on the square headshot to
#                                     crop it to a circle (Hugo 0.137 has no
#                                     images.Mask filter).
# The headshot and text are composited on top at build time by Hugo
# (layouts/partials/og-card.html), so this script only draws solid shapes and
# does not need to decode the WebP headshot. Not part of the build; kept so the
# assets can be regenerated.
Add-Type -AssemblyName System.Drawing

$cream = [System.Drawing.Color]::FromArgb(255, 250, 247, 242) # #faf7f2
$root  = Resolve-Path (Join-Path (Split-Path -Parent $PSCommandPath) '..')
$ogDir = Join-Path $root 'assets\images\og'
New-Item -ItemType Directory -Force -Path $ogDir | Out-Null

# Headshot placement / size (must match layouts/partials/og-card.html).
$photoX = 95
$photoY = 95
$photoD = 440

# Cream canvas (1200x630, the 1.91:1 Open Graph slot).
$canvas = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.Clear($cream)
$g.Dispose()
$canvas.Save((Join-Path $ogDir 'og-canvas.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose()

# Cream frame with a transparent circular window punched where the headshot
# sits. Overlaid on top of the square headshot, its cream covers the corners so
# only the circular area of the photo shows through.
$frame = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$fg = [System.Drawing.Graphics]::FromImage($frame)
$fg.Clear($cream)
$fg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$fg.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
$clear = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(0, 250, 247, 242))
$fg.FillEllipse($clear, $photoX, $photoY, $photoD, $photoD)
$clear.Dispose(); $fg.Dispose()
$frame.Save((Join-Path $ogDir 'og-frame.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$frame.Dispose()

Write-Output 'OG card assets generated.'
