import CartItems from "./UI components/CartItems";
import { useCartSelector } from "../store/hook";
import CartForm from "./UI components/CartForm";
import CartPayment from "./UI components/CartPayment";

function Cart() {
  const sidePaths = ["Items","Details","Payment"]
  const activeOp = useCartSelector(state => state.cart.activeOption)

  return (
    <div className="cart_container_body">
      <div className="custom_section_dummy_div"></div>
      <div className="cart_container mt-5 mb-5">
        <ul className="cart_side_section">
          {sidePaths.map(each => each === activeOp ? <li className="cart_side_options active" key={each}>{each}</li>: <li className="cart_side_options" key={each}>{each}</li>)}
        </ul>
        <div className="cart_items">
          {activeOp === "Items" && <CartItems />}
          {activeOp === "Details" && <CartForm />}
          {activeOp === "Payment" && <CartPayment />}
        </div>
      </div>
    </div>
  );
}

export default Cart;
