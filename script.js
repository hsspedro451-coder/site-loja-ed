// Script principal do EduCart

// Dados de produtos dummy
const dummyProducts = [
    {
        id: 1,
        name: "Mochila Escolar Impermeável",
        category: "mochilas",
        price: 129.90,
        oldPrice: 159.90,
        discount: 19,
        rating: 4.5,
        reviewCount: 128,
        image: "http://static.photos/education/640x360/301",
        description: "Mochila resistente à água com múltiplos compartimentos",
        serie: ["fundamental2", "medio"],
        featured: true
    },
    {
        id: 2,
        name: "Caderno Universitário 200 folhas",
        category: "cadernos",
        price: 24.90,
        oldPrice: null,
        discount: 0,
        rating: 4.2,
        reviewCount: 89,
        image: "http://static.photos/education/640x360/302",
        description: "Caderno espiral capa dura 10 matérias",
        serie: ["universitario"],
        featured: true
    },
    {
        id: 3,
        name: "Estojo Escolar Transparente",
        category: "estojos",
        price: 19.90,
        oldPrice: 29.90,
        discount: 34,
        rating: 4.7,
        reviewCount: 56,
        image: "http://static.photos/education/640x360/303",
        description: "Estojo organizador com divisórias",
        serie: ["infantil", "fundamental1"],
        featured: true
    },
    {
        id: 4,
        name: "Kit Canetas Coloridas 12 cores",
        category: "escrita",
        price: 15.90,
        oldPrice: null,
        discount: 0,
        rating: 4.8,
        reviewCount: 203,
        image: "http://static.photos/education/640x360/304",
        description: "Canetas gel ponta fina 0.7mm",
        serie: ["all"],
        featured: true
    },
    {
        id: 5,
        name: "Calculadora Científica",
        category: "tecnologia",
        price: 89.90,
        oldPrice: 119.90,
        discount: 25,
        rating: 4.6,
        reviewCount: 42,
        image: "http://static.photos/education/640x360/305",
        description: "Calculadora para ensino médio e superior",
        serie: ["medio", "universitario"],
        featured: false
    },
    {
        id: 6,
        name: "Lápis de Cor Profissional 24 cores",
        category: "escrita",
        price: 45.90,
        oldPrice: 59.90,
        discount: 23,
        rating: 4.9,
        reviewCount: 167,
        image: "http://static.photos/education/640x360/306",
        description: "Lápis de cor com pigmentação intensa",
        serie: ["all"],
        featured: false
    },
    {
        id: 7,
        name: "Tablet Educacional 10''",
        category: "tecnologia",
        price: 899.90,
        oldPrice: 1099.90,
        discount: 18,
        rating: 4.4,
        reviewCount: 31,
        image: "http://static.photos/education/640x360/307",
        description: "Tablet com apps educacionais inclusos",
        serie: ["fundamental2", "medio", "universitario"],
        featured: false
    },
    {
        id: 8,
        name: "Mochila Infantil com Rodinhas",
        category: "mochilas",
        price: 159.90,
        oldPrice: 199.90,
        discount: 20,
        rating: 4.3,
        reviewCount: 78,
        image: "http://static.photos/education/640x360/308",
        description: "Mochila com carrinho para crianças",
        serie: ["infantil", "fundamental1"],
        featured: false
    }
];

// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('educart_cart')) || [];

// Função para carregar produtos em destaque
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    container.innerHTML = '';
    
    const featuredProducts = dummyProducts.filter(product => product.featured);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Função para criar card de produto
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card bg-white rounded-2xl shadow-lg overflow-hidden';
    
    const discountBadge = product.discount > 0 ? 
        `<div class="discount-badge">-${product.discount}%</div>` : '';
    
    const oldPrice = product.oldPrice ? 
        `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : '';
    
    div.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${product.name}" class="w-full product-image">
            ${discountBadge}
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-lg">${product.name}</h3>
                <div class="star-rating">
                    <i data-feather="star" class="w-4 h-4 fill-current"></i>
                    <span>${product.rating}</span>
                </div>
            </div>
            <p class="text-gray-600 text-sm mb-4">${product.description}</p>
            <div class="flex items-center justify-between">
                <div>
                    <div class="price text-2xl">R$ ${product.price.toFixed(2)}</div>
                    ${oldPrice}
                </div>
                <button onclick="addToCart(${product.id})" class="bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
                    <i data-feather="shopping-cart" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    `;
    
    return div;
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = dummyProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('educart_cart', JSON.stringify(cart));
    
    // Atualizar contador do carrinho
    updateCartCount();
    
    // Mostrar notificação
    showNotification(`${product.name} adicionado ao carrinho!`, 'success');
}

// Função para atualizar contador do carrinho
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Função para mostrar notificação
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i data-feather="${type === 'success' ? 'check-circle' : 'info'}" class="w-5 h-5"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Inicializar feather icons
    feather.replace();
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para buscar produtos por categoria/série
function filterProducts(filters = {}) {
    let filtered = [...dummyProducts];
    
    if (filters.category) {
        filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.serie && filters.serie !== 'all') {
        filtered = filtered.filter(product => 
            product.serie.includes(filters.serie) || product.serie.includes('all')
        );
    }
    
    if (filters.maxPrice) {
        filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }
    
    return filtered;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar contador do carrinho
    updateCartCount();
    
    // Inicializar feather icons
    feather.replace();
    
    // Verificar se estamos na página do catálogo
    if (window.location.pathname.includes('catalogo.html')) {
        loadCatalogProducts();
    }
});

// Função para carregar produtos no catálogo
function loadCatalogProducts(filters = {}) {
    const container = document.getElementById('catalog-products');
    if (!container) return;
    
    const products = filterProducts(filters);
    
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-feather="search" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600">Nenhum produto encontrado</h3>
                <p class="text-gray-500">Tente ajustar os filtros</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    feather.replace();
}

// Função para calcular total do carrinho
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Função para atualizar quantidade no carrinho
function updateCartQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    
    localStorage.setItem('educart_cart', JSON.stringify(cart));
    updateCartCount();
    
    // Se estiver na página do carrinho, recarregar
    if (window.location.pathname.includes('carrinho.html')) {
        loadCartItems();
    }
}

// Função para carregar itens do carrinho
function loadCartItems() {
    const container = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i data-feather="shopping-cart" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600">Seu carrinho está vazio</h3>
                <p class="text-gray-500 mb-6">Adicione produtos para continuar</p>
                <a href="catalogo.html" class="btn-primary inline-block">Ver Catálogo</a>
            </div>
        `;
        feather.replace();
        
        if (subtotalElement) subtotalElement.textContent = 'R$ 0,00';
        if (totalElement) totalElement.textContent = 'R$ 0,00';
        return;
    }
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center gap-4 p-4 bg-white rounded-lg shadow';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-contain">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600 text-sm">R$ ${item.price.toFixed(2)} cada</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                    <i data-feather="minus" class="w-4 h-4"></i>
                </button>
                <span class="w-12 text-center">${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                    <i data-feather="plus" class="w-4 h-4"></i>
                </button>
            </div>
            <div class="text-right">
                <div class="font-bold">R$ ${(item.price * item.quantity).toFixed(2)}</div>
                <button onclick="updateCartQuantity(${item.id}, 0)" class="text-red-500 text-sm hover:text-red-700">
                    <i data-feather="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        container.appendChild(itemElement);
    });
    
    feather.replace();
    
    const subtotal = calculateCartTotal();
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + shipping;
    
    if (subtotalElement) subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2)}`;
}