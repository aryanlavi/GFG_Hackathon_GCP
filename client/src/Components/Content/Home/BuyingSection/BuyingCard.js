import React from "react";
import "./BuyingCard.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthorizationContext";

function Card({
  img_url,
  quantity,
  minQuantity,
  name,
  description,
  price,
  id,
}) {
  const [inputValue, setinputValue] = useState(minQuantity);
  const useAuth = useContext(AuthContext);

  const handleCart = async function () {
    if (!useAuth.currentUser) {
      alert("Please Login First");
      window.location.href = "/signin";
    }
    const resp = await fetch("http://localhost:8000/cart/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        email: useAuth.currentUser.email,
        inputValue,
      }),
    });

    const data = await resp.json();
    console.log(data.message);
    if (data.message === "success") {
      alert("Product Added to cart Succesfully");
    } else if(data.message === "already added") {
      alert("Product Already Added to cart");
    }
    else {
      alert("Error");
    }
  };

  return (
    <div className="home-product-card">
      <div class="product-card m-3">
        <div class="card card-div">
          <img src={img_url} class="card-img-top" alt="Product Image" />
          <div class="card-body">
            <div class="row px-3 pb-3">
              <div class="col-8 card-title-div">
                <h5 class="card-title float-start">
                  <b>{name}</b>
                </h5>
              </div>
              <div class="col-4 card-title-div right">
                <h6 class="card-title float-end">
                  <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i> {price}
                </h6>
              </div>
            </div>

            <div class="row px-3 card-content-div">{description}</div>

            <div class="row px-3">
              <div class="footer-btn col btn btn-outline-dark buy-left-btn">
                <div class="input-group">
                  <span class="input-group-btn">
                    <button
                      type="button"
                      class="btn btn-danger btn-number"
                      data-type="minus"
                      data-field="quant[2]"
                      onClick={() => {
                        setinputValue(
                          inputValue > minQuantity ? inputValue - 1 : inputValue
                        );
                      }}>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                  </span>
                  <input
                    type="text"
                    name="quant[2]"
                    class="form-control input-number input-quantity"
                    min="1"
                    max="100"
                    value={inputValue}
                  />
                  <span class="input-group-btn">
                    <button
                      type="button"
                      class="btn btn-success btn-number"
                      data-type="plus"
                      data-field="quant[2]"
                      onClick={() => {
                        setinputValue(
                          inputValue < quantity ? inputValue + 1 : inputValue
                        );
                      }}>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div
                class="footer-btn col btn btn-outline-success buy-right-btn"
                onClick={handleCart}>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
