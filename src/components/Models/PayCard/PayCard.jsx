import React from "react";
import Styles from "./PayCardStyle";
import { Form, Field } from "react-final-form";
import Card from "./Card.js";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./CardUtlis";
import { useNavigate } from "react-router-dom";
import "../PayCard/Card.css";
import { useCart } from "../../contexts/cartContext";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

export default function PayCard  () {
  const navigate = useNavigate();
  const { cart , getCart} = useCart();

  console.log(cart);

  React.useEffect(() => {
    getCart();
  }, []);

  const cartCleaner = () => {
    localStorage.removeItem("cart");
    getCart();
  };
  return (
    <Styles>
      <form
        className="Form_card"
        style={{
          display: "flex",
          margin: "100px auto",
          flexDirection: "column",
        }}
      >
        <h3 style={{display: "flex",flexDirection: "column" , alignItems: "center", color: "white"}}>Форма заказа</h3>
        <div>
          <input type="text" name="email" placeholder="Почта (Emali)" />
        </div>
        <div>
          
          <input type="text" name="number" placeholder="Номер телефона" />
        </div>
        <div>
          <input type="text" name="adress" placeholder="Адрес" />
        </div>
        <div style={{display: "flex",flexDirection: "column" , alignItems: "center"}}>
          <h5 style={{color: "white"}}>Общая cумма</h5>
          <p style={{color: "black", backgroundColor: "white", fontSize: "35px", borderRadius: "5%"}}>{cart.totalPrice} ₽</p>
        </div>
      </form>
      <Form
        className="Form_card"
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                margin: "100px auto",
                flexDirection: "column",
              }}
            >
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={() => {
                    navigate(`/cart`);
                    cartCleaner();
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          );
        }}
      />
    </Styles>
  );
};
