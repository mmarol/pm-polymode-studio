<?php

$context          = Timber::context();
$context['page']  = Timber::get_post();

$templates        = array('page-about.twig');

Timber::render($templates, $context);
