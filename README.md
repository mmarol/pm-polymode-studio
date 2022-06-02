# Polymode 2022 theme

This theme is built based on the Timber starter theme.

## Required WordPress plugins

- [Advanced Custom Fields Pro](https://wordpress.org/plugins/advanced-custom-fields/) (this links to the free version)
- [Advanced Custom Fields: Extended](https://wordpress.org/plugins/acf-extended/)
- [Classic Editor](https://wordpress.org/plugins/classic-editor/)
- [Timber](https://wordpress.org/plugins/timber-library/)

## Additional WordPress plugins

- [Admin Menu Editor](https://wordpress.org/plugins/admin-menu-editor/)
- [Disable Comments](https://wordpress.org/plugins/disable-comments/)
- [Filebird](https://ninjateam.gitbook.io/filebird/)
- [WP Migrate](https://deliciousbrains.com/wp-migrate-db-pro/)
- [W3 Total Cache](https://www.boldgrid.com/w3-total-cache/)

## Setting up the theme for editing

1. Install all the plugins listed above
2. If the ACF field groups are not set up, import the [ACF fields JSON file](./acf-fields.json) in the ACF/Tools panel of the CMS.
3. In your terminal, go to the theme folder in the WordPress project
4. Run `npm install` to install all relevant node packages
5. Install [Composer](https://getcomposer.org/download/) in this theme folder if you do not have it installed already.
6. Run `composer require timber/timber` to install Timber.
7. Change the proxy URL in [gulpfile.js](./gulpfile.js) to match the locally served URL.
8. Run `gulp` and make changes to a `scss`, `js`, `php` and `twig` file to make sure the site is being served at a BrowserSync URL and is reloading correctly.

## What's here?

`src/` is where you can keep your static front-end scripts, styles, or images. In other words, your Sass files, JS files, fonts, and SVGs would live here. The `gulp` process compiles these files to the `dist/` folder. Running `gulp --prod` will build production ready files to the folder instead.

`src/scss/` is organized using the [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern) and is using the newer [`@use` Sass rule](https://sass-lang.com/documentation/at-rules/use).

`templates/` contains all of your Twig templates. These correspond 1 to 1 with the PHP files that respond to the WordPress template hierarchy.

`lib/` contains custom post type, menu, taxonomy and widget definition files

`bin/` and `tests/` ... basically don't worry about (or remove) these unless you know what they are and want to.

## Resources

- [Timber documentation](https://timber.github.io/docs/)
- [Twig for Timber Cheatsheet](http://notlaura.com/the-twig-for-timber-cheatsheet/)
- [Twig documentation](https://twig.symfony.com/doc/3.x/)
- [WordPress Template Hierarchy](https://wphierarchy.com/)
