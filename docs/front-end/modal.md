---
layout: default
title: Modal
parent: Front-End
permalink: /docs/front-end/modal
---

# Tabs
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Accessibles Modals in JavaScript

### Demo
[Demo on codepen](https://codepen.io/mariecomet/pen/gOLjgGP)

### JS

[Link to JS file](assets/js/modal.js)

### HTML Sample

See demo for modal opening from the right.

Open button should have `js-modal` class and `aria-expanded` attribute set to false. The `aria-controls` attribute value is equal to modal `id` attribute.
Modal element should have `modal` class and `hidden` attribute.

```html
<button class="js-modal" aria-controls="modal-id" aria-expanded="false">Open Modal</button>

<div id="modal-id" class="modal" hidden="">
  <div class="modal-overlay" tabindex="-1"></div>
  <div class="modal-content">
	  <button class="close-modal">Close modal</button>
    <h2>Modal title</h2>
    <p>Modal content</p>
  </div>
</div>
```

### CSS
```css
/* General style */
.js-modal > * {
  pointer-events: none; // ignore click inside modal button
}
.modal {
  position: fixed;
  z-index: 50;
  .modal-overlay {
    z-index: 60;
    background-color: rgba(0, 0, 0, 0.66);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .modal-content {
    position: fixed;
    z-index: 70;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: white;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    width: 100%;
    padding: 1rem;
    inset: 40px;
    @media( min-width: 980px ) {
      width: 50%;
      margin: 0 auto;
      padding: 5rem;
    }
    @media( min-width: 1180px ) {
      padding: 10rem 5rem;
    }
  }

  &.modal-open {
    .modal-content {
      display: block;
      transform: translateX(0);
    }
  }
  .close-modal {
    z-index: 80;
  }

  &.right-modal {

    .modal-content {
      right: 0;
      margin: 0;
      left: auto;
      &.modal-open {
      }
      @media( min-width: 980px ) {
        width: 70%;
      }
    }
  }
}
```

