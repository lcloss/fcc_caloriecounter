# Start a PHP server
# Usage: server.ps1 [port]
# Example: server.ps1 8000

$port = 8011
if ($args.Length -gt 0) {
    $port = $args[0]
}

$cmd = "php -S localhost:$port"
Write-Host $cmd
Invoke-Expression $cmd