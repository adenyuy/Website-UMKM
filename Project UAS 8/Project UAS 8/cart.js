document.addEventListener('DOMContentLoaded', () => {
    const addtoCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const receiptModal = document.getElementById('receipt-modal');
    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total');
    const closeReceiptBtn = document.querySelector('.close-receipt');
    const closeReceiptBtnBottom = document.querySelector('.close-receipt-btn');

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    // Data structure to store item prices
    const itemPrices = {
        'Brownies A': 50000,
        'Brownies B': 70000,
        'Brownies C': 90000,
        'Onde Onde': 20000,
        'Kue Lumpur': 15000,
        'Pastel': 20000,
        'Kue Cucur': 20000,
        'Kue Ape': 15000,
        // 'Kue Ku': 30000,
    };

    let cartItems = [];
    let totalAmount = 0;

    addtoCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const itemName = document.querySelectorAll('.card .card-title')[index].textContent;
            const itemPrice = itemPrices[itemName];

            const item = {
                name: itemName,
                price: itemPrice,
                quantity: 1,
            };

            const existingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span> (${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price"> ${rupiah((item.price * item.quantity).toFixed(1))}</span>
                <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
            `;

            cartItemsList.append(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.closest('button').dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `${rupiah(totalAmount.toFixed(2))}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.remove('hidden');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        updateReceipt();
        receiptModal.style.display = 'block';
    });

    function updateReceipt() {
        receiptItems.innerHTML = '';
        cartItems.forEach(item => {
            const receiptItem = document.createElement('div');
            receiptItem.innerHTML = `
                <span> (${item.quantity}x) ${item.name} - ${rupiah((item.price * item.quantity).toFixed(1))}</span>
            `;
            receiptItems.append(receiptItem);
        });
        receiptTotal.textContent = `${rupiah(totalAmount.toFixed(2))}`;
    }

    closeReceiptBtn.addEventListener('click', () => {
        receiptModal.style.display = 'none';
    });

    closeReceiptBtnBottom.addEventListener('click', () => {
        receiptModal.style.display = 'none';
        return
    });
});
