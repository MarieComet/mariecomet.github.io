---
layout: default
title: Menus
nav_order: 7
parent: WordPress
permalink: /docs/wordpress/menus
---

# Menus
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Add Custom field to menu item
Use `wp_nav_menu_item_custom_fields` to add custom fields to menu item.
Original tutorial by [Kathy Is Awesome](https://www.kathyisawesome.com/add-custom-fields-to-wordpress-menu-items/)

```php
/**
* Add custom fields to menu item
*
* This will allow us to play nicely with any other plugin that is adding the same hook
*
* @param  int $item_id 
* @params obj $item - the menu item
* @params array $args
*/
function prefix_custom_fields( $item_id, $item ) {

	wp_nonce_field( 'menu_meta_icon_nonce', '_menu_meta_icon_nonce_name' );
	$menu_meta_icon = get_post_meta( $item_id, '_menu_meta_icon', true );
	$menu_meta_hidetext = get_post_meta( $item_id, '_menu_meta_hidetext', true );
	?>
	<p class="field-icon description description-wide">
		<label for="menu-meta-icon-<?php echo $item_id ;?>">
            <?php _e( 'Menu Icon', 'textdomain'); ?>
            <input type="text" name="menu_meta_icon[<?php echo $item_id ;?>]" id="menu-meta-icon-<?php echo $item_id ;?>" value="<?php echo esc_attr( $menu_meta_icon ); ?>" />
        </label>    	
	</p>
	<p class="field-icon-hidetext description description-wide">
		<label for="menu-meta-hidetext-<?php echo $item_id ;?>">
            <input type="checkbox" name="menu_meta_hidetext[<?php echo $item_id ;?>]" id="menu-meta-hidetext-<?php echo $item_id ;?>" value="hidden" <?php checked( $menu_meta_hidetext, 'hidden' ); ?> />
            <?php _e( 'Hide menu text', 'textdomain'); ?>
        </label>    	
	</p>
	<?php
}
add_action( 'wp_nav_menu_item_custom_fields', 'prefix_custom_fields', 10, 2 );

/**
* Save the menu item meta
* 
* @param int $menu_id
* @param int $menu_item_db_id	
*/
function prefix_nav_update( $menu_id, $menu_item_db_id ) {

	// Verify this came from our screen and with proper authorization.
	if ( ! isset( $_POST['_menu_meta_icon_nonce_name'] ) || ! wp_verify_nonce( $_POST['_menu_meta_icon_nonce_name'], 'menu_meta_icon_nonce' ) ) {
		return $menu_id;
	}

	if ( isset( $_POST['menu_meta_icon'][$menu_item_db_id]  ) ) {
		update_post_meta( $menu_item_db_id, '_menu_meta_icon', $_POST['menu_meta_icon'][$menu_item_db_id] );
	} else {
		delete_post_meta( $menu_item_db_id, '_menu_meta_icon' );
	}

	if ( isset( $_POST['menu_meta_hidetext'][$menu_item_db_id]  ) ) {
		update_post_meta( $menu_item_db_id, '_menu_meta_hidetext', $_POST['menu_meta_hidetext'][$menu_item_db_id] );
	} else {
		delete_post_meta( $menu_item_db_id, '_menu_meta_hidetext' );
	}
}
add_action( 'wp_update_nav_menu_item', 'prefix_nav_update', 10, 2 );

/**
* Displays icon on the front-end.
*
* @param string   $title The menu item's title.
* @param WP_Post  $item  The current menu item.
* @return string      
*/
function prefix_custom_menu_title( $title, $item ) {

	if( is_object( $item ) && isset( $item->ID ) ) {

		$menu_meta_icon = get_post_meta( $item->ID, '_menu_meta_icon', true );
		$menu_meta_hidetext = get_post_meta( $item->ID, '_menu_meta_hidetext', true );
		if ( ! empty( $menu_meta_icon ) ) {
			// If "Hide text" checkbox => visually hide text
			if ( ! empty( $menu_meta_hidetext ) && 'hidden' === $menu_meta_hidetext ) {
				$title = '<span class="screen-reader-text">' . $title . '</span><span class="menu-item-icon" aria-hidden="true"> ' . $menu_meta_icon . '</span>';
			} else {
				$title .= '<span class="menu-item-icon" aria-hidden="true">' . $menu_meta_icon . '</span>';
			}
			
		}
	}
	return $title;
}
add_filter( 'nav_menu_item_title', 'prefix_custom_menu_title', 10, 2 );
```

## Replace a tag and href by span for menu items that have "#" for URL

```
add_filter( 'walker_nav_menu_start_el','mc_remove_blank_menu_items_links', 10, 4 );
function mc_remove_blank_menu_items_links( $item_output, $item, $depth, $args ) {
	if ( $item->url == '#' ) {
		return preg_replace('/<a href\=".*" (.*)>(.*)<\/a>/U', '<span $1>$2</span>', $item_output);
	}
	return $item_output;
}
```
