<?php

/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$pageArgs = array(
    'post_type'         => 'page',
    'posts_per_page'    => -1,
);

$context         = Timber::context();
$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
$context['pages'] = Timber::get_posts($pageArgs);
$templates = array('single-project.twig', 'index.twig');

Timber::render($templates, $context);
