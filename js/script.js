const acaiItems = [
    { id: 1, name: "Açaí Tradicional", price: 15.00, image: "images/acai-tradicional.jpg" },
    { id: 2, name: "Açaí Grego", price: 17.00, image: "images/acai-grego.jpg" },
    { id: 3, name: "Açaí com Morango", price: 18.00, image: "images/acai-morango.jpg" },
];

const iceCreamItems = [
    { id: 4, name: "Sorvete de Baunilha", price: 10.00, image: "images/sorvete-baunilha.jpg" },
    { id: 5, name: "Sorvete de Chocolate", price: 12.00, image: "images/sorvete-chocolate.jpg" },
];

const additionalItems = [
    { id: 6, name: "Paçoca", price: 2.00, image: "images/adicional-pacoca.jpg" },
    { id: 7, name: "Banana", price: 3.00, image: "images/adicional-banana.jpg" },
    { id: 8, name: "Morango", price: 3.50, image: "images/adicional-morango.jpg" },
    { id: 9, name: "Chocolate em Calda", price: 2.50, image: "images/adicional-chocolate-calda.jpg" },
    { id: 10, name: "M&Ms", price: 4.00, image: "images/adicional-mms.jpg" },
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const acaiDiv = document.getElementById("acai-types");
    const iceCreamDiv = document.getElementById("ice-cream-types");
    const additionalDiv = document.getElementById("additional-toppings");
    const cartItemsUl = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");
    const modal = document.getElementById("checkout-modal");
    const closeButton = document.querySelector(".close-button");
    const checkoutForm = document.getElementById("checkout-form");
    const deliverySelect = document.getElementById("delivery");
    const addressField = document.getElementById("address-field");

    function renderMenu(items, container) {
        container.innerHTML = "";
        items.forEach(item => {
            const menuItemDiv = document.createElement("div");
            menuItemDiv.className = "menu-item";
            menuItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <span>R$ ${item.price.toFixed(2)}</span>
                </div>
                <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Adicionar</button>
            `;
            container.appendChild(menuItemDiv);
        });
    }

    function renderCart() {
        cartItemsUl.innerHTML = "";
        let totalPrice = 0;
        cart.forEach(item => {
            const cartItemLi = document.createElement("li");
            cartItemLi.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItemsUl.appendChild(cartItemLi);
            totalPrice += item.price;
        });
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }

    window.addToCart = function(id, name, price) {
        const item = { id, name, price };
        cart.push(item);
        renderCart();
    }

    checkoutButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    deliverySelect.addEventListener("change", (event) => {
        if (event.target.value === "delivery") {
            addressField.style.display = "block";
            document.getElementById("address").required = true;
        } else {
            addressField.style.display = "none";
            document.getElementById("address").required = false;
        }
    });

    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(checkoutForm);
        const orderDetails = {
            name: formData.get("name"),
            delivery: formData.get("delivery"),
            address: formData.get("address"),
            payment: formData.get("payment"),
            cart,
            total: totalPriceSpan.textContent,
        };
        console.log("Pedido Finalizado:", orderDetails);
        alert("Pedido Finalizado com Sucesso!");
        cart = [];
        renderCart();
        modal.style.display = "none";
    });

    renderMenu(acaiItems, acaiDiv);
    renderMenu(iceCreamItems, iceCreamDiv);
    renderMenu(additionalItems, additionalDiv);
});
