
/* SLICÉ BY SUSAN
   Shared menu and cart data
*/

const MENU_ITEMS = [
    { id: "margherita", name: "Margherita Pizza", category: "pizza", price: 800, description: "Tomato sauce, mozzarella and fresh basil.", image: "images/margaritta.jpg", tag: "The Classic" },
    { id: "pepperoni", name: "Pepperoni Pizza", category: "pizza", price: 1000, description: "Pepperoni, rich tomato sauce and melted cheese.", image: "images/pepperoni.jpg", tag: "Fan Favourite" },
    { id: "bbq", name: "BBQ Chicken Pizza", category: "pizza", price: 1200, description: "Barbecue sauce, chicken and mozzarella.", image: "images/chickenbbq.jpg", tag: "" },
    { id: "veggie", name: "Garden Veggie Pizza", category: "pizza", price: 950, description: "Colourful vegetables, tomato sauce and cheese.", image: "images/vegie-pizza.jpg", tag: "" },
    { id: "fourcheese", name: "Four Cheese Pizza", category: "pizza", price: 1100, description: "A rich blend of cheeses on a golden crust.", image: "images/fourcheese.jpg", tag: "" },
    { id: "supreme", name: "Slicé Supreme", category: "pizza", price: 1350, description: "A generous mix of toppings and savoury cheese.", image: "images/supreme.jpg", tag: "Loaded" },

    { id: "fries", name: "Golden Fries", category: "sides", price: 250, description: "Crispy, golden fries served fresh.", image: "images/fries.jpg", tag: "" },
    { id: "garlicbread", name: "Garlic Bread", category: "sides", price: 300, description: "Warm bread with garlic and herbs.", image: "images/garlicbread (2).jpg", tag: "" },
    { id: "wings", name: "Chicken Wings", category: "sides", price: 500, description: "Flavourful wings served with sauce.", image: "images/chickenwings.jpg", tag: "" },

    { id: "brownie", name: "Chocolate Brownie", category: "desserts", price: 250, description: "A rich, chocolatey treat.", image: "images/brownie.jpg", tag: "" },
    { id: "icecream", name: "Ice Cream", category: "desserts", price: 200, description: "A cool, creamy scoop of something sweet.", image: "images/icecream.jpg", tag: "" },

    { id: "lemonade", name: "Fresh Lemonade", category: "drinks", price: 180, description: "A refreshing citrus drink.", image: "images/lemonade.jpg", tag: "" },
    { id: "soda", name: "Soft Drink", category: "drinks", price: 100, description: "A chilled drink to complement your meal.", image: "images/soda.jpg", tag: "" }
];

const CART_KEY = "sliceBySusanCart";

function formatPrice(amount) {
    return "KSh " + amount.toLocaleString("en-KE");
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch {
        return {};
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
    return Object.values(getCart()).reduce(
        (sum, quantity) => sum + quantity, 0
    );
}

function getCartTotal() {
    const cart = getCart();

    return MENU_ITEMS.reduce(
        (sum, item) => sum + item.price * (cart[item.id] || 0), 0
    );
}

function addToCart(id) {
    const cart = getCart();
    cart[id] = Math.min(50, (Number(cart[id]) || 0) + 1);
    saveCart(cart);
}

function setCartQuantity(id, quantity) {
    const cart = getCart();
    const safeQuantity = Math.min(50, Math.max(0, Number(quantity) || 0));

    if (safeQuantity === 0) {
        delete cart[id];
    } else {
        cart[id] = safeQuantity;
    }

    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}
