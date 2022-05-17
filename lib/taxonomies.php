<?php

/*
 *
 * Taxonomies
 *
 */

// Same as with Custom Types, you only need the arguments and register_taxonomy function here. They are hooked into WordPress in functions.php.

// Project deliverable types
$deliverableLabels = array(
    'name'                       => _x('Deliverable types', 'taxonomy general name', 'textdomain'),
    'singular_name'              => _x('Deliverable type', 'taxonomy singular name', 'textdomain'),
    'search_items'               => __('Search Deliverable types', 'textdomain'),
    'popular_items'              => __('Popular Deliverable types', 'textdomain'),
    'all_items'                  => __('All Deliverable types', 'textdomain'),
    'parent_item'                => null,
    'parent_item_colon'          => null,
    'edit_item'                  => __('Edit Deliverable type', 'textdomain'),
    'update_item'                => __('Update Deliverable type', 'textdomain'),
    'add_new_item'               => __('Add New Deliverable type', 'textdomain'),
    'new_item_name'              => __('New Deliverable type Name', 'textdomain'),
    'separate_items_with_commas' => __('Separate Deliverables with commas', 'textdomain'),
    'add_or_remove_items'        => __('Add or remove Deliverables', 'textdomain'),
    'choose_from_most_used'      => __('Choose from the most used Deliverables', 'textdomain'),
    'not_found'                  => __('No Deliverables found.', 'textdomain'),
    'menu_name'                  => __('Deliverable types', 'textdomain'),
);

$deliverableArgs = array(
    'hierarchical'          => false,
    'labels'                => $deliverableLabels,
    'public'                => false,
    'meta_box_cb'           => false,
    'show_ui'               => true,
    'show_admin_column'     => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var'             => true,
    'rewrite'               => array('slug' => 'deliverable-type'),
);

register_taxonomy('deliverable-type', 'project', $deliverableArgs);


// Learning opportunity categories
$learningLabels = array(
    'name'                       => _x('Opportunity types', 'taxonomy general name', 'textdomain'),
    'singular_name'              => _x('Opportunity type', 'taxonomy singular name', 'textdomain'),
    'search_items'               => __('Search Opportunity types', 'textdomain'),
    'popular_items'              => __('Popular Opportunity types', 'textdomain'),
    'all_items'                  => __('All Opportunity types', 'textdomain'),
    'parent_item'                => null,
    'parent_item_colon'          => null,
    'edit_item'                  => __('Edit Opportunity type', 'textdomain'),
    'update_item'                => __('Update Opportunity type', 'textdomain'),
    'add_new_item'               => __('Add New Opportunity type', 'textdomain'),
    'new_item_name'              => __('New Opportunity type Name', 'textdomain'),
    'separate_items_with_commas' => __('Separate Opportunities with commas', 'textdomain'),
    'add_or_remove_items'        => __('Add or remove Opportunities', 'textdomain'),
    'choose_from_most_used'      => __('Choose from the most used Opportunities', 'textdomain'),
    'not_found'                  => __('No Opportunities found.', 'textdomain'),
    'menu_name'                  => __('Opportunity types', 'textdomain'),
);

$learningArgs = array(
    'hierarchical'          => false,
    'labels'                => $learningLabels,
    'public'                => false,
    'meta_box_cb'           => false,
    'show_ui'               => true,
    'show_admin_column'     => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var'             => true,
    'rewrite'               => array('slug' => 'opportunity-type'),
);

register_taxonomy('opportunity-type', 'learning-opportunity', $learningArgs);
