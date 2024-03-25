import { Link } from "react-router-dom";
import { useCartDispatch } from "../../store/hook";
import { setActiveOption, clearCartData } from "../../store/cart-slice";
import {persist} from '../../App'

function CartPayment() {
  const dispatch = useCartDispatch();

  const handleHome = () => {
    localStorage.removeItem("address_form");
    dispatch(setActiveOption("Items"));
    dispatch(clearCartData())
    // persist.pause(); //if we pause it, then we wont be able to add data in local storage after clearing it.
    persist.flush().then(() => {return persist.purge()}) // it will delete the whole key value pair from local storage.
    // persist.flush()
  };

  return (
    <div className="cartPayment_container">
      <div className="cartPayment_Para">
        This application does not integrated with payment section
      </div>
      <Link to="/" onClick={handleHome} className="cart_home_btn">
        Home
      </Link>
     
    </div>
  );
}

export default CartPayment;
