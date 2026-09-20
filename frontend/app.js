const API_URL = '/api/products'; // Nginx reverse proxy handles this

async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();
        const list = document.getElementById('product-list');
        list.innerHTML = '';
        
        if (products.length === 0) {
            list.innerHTML = '<p>No products available yet. Add one above!</p>';
            return;
        }

        products.forEach(p => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `<span><strong>${p.name}</strong></span> <span>$${p.price}</span>`;
            list.appendChild(div);
        });
    } catch (err) {
        console.error('Failed to fetch products', err);
        document.getElementById('product-list').innerHTML = '<p style="color:red;">Error loading products. Is the backend running?</p>';
    }
}

async function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    
    if (!name || !price) return alert("Please enter name and price");

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        });
        
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        
        fetchProducts();
    } catch (err) {
        console.error('Failed to add product', err);
        alert("Failed to add product.");
    }
}

// Load initial products when page loads
fetchProducts();
