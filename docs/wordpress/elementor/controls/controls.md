---
layout: default
title: Elementor Controls
parent: Elementor
grand_parent: WordPress
permalink: /docs/wordpress/elementor/controls
nav_order: 1
---

# Elementor Controls
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Inject control at specific location in a widget
Inject control at a specific location in an existing widget

```php
/**
 * Add Text control before link control of Button widget
 *
 * Used to inject controls and sections to a specific position in the stack.
 *
 * @param Element_Base $element The edited element.
 * @param array  $args Section arguments.
 *
 */
function add_button_control_before_link( $element, $args ) {
	// start injection of control before an other control
	$element->start_injection( [
		'at' => 'before',
		'of' => 'link',
	] );
	// add control
	$element->add_control(
		'button_custom_control',
		[
			'label' => __( 'Custom control', 'textdomain' ),
			'type' => \Elementor\Controls_Manager::TEXT,
			'default' => 'default value',
		]
	);
	// end injection just after
	$element->end_injection();
}
add_action( 'elementor/element/button/section_button/before_section_start', 'add_button_control_before_link', 10, 2 );
```

Dynamics portions of the hook :
```php
elementor/element/{$widget_name}/{$section_name}/{$section_id}/before_section_start
```

Multiple places :
- before_section_start
- after_section_start
- before_section_end
- after_section_end

## Inject section before/after an existing section
`elementor/element/before_section_start`
Register a custom section before/after an existing section

```php
function add_section_before_section_style( $element, $section_id, $args ) {
   /** @var \Elementor\Element_Base $element */
   if ( 'section' === $element->get_name() && 'section_background' === $section_id ) {

   	$element->start_controls_section(
   		'custom_section',
   		[
   			'tab' => \Elementor\Controls_Manager::TAB_STYLE,
   			'label' => __( 'Custom Section', 'textdomain' ),
   		]
   	);

   	$element->add_control(
   		'custom_control',
   		[
   		'type' => \Elementor\Controls_Manager::NUMBER,
   		'label' => __( 'Custom Control', 'textdomain' ),
   		]
   	);

   	$element->end_controls_section();
   }
}
add_action( 'elementor/element/before_section_start', 'add_section_before_section_style', 10, 3 );
```

Multiple places :
- before_section_start
- after_section_end

## Update an existing control
Change properties of an existing control with `update_control` method
```php
function update_button_align_control( $element, $args ) {
	// update "align" control, set default value to "center"
	// add condition : show control only if button type is not "info"
	$element->update_control(
		'align', // control ID
		[
			'default' => 'center',
			'condition' => [
				'button_type!' => 'info',
			],
		]
	);
}
add_action( 'elementor/element/button/section_style/after_section_end', 'update_button_align_control', 10, 2 );
```

## Related Elementor documentation
- [PHP hooks > Editor Actions](https://code.elementor.com/php-hooks/#Editor_Actions)