const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// ========== NAV TOGGLE ==========
if (bar) {
    bar.addEventListener('click', () => nav.classList.add('active'));
}
if (close) {
    close.addEventListener('click', () => nav.classList.remove('active'));
}

// ========== PRODUCT CLICK NAVIGATION ==========
document.querySelectorAll('.pro').forEach(product => {
    product.addEventListener('click', (event) => {
        // Avoid overriding clicks on links/icons inside product card
        if (event.target.tagName !== 'A' && !event.target.closest('a')) {
            const id = product.getAttribute('data-id');
            window.location.href = `single-product.html?id=${id}`;
        }
    });
});

// ========== SINGLE PRODUCT PAGE ==========
if (window.location.pathname.includes('single-product.html')) {
    // Example product database (expand with all products)
    const products = [
        {
            id: 'pro1',
            category: "Women's Fashion",
            name: 'Silk Underwear',
            price: '$80',
            description: 'Luxurious silk underwear designed for comfort and style.',
            mainImg: 'shop-img/ss1.png',
            smallImgs: [
                'single/ss1b.jpeg',
                'single/ss1c.jpeg',
                'single/ss1d.jpeg',
                'single/ss1a.png'
            ]
        },
        {
            id: 'pro2',
            category: "Women's Fashion",
            name: 'Silk Underwear',
            price: '$55',
            description: 'Elegant and breathable silk underwear for everyday wear.',
            mainImg: 'shop-img/ss2.png',
            smallImgs: [
                'single/ss2a.png',
                'single/ss2b.jpeg',
                'single/ss2c.jpeg',
                'single/ss2d.png'
            ]
        }
        // ✅ Add more products (pro3, pro4...) here
    ];

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === productId);

    if (product) {
        // Fill product details
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('MainImg').src = product.mainImg;

        // Fill small images
        const smallImgGroup = document.querySelector('.small-img-grp');
        smallImgGroup.innerHTML = product.smallImgs.map(img => `
            <div class="small-img-col">
                <img src="${img}" alt="Product Image" width="100%" class="small-img"/>
            </div>
        `).join('');

        // ✅ Re-bind image switching after thumbnails are injected
        document.querySelectorAll('.small-img').forEach(img => {
            img.addEventListener('click', () => {
                document.getElementById('MainImg').src = img.src;
            });
        });

        // ✅ Add to cart functionality (basic localStorage version)
        document.getElementById('add-to-cart').addEventListener('click', () => {
            const quantity = document.getElementById('product-quantity').value;
            const color = document.getElementById('product-color').value;
            const size = document.getElementById('product-size').value;

            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: parseInt(quantity, 10),
                color,
                size,
                image: product.mainImg
            };

            // Save to localStorage cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`✅ Added ${quantity} ${product.name} (Color: ${color}, Size: ${size}) to cart!`);
        });
    } else {
        // If no product found
        document.getElementById('product-details').innerHTML = `<h2>Product not found</h2>`;
    }
}
