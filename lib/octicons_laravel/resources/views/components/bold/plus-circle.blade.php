@props([
    'width' => 16,
    'height' => 16,
    'fill' => '',
])

<svg width="{{ $width }}" height="{{ $height }}" fill="{{ $fill }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7.25-3.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" />
</svg>
