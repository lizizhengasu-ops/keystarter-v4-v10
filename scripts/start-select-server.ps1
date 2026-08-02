$ErrorActionPreference = "Stop"
Set-Location -LiteralPath "C:\Users\31961\Documents\microsoft web\keystarter-v4-v10\docs\product-image-library"
Start-Process -FilePath "python" -ArgumentList "-m", "http.server", "8765" -WindowStyle Hidden
