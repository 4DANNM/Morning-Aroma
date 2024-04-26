const product = [
    {
        id: 0,
        image: 'image/latte.jpg',
        title: 'Caffe Latte',
        price: 49,
    },
    {
        id: 1,
        image: 'image/cappuccino.jpg',
        title: 'Caffee Cappuccino',
        price: 49,
    },
    {
        id: 2,
        image: 'image/espresso.jpg',
        title: 'Caffee Espresso',
        price: 49,
    },
    {
        id: 3,
        image: 'image/americano2.jpg',
        title: 'Caffee Americano',
        price: 59,
    },
    {
        id: 4,
        image: 'image/macchiato.jpg',
        title: 'Caffee Macchiato',
        price: 49,
    },
    {
        id: 5,
        image: 'image/mocha.jpg',
        title: 'Caffe Mocha',
        price: 49,
    },
    {
        id: 6,
        image: 'image/irish.jpg',
        title: 'Irish Caffee',
        price: 59,
    },
    {
        id: 7,
        image: 'image/turkish.jpg',
        title: 'Turkish Caffe',
        price: 59,
    },
    {
        id: 8,
        image: 'image/coldbrew.jpg',
        title: 'Cold Brew',
        price: 39,
    },
    {
        id: 9,
        image: 'image/barako.jpg',
        title: 'Kapeng Barako',
        price: 39,
    },
{
        id: 10,
        image: 'image/dalgona.jpg',
        title: 'Dalgona Coffee',
        price: 49,
    },
{
        id: 11,
        image: 'image/frap.jpg',
        title: 'Frappuccino',
        price: 59,
    },
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p style='font-size:30px; font-family:eurostyle;' >${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart = [];

function addtocart(a) {
    cart.push({...categories[a]});
    displaycart();
}

function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}

function displaycart() {
    let j = 0,
        total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            var {
                image,
                title,
                price
            } = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$ " + total + ".00";
            return (
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
                "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
            );
        }).join('');
    }
}

// Updated addtocart function to handle duplicate items
function addtocart(a) {
    const selectedItem = { ...categories[a] };
    const existingItemIndex = cart.findIndex(item => item.id === selectedItem.id);
    if (existingItemIndex !== -1) {
        // If item already exists in the cart, increment its quantity
        cart[existingItemIndex].quantity++;
    } else {
        // If item is not in the cart, add it with quantity 1
        selectedItem.quantity = 1;
        cart.push(selectedItem);
    }
    displaycart();
}

// Updated displaycart function to show quantity of items in the cart
function displaycart() {
    let total = 0;
    let itemsHTML = '';
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemsHTML += `
            <div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${item.image}>
                </div>
                <p style='font-size:12px;'>${item.title} (Quantity: ${item.quantity})</p>
                <h2 style='font-size: 15px;'>$ ${item.price * item.quantity}.00</h2>
                <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
            </div>`;
    });

    document.getElementById('cartItem').innerHTML = itemsHTML;

    document.getElementById("count").innerHTML = cart.length;
    document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
}

// Function to handle checkout process
function checkout() {
    // Check if cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
    }

    // Check if payment method is selected
    const paymentMethods = document.getElementsByName('payment');
    let paymentSelected = false;
    paymentMethods.forEach(method => {
        if (method.checked) {
            paymentSelected = true;
        }
    });
    if (!paymentSelected) {
        alert("Please select a payment method before proceeding to checkout.");
        return;
    }

    // Proceed with checkout
    // Calculate total price and display receipt
    const totalPrice = calculateTotalPrice();
    const shippingFee = 30;
    const taxRate = 0.1;
    const taxAmount = totalPrice * taxRate;
    const totalWithTaxAndShipping = totalPrice + shippingFee + taxAmount;
    const receiptHTML = `
        <div class="receipt">
            <h3>Receipt</h3>
            <div>Total Price: $${totalPrice.toFixed(2)}</div>
            <div>Shipping Fee: $${shippingFee.toFixed(2)}</div>
            <div>Tax: $${taxAmount.toFixed(2)}</div>
            <h2>Total Amount: $${totalWithTaxAndShipping.toFixed(2)}</h2>
        </div>`;
    document.getElementById("checkoutButton").insertAdjacentHTML("afterend", receiptHTML);
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;

}





