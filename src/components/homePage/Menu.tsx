import items from "../../json/menu.json";
import { useEffect, useState } from "react";
import { sideOptions } from "../../json/sideMenu.json";
import { addTocart } from "../../store/cart-slice";
import { removefromCart } from "../../store/cart-slice";
import { useCartDispatch } from "../../store/hook";
import { useCartSelector } from "../../store/hook";

export type menuListItem = {
  description: string;
  image: string;
  item: string;
  price: number;
  type: string;
};
export type menuListItems = menuListItem[];
type cartItemsAddedList = string[];

function Menu() {
  const [menuSelected, setMenuSelected] = useState<string>("mini_meals");
  const cartItems = useCartSelector((state) => state.cart.items);
  const [cartItemsAddedList, setCartItemsAddedList] =
  useState<cartItemsAddedList>([]);
  const [activeButtonIndex, setActiveButtonIndex] =
  useState<string>("mini_meals");
  const menuItems: menuListItems | undefined =
  items[menuSelected as keyof typeof items];
  // as keyof typeof items: Asserts the type of menuSelected to be the same as the type of the keys (property names) of the items object.

  const dispatch = useCartDispatch();
  
  function handleAddButton(item: menuListItem) {
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
    cartItems.map((each) => {
      if (each.item === item) {
        result = each.quantity;
      }
    });
    return result;
  }

  useEffect(() => {
    const filteredCartItems = cartItems.filter((item) => item.quantity > 0);
    setCartItemsAddedList(filteredCartItems.map((item) => item.item));
  }, [cartItems]);
  
  return (
    <section className="menu_container">
      <div className="menu_sub_container mt-5">
        <aside className="menu_aside">
          <h3>Menu</h3>

          <ul className="mt-4 menu_list">
            {sideOptions.map((each) => {
              return (
                <li
                  key={each.menuValue}
                  className={`mb-4 ${
                    activeButtonIndex === each.menuValue && "menu_button_active"
                  }`}
                >
                  <button
                    onClick={() => {
                      setMenuSelected(each.menuValue);
                      setActiveButtonIndex(each.menuValue);
                    }}
                    className="menu_button"
                  >
                    <img src={each.url} width={40} height={40} /> <br />
                    {each.menuName}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
        <section className="menu_section">
          <h1>Items</h1>
          <ul className="menu_item_container mt-3">
            {menuItems !== undefined ? (
              menuItems.map((each) => {
                return (
                  <li key={each.item} className="menu_item pb-3">
                    <img className="menu_item_image" src={each.image} />
                    <div className="menu_item_details1">
                      <div
                        className={`menu_item_type_border ${
                          each.type === "nonveg" && "nonVeg"
                        }`}
                      >
                        <div></div>
                      </div>
                      <div className="menu_item_name">{each.item}</div>
                    </div>
                    <div className="menu_item_description mt-2">
                      {each.description}
                    </div>
                    <div className="menu_item_details2">
                      <span className="menu_item_details2_price">
                        ₹ {each.price}
                      </span>

                      {cartItemsAddedList.includes(each.item) ? (
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
                      ) : (
                        <button
                          onClick={() => handleAddButton(each)}
                          className="menu_item_details2_button"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </li>
                );
              })
            ) : (
              <div>
                <div>
                  Sorry, Please checkout only Mini meals, Desi Box, Dum Biryani,
                  Main Course
                </div>
              </div>
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Menu;
