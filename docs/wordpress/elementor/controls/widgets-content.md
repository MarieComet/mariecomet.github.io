---
layout: default
title: Widgets Content
parent: Elementor
grand_parent: WordPress
permalink: /docs/wordpress/elementor/widgets-content
nav_order: 2
---

# Widgets Content
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Insert content/Edit widget before/after render (outside main element)
The good place to add custom main element `_wrapper` attributes before render
```php
/**
 * Before frontend element render.
 *
 * Fires before Elementor element is rendered in the frontend.
 *
 * @since 2.2.0
 *
 * @param Element_Base $this The element.
 */
function add_button_custom_attribute( $widget ) {
	
	$element->add_render_attribute( '_wrapper', [
		'class' => 'my-custom-class',
		'data-my_data' => 'my-data-value',
	] );
}
add_action( 'elementor/frontend/before_render', 'add_button_custom_attribute', 10, 1 );
// After element : elementor/frontend/after_render
// Target specific element : elementor/frontend/{$element_type}/before_render
```

## Before render content (inside main element)
`elementor/widget/before_render_content`
The good place to add custom attributes before render content
```php
/**
 * Before widget render content.
 *
 * Fires before Elementor widget is being rendered.
 *
 * @since 1.0.0
 *
 * @param Widget_Base $this The current widget.
 */
function add_button_custom_attribute( $widget ) {
	
	if ( 'button' === $widget->get_name() ) { // if button is current widget
		$settings = $widget->get_settings(); // get widget settings
		// add custom attribute to button
		$widget->add_render_attribute( 'button', 'data-custom-control', $settings[ 'button_custom_control' ] );
	}
}
add_action( 'elementor/widget/before_render_content', 'add_button_custom_attribute', 10, 1 );
```

## Edit widget HTML before render
`elementor/widget/render_content`
The good place to edit widget HTML/add HTML before render
```php
/**
 * Render widget content.
 *
 * Filters the widget content before it's rendered.
 *
 * @since 1.0.0
 *
 * @param string      $widget_content The content of the widget.
 * @param Widget_Base $this           The widget.
 */
function add_button_custom_attribute( $content, $widget ) {
	if ( 'heading' === $widget->get_name() ) {
		$settings = $widget->get_settings();

		if ( ! empty( $settings['link']['is_external'] ) ) {
			$content .= '<i class="fa fa-external-link" aria-hidden="true"></i>';
		}
	}
   
   return $content;
}
add_action( 'elementor/widget/render_content', 'add_button_custom_attribute', 10, 2 );
```