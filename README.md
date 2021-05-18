# Tabletop Modular
Tabletop Modular is an online multiplayer experience where players can play and interact with a virtual modular synthesizer. You can play it live at [https://modular.mt.layetri.nl/](https://modular.mt.layetri.nl/) (temporary location).
 
Tabletop Modular uses the following libraries/frameworks:
- Laravel
- Vue
- TailwindCSS
- ToneJS

### Build and run locally
First, make sure PHP, Composer and NPM are installed. You will need to create a local database and generate a Pusher key pair for the application to work. Details on setting Laravel up to work with these can be found in the [Laravel documentation](https://laravel.com/docs).

- To install the required packages, run `composer install` in the project root directory, followed by `npm install`
- Then, to reset the configuration to work with your system, run `php artisan config:cache`, `php artisan route:cache` and `php artisan cache:clear`
- After this, you run the application's database migrations by calling `php artisan migrate`
- Finally, run `npm run prod` or `npm run dev` to build the JS assets

You can run the app by executing `php artisan serve`. This will expose a server on `http://localhost:8000`.

### Template documentation
Will be added soon(tm).

#### The Module template
```Text go here```

#### The Parameter template
```Text go here```

#### The Audio Connector template
```Text go here```

#### The CV Connector template
```Text go here```
