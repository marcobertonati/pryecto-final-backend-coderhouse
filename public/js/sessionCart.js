console.log("Session Cart working!");

function addQuantity(id) {
  let quantity = document.getElementById(id);
  let quantityNumber = Number(quantity.textContent);
  let value = quantityNumber + 1;
  quantity.textContent = value;
}

function restQuantity(id) {
  let quantity = document.getElementById(id);
  let quantityNumber = Number(quantity.textContent);
  if (quantityNumber <= 0) {
    quantity.textContent = 0;
  } else {
    let value = quantityNumber - 1;
    quantity.textContent = value;
  }
}

function addProducts() {
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

  fetch("/api/cart/post-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listOfProducts),
  }).then((data) => {
    location.replace("/carrito/vista");
  });
}
