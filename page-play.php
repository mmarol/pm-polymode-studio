<?php

$context          = Timber::context();
$context['page']  = Timber::get_post();

$templates        = array('page-play.twig');

Timber::render($templates, $context);
