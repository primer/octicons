<?php

namespace Devzkhalil\LaravelPrimerOcticons;

use Illuminate\Support\ServiceProvider;

class LaravelPrimerOcticonsServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'icon');

        $this->publishes([
            __DIR__ . '/../resources/views/components' => base_path('resources/views/components/icons'),
        ], 'primer-octicons');
    }
}
