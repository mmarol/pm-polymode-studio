<?php

/*
 *
 * Custom Post Types
 *
 */

// Note that you only need the arguments and register_post_type function here. They are hooked into WordPress in functions.php.

// Project labels and arguments
$projectLabels = array(
    'name'                  => _x('Projects', 'Project General Name', 'text_domain'),
    'singular_name'         => _x('Project', 'Project Singular Name', 'text_domain'),
    'menu_name'             => __('Projects', 'text_domain'),
    'name_admin_bar'        => __('Project', 'text_domain'),
    'archives'              => __('Project Archives', 'text_domain'),
    'attributes'            => __('Project Attributes', 'text_domain'),
    'parent_item_colon'     => __('Parent Project:', 'text_domain'),
    'all_items'             => __('All Projects', 'text_domain'),
    'add_new_item'          => __('Add New Project', 'text_domain'),
    'add_new'               => __('Add New', 'text_domain'),
    'new_item'              => __('New Project', 'text_domain'),
    'edit_item'             => __('Edit Project', 'text_domain'),
    'update_item'           => __('Update Project', 'text_domain'),
    'view_item'             => __('View Project', 'text_domain'),
    'view_items'            => __('View Projects', 'text_domain'),
    'search_items'          => __('Search Project', 'text_domain'),
    'not_found'             => __('Not found', 'text_domain'),
    'not_found_in_trash'    => __('Not found in Trash', 'text_domain'),
    'featured_image'        => __('Featured Image', 'text_domain'),
    'set_featured_image'    => __('Set featured image', 'text_domain'),
    'remove_featured_image' => __('Remove featured image', 'text_domain'),
    'use_featured_image'    => __('Use as featured image', 'text_domain'),
    'insert_into_item'      => __('Insert into item', 'text_domain'),
    'uploaded_to_this_item' => __('Uploaded to this item', 'text_domain'),
    'items_list'            => __('Projects list', 'text_domain'),
    'items_list_navigation' => __('Projects list navigation', 'text_domain'),
    'filter_items_list'     => __('Filter items list', 'text_domain'),
);

$projectArgs = array(
    'label'                 => __('Project', 'text_domain'),
    'description'           => __('Project Description', 'text_domain'),
    'labels'                => $projectLabels,
    'supports'              => array('title', 'editor', 'thumbnail'),
    'taxonomies'            => array('deliverable-type'),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => false,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
    'rewrite' => array('id' => '23', 'with_front' => false),
    'menu_icon' => 'dashicons-cover-image',
);

register_post_type('project', $projectArgs);

// Learning Opportunity labels and arguments
$learningLabels = array(
    'name'                  => _x('Learning Opportunities', 'Learning Opportunity General Name', 'text_domain'),
    'singular_name'         => _x('Learning Opportunity', 'Learning Opportunity Singular Name', 'text_domain'),
    'menu_name'             => __('Learning Opportunities', 'text_domain'),
    'name_admin_bar'        => __('Learning Opportunity', 'text_domain'),
    'archives'              => __('Learning Opportunity Archives', 'text_domain'),
    'attributes'            => __('Learning Opportunity Attributes', 'text_domain'),
    'parent_item_colon'     => __('Parent Learning Opportunity:', 'text_domain'),
    'all_items'             => __('All Learning Opportunities', 'text_domain'),
    'add_new_item'          => __('Add New Learning Opportunity', 'text_domain'),
    'add_new'               => __('Add New', 'text_domain'),
    'new_item'              => __('New Learning Opportunity', 'text_domain'),
    'edit_item'             => __('Edit Learning Opportunity', 'text_domain'),
    'update_item'           => __('Update Learning Opportunity', 'text_domain'),
    'view_item'             => __('View Learning Opportunity', 'text_domain'),
    'view_items'            => __('View Learning Opportunities', 'text_domain'),
    'search_items'          => __('Search Learning Opportunity', 'text_domain'),
    'not_found'             => __('Not found', 'text_domain'),
    'not_found_in_trash'    => __('Not found in Trash', 'text_domain'),
    'featured_image'        => __('Featured Image', 'text_domain'),
    'set_featured_image'    => __('Set featured image', 'text_domain'),
    'remove_featured_image' => __('Remove featured image', 'text_domain'),
    'use_featured_image'    => __('Use as featured image', 'text_domain'),
    'insert_into_item'      => __('Insert into item', 'text_domain'),
    'uploaded_to_this_item' => __('Uploaded to this item', 'text_domain'),
    'items_list'            => __('Learning Opportunities list', 'text_domain'),
    'items_list_navigation' => __('Learning Opportunities list navigation', 'text_domain'),
    'filter_items_list'     => __('Filter items list', 'text_domain'),
);

$learningArgs = array(
    'label'                 => __('Learning Opportunity', 'text_domain'),
    'description'           => __('Learning Opportunity Description', 'text_domain'),
    'labels'                => $learningLabels,
    'supports'              => array('title', 'editor'),
    'taxonomies'            => array('opportunity-type'),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => false,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
    'rewrite' => array('id' => '27', 'with_front' => false),
    'menu_icon' => 'dashicons-welcome-learn-more',
);

register_post_type('learning-opportunity', $learningArgs);

// Person labels and arguments
$peopleLabels = array(
    'name'                  => _x('People', 'Person General Name', 'text_domain'),
    'singular_name'         => _x('Person', 'Person Singular Name', 'text_domain'),
    'menu_name'             => __('People', 'text_domain'),
    'name_admin_bar'        => __('Person', 'text_domain'),
    'archives'              => __('Person Archives', 'text_domain'),
    'attributes'            => __('Person Attributes', 'text_domain'),
    'parent_item_colon'     => __('Parent Person:', 'text_domain'),
    'all_items'             => __('All People', 'text_domain'),
    'add_new_item'          => __('Add New Person', 'text_domain'),
    'add_new'               => __('Add New', 'text_domain'),
    'new_item'              => __('New Person', 'text_domain'),
    'edit_item'             => __('Edit Person', 'text_domain'),
    'update_item'           => __('Update Person', 'text_domain'),
    'view_item'             => __('View Person', 'text_domain'),
    'view_items'            => __('View People', 'text_domain'),
    'search_items'          => __('Search Person', 'text_domain'),
    'not_found'             => __('Not found', 'text_domain'),
    'not_found_in_trash'    => __('Not found in Trash', 'text_domain'),
    'featured_image'        => __('Featured Image', 'text_domain'),
    'set_featured_image'    => __('Set featured image', 'text_domain'),
    'remove_featured_image' => __('Remove featured image', 'text_domain'),
    'use_featured_image'    => __('Use as featured image', 'text_domain'),
    'insert_into_item'      => __('Insert into item', 'text_domain'),
    'uploaded_to_this_item' => __('Uploaded to this item', 'text_domain'),
    'items_list'            => __('People list', 'text_domain'),
    'items_list_navigation' => __('People list navigation', 'text_domain'),
    'filter_items_list'     => __('Filter items list', 'text_domain'),
);

$peopleArgs = array(
    'label'                 => __('Person', 'text_domain'),
    'description'           => __('Person Description', 'text_domain'),
    'labels'                => $peopleLabels,
    'supports'              => array('title', 'editor'),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => false,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
    'rewrite' => array('id' => '29', 'with_front' => false),
    'menu_icon' => 'dashicons-groups',
);

register_post_type('person', $peopleArgs);
