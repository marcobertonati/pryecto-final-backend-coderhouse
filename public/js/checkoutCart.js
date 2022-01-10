console.log("Checkout Cart Working!");
const socket = io();

function addQuantity(id) {
  let quantity = document.getElementById(id);
  let quantityNumber = Number(quantity.textContent);
  let value = quantityNumber + 1;
  quantity.textContent = value;
  addProducts();
}

function restQuantity(id) {
  let quantity = document.getElementById(id);
  let quantityNumber = Number(quantity.textContent);

  if (quantityNumber <= 1) {
    let value = 0;
    quantity.textContent = value;
    addProducts();
    let productToBeRemoved = document.getElementById(`${id}-tr`);
    let parent = document.getElementById("tbody-products-on-cart");
    parent.removeChild(productToBeRemoved);
  } else {
    let value = quantityNumber - 1;
    quantity.textContent = value;
    addProducts();
  }
}

function buyCart() {
  const listOfProducts = [];
  const nodeListOfProducts = document.querySelectorAll(".quantity-product");
  const arrayOfProducts = Array.from(nodeListOfProducts);
  arrayOfProducts.forEach((product) => {
    if (Number(product.textContent) > 0) {
      listOfProducts.push({
        id: product.id,
        quantity: Number(product.textContent),
      });
    }
  });
  if (listOfProducts.length == 0) {
    alert("¡No hay productos en su carrito!");
  } else {
    alert("¡Pedido realizado!");
    fetch("/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listOfProducts),
    })
      .then((data) => {
        location.replace("/purchase-completed");
      })
      .catch((e) => console.log(e));
  }
}

function addProducts() {
  const listOfProducts = [];
  const nodeListOfProducts = document.querySelectorAll(".quantity-product");
  const arrayOfProducts = Array.from(nodeListOfProducts);
  arrayOfProducts.forEach((product) => {
    if (Number(product.textContent) >= 0) {
      listOfProducts.push({
        id: product.id,
        quantity: Number(product.textContent),
      });
    }
  });

  fetch("/api/cart/post-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listOfProducts),
  }).then((data) => {
    console.log("Petición realizada");
  });
}
