<?php

$args = array(
    'post_type'         => 'learning-opportunity',
    'posts_per_page'    => -1,
);

$context          = Timber::context();
$context['page'] = Timber::get_post();
$context['opportunities'] = Timber::get_posts($args);

$templates        = array('page-learn.twig');

Timber::render($templates, $context);
