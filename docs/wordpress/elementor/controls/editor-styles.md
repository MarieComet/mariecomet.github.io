---
layout: default
title: Editor styles
parent: Elementor
grand_parent: WordPress
permalink: /docs/wordpress/elementor/editor-styles
nav_order: 3
---

# Editor styles
{: .no_toc }
Edit/Extend Elementor editor styles

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Add custom color palettes
Update color palettes (wp_options)
```php
// define a main colors scheme
function prefix_color_scheme( $colors = array() ) {
	$colors = [
		'1' => '#ddd',
		'2' => '#000',
		'3' => '#454545',
		'4' => '#D34D4D',
	];
	return $colors;
}

// define a colors scheme for color picker
function prefix_color_scheme_picker( $colors_picker = array() ) {
	$colors_picker = [
		'1' => '#fff',
		'2' => '#000',
		'3' => '#ccc',
		'4' => '#F20000',
		'5' => '#1EBA0E',
		'6' => '#182FC2',
	];
	return $colors_picker;
}
// update elementor color scheme on switch theme
add_action( 'after_switch_theme', 'prefix_update_elementor_scheme_color' );
function prefix_update_elementor_scheme_color() {
	$colors = prefix_color_scheme();
	if ( $colors ) {
		update_option( 'elementor_scheme_color', $colors );
	}
	$colors_picker = prefix_color_scheme_picker();
	if ( $colors_picker ) {
		update_option( 'elementor_scheme_color-picker', $colors_picker );
	}
}
```

## Add custom fonts
Add custom fonts family, displayed in all font selectors
```php
/**
 * Add Font Group to Elementor
 */
add_filter( 'elementor/fonts/groups', 'prefix_elementor_custom_fonts_group', 10, 1 );
function prefix_elementor_custom_fonts_group( $font_groups ) {

	$font_groups['theme_fonts'] = __( 'Theme Fonts' );
	return $font_groups;
}
/**
 * Add Fonts to font group
 */
add_filter( 'elementor/fonts/additional_fonts', 'prefix_elementor_custom_fonts', 10, 1 );
function prefix_elementor_custom_fonts( $additional_fonts ) {
	// Key/value
	//Font name/font group
	$additional_fonts[ 'Custom font' ] = 'theme_fonts';
	return $additional_fonts;
}
```