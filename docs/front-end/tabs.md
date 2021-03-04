---
layout: default
title: Tabs
parent: Front-End
permalink: /docs/front-end/tabs
---

# Tabs
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Accessibles Tabs in JavaScript (automatic activation)
Accessible tabs with keyboard support.

Code from [W3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html)

### Demo
[Demo on codepen](https://codepen.io/mariecomet/pen/gOPyVga)

### JS

[Link to JS file](assets/js/tabs.js)

### HTML Sample

Switch to vertical tabs by adding `vertical` class to `tabs` wrapper, and `aria-orientation="vertical"` attribute to `tablist`.

```html
<div class="tabs">
  <div role="tablist" aria-label="Entertainment">
    <button role="tab"
            aria-selected="true"
            aria-controls="nils-tab"
            id="nils">
      Nils Frahm
    </button>
    <button role="tab"
            aria-selected="false"
            aria-controls="agnes-tab"
            id="agnes"
            tabindex="-1">
      Agnes Obel
    </button>
    <button role="tab"
            aria-selected="false"
            aria-controls="complexcomplex"
            id="complex"
            tabindex="-1"
            data-deletable="">
      Joke
    </button>
  </div>
  <div tabindex="0"
       role="tabpanel"
       id="nils-tab"
       aria-labelledby="nils">
    <p>
      Nils Frahm is a German musician, composer and record producer based in Berlin.
    </p>
  </div>
  <div tabindex="0"
       role="tabpanel"
       id="agnes-tab"
       aria-labelledby="agnes"
       hidden="">
    <p>
      Agnes Caroline Thaarup Obel is a Danish singer/songwriter
    </p>
  </div>
  <div tabindex="0"
       role="tabpanel"
       id="complexcomplex"
       aria-labelledby="complex"
       hidden="">
    <p>
      Fear of complicated buildings:
    </p>
    <p>
      A complex complex complex.
    </p>
  </div>
</div>
```

### CSS (with vertical support)

```css
.tabs {
  [role="tab"] {
    background: white;
    border-width: 1px 1px 0 1px;
    border-style: solid;
    border-color: blue;
    padding: 8px 15px;
    margin: 5px 5px 0 0;
    cursor: pointer;
    &[aria-selected="true"] {
      background: blue;
      color: white;
    }
  }
  [role=tabpanel] {
    border: 1px solid blue;
    padding: 8px 15px;
  }
  &.vertical {
    display: flex;
    flex-direction: row;
    [role="tablist"] {
      width: 30%;
    }
    [role="tab"] {
      width: 100%;
      margin: 0;
      border-width: 1px 0 1px 1px;
    }
    [role="tabpanel"] {
      width: 70%;
    }
  }
}
```

