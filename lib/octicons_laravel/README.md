![octicons cover light](https://user-images.githubusercontent.com/54012/138925195-5779c51d-ff8c-4264-a914-e64f4843893d.png#gh-light-mode-only)
![octicons cover dark](https://user-images.githubusercontent.com/54012/138925203-80e1afa1-ba54-4731-9525-3c41186663f9.png#gh-dark-mode-only)
<br>
<h1 align="center">
Laravel Primer Octicons
</h1>
<p align="center">
    A Laravel package to integrate GitHub's Octicons into your Laravel project effortlessly. This package allows you to use Octicons directly in your Blade templates with ease.
</p>


## About

Octicons are a scalable set of icons handcrafted by GitHub. They are designed to be highly legible, even at small sizes, and are perfect for adding a consistent visual language to your web projects.

GitHub Repository: [primer/octicons](https://github.com/primer/octicons)  
Official Site: [Octicons](https://primer.style/octicons)

## Installation

You can install the package via Composer:

```bash
composer require devzkhalil/laravel-primer-octicons
```

## Usage

After installing, you can use the Octicons in your Blade templates like this:

```blade
<x-icon::thin.arrow-up-left width="16" height="16" fill="white" />
<x-icon::bold.arrow-up-left width="16" height="16" fill="white" />

<x-icon::thin.download width="24" height="24" fill="white" />
<x-icon::bold.download width="24" height="24" fill="white" />
```
## Icon Sizes and Parameters

In this package:

- GitHub `16px` icons are referred to as `bold`.
- GitHub `24px` icons are referred to as `thin`.

### Component Parameters

**For Bold Icons (16px):**
- `width` is optional; the default size is `16px`.
- `height` is optional; the default size is `16px`.
- `fill` is optional; the default color is `black`.

**For Thin Icons (24px):**
- `width` is optional; the default size is `24px`.
- `height` is optional; the default size is `24px`.
- `fill` is optional; the default color is `black`.

### Finding Icon Names

To find the name of an icon:
1. Visit the official Octicons site: [Octicons](https://primer.style/foundations/icons).
2. Locate and copy the name of your desired icon.
3. Use the icon in your Blade templates with the appropriate size:

For `16px` icons (bold):
   ```blade
   <x-icon::bold.your-icon-name />
   ```
For `24px` icons (thin):
   ```blade
   <x-icon::thin.your-icon-name />
   ```

## Publish Components

Publish the components file with the following command:

```bash
php artisan vendor:publish --tag=primer-octicons
```