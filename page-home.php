<?php

$args = array(
    'post_type'         => array('project', 'learning-opportunity'),
    'posts_per_page'    => -1,
    'orderby'           => 'rand',
    'order'             => 'ASC'
);

$context          = Timber::context();
$context['page'] = Timber::get_post();
$context['items'] = Timber::get_posts($args);

$templates        = array('page-home.twig');

Timber::render($templates, $context);
