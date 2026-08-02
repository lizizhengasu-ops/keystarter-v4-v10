param(
  [int]$Port = 8765
)
$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$libDir = Join-Path $repoRoot "docs\product-image-library"
if (-not (Test-Path (Join-Path $libDir "select.html"))) {
  throw "select.html not found under $libDir"
}
$argLine = '-m http.server ' + $Port + ' --directory "' + $libDir + '"'
Start-Process -FilePath "python" -ArgumentList $argLine -WindowStyle Hidden
Write-Host "Selection page: http://localhost:$Port/select.html"
