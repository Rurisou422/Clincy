# ClincyDMA - Premium DMA Firmware Provider Website

A modern, cyber-themed website for a DMA firmware provider, featuring a dark theme with green accents and interactive animations.

## Features

- Responsive design for all device sizes
- Modern cyber-themed UI with animated elements
- Interactive product cards with hover effects
- Product filtering functionality
- Particle effects and dynamic background
- Mobile-friendly navigation
- Animated elements on scroll

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. Clone or download this repository
2. Make sure you have images in the `Public/Images` folder (see below)
3. Open `index.html` in your web browser

### Required Images

The following images are needed in the `Public/Images` folder:

- `logo.png` - The site logo
- `hero.png` - Main hero section image
- `product1.png` through `product4.png` - Product images

## Customization

### Color Theme

The color scheme can be easily modified by changing the CSS variables in the `styles.css` file:

```css
:root {
    --primary-color: #0cff6c; /* Main green color */
    --primary-dark: #0a9e56;  /* Darker green for hover states */
    --secondary-color: #00e1ff; /* Secondary accent color */
    --dark-bg: #0a0a0a; /* Main background color */
    --darker-bg: #050505; /* Darker background for header/footer */
    /* ... other variables ... */
}
```

### Adding Products

To add new products, copy and modify the product card HTML structure in the `index.html` file:

```html
<div class="product-card" data-category="firmware">
    <div class="product-image">
        <img src="Public/Images/your-product-image.png" alt="Product Name">
        <div class="product-overlay">
            <div class="product-actions">
                <a href="#" class="view-btn">View Details</a>
                <a href="#" class="buy-btn">Purchase</a>
            </div>
        </div>
    </div>
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="product-desc">Product description goes here</p>
        <div class="product-price">
            <span class="price">€XX.XX</span>
            <span class="stock in-stock">In Stock</span>
        </div>
    </div>
</div>
```

### Adding New Categories

To add a new product category:

1. Add a new button in the category filter section:

```html
<button class="category-btn" data-category="your-category">Your Category</button>
```

2. Add the corresponding data attribute to your product cards:

```html
<div class="product-card" data-category="your-category">
    <!-- Product content -->
</div>
```

## Animations and Effects

The site includes multiple animations:

1. Background grid animation
2. Particle effects
3. Hover animations on buttons and cards
4. Scroll animations for elements
5. Text glitch effect

These can be customized in the `styles.css` and `script.js` files.

## Browser Support

The website uses modern CSS and JavaScript features and is best viewed in the latest versions of:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Orbitron font for cyber-themed typography 