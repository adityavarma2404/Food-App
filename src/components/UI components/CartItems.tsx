import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { useCartSelector, useCartDispatch } from "../../store/hook";
import { addTocart, removefromCart, setActiveOption } from "../../store/cart-slice";

type cartItems = {
    item: string;
    price: number;
    type: string;
  };
  

function CartItems() {
  const cart = useCartSelector((state) => state.cart.items);
  const cartTotal = cart.reduce((val, each) => val + (each.price* each.quantity),0)
  const dispatch = useCartDispatch();


  function handleAddButton(item: cartItems) {
    const props = {
      item: item.item,
      type: item.type,
      price: item.price,
    };
    dispatch(addTocart(props));
  }
  function handleRemoveButton(item: string) {
    const props = item;
    dispatch(removefromCart(props));
  }

  function findQuantity(item: string): number {
    let result = 0;
    cart.map((each) => {
      if (each.item === item) {
        result = each.quantity;
      }
    });
    // console.log("result", result);
    return result;
  }

  function handleProceed() {
    dispatch(setActiveOption('Details'))
  }

  return (
    <>
      <h3 className="mb-5">Cart</h3>
      {cart.length === 0 ? (
        <>
          <img
          className="cart_empty_image"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt="empty cart"
          />
          <h4 className="mt-4">Your cart is empty</h4>
          <h5 className="cartItem_h5 mt-2">Go to home page to add our tastiest dishes</h5>
          <Link to="/" className="cart_home_btn mt-4">
            Home
          </Link>
        </>
      ) : (
        <>
          <Accordion className="cart_accordion mb-5">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Total price - ₹ {cartTotal}</Accordion.Header>
              <Accordion.Body>
                <div className="cart_items_container">
                  {cart.map((each) => (
                    <div
                      key={each.item}
                      className="cart_items_subcontainer mb-4"
                    >
                      <div className="cartItems_name_price">
                        <h5 className="cartItems_font">{each.item}</h5>
                        <h5 className="cartItems_font">₹ {each.price}</h5>
                      </div>
                      <div>
                        <h5>--- {each.type} ---</h5>
                        <div className="menu_item_button_container">
                          <button onClick={() => handleRemoveButton(each.item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-dash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                            </svg>
                          </button>
                          <span>{findQuantity(each.item)}</span>
                          <button onClick={() => handleAddButton(each)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <div className="cart_items_container">
                {cart.map((each) => (
                  <div key={each.item} className="cart_items_subcontainer mb-4">
                    <div className="cart_items_div">
                      <h5>{each.item}</h5>
                      <h5>₹ {each.price}</h5>
                    </div>
                    <div>
                      <h5>--- {each.type} ---</h5>
                      <div className="menu_item_button_container">
                        <button onClick={() => handleRemoveButton(each.item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>
                        </button>
                        <span>{findQuantity(each.item)}</span>
                        <button onClick={() => handleAddButton(each)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
          <div className="cart_items_checkout_container">
            <Link to="/" className="cart_home_btn">
              Home
            </Link>
            <button onClick={handleProceed} className="cart_home_btn">
              Proceed
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CartItems;
