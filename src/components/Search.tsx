import { useEffect, useRef, useState } from "react";
import jsonItems from "../json/menu.json";
import { menuListItems, menuListItem } from "./homePage/Menu";
import { addTocart, removefromCart } from "../store/cart-slice";
import { useCartDispatch, useCartSelector } from "../store/hook";

function debounceSearch(
  cb: (...args: any[]) => void,
  delay: number
): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

type cartItemsAddedList = string[];

function Search() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isNoItemsFound, setIsNoItemsFound] = useState<boolean>(false);
  const [resultItems, setResultItems] = useState<menuListItems>([]);
  const cartItems = useCartSelector((state) => state.cart.items);
  const [cartItemsAddedList, setCartItemsAddedList] =
    useState<cartItemsAddedList>([]);

  const dispatch = useCartDispatch();

  function onSearchQueryChange(val: string) {
    // Perform search operation here
    const arr: menuListItems = [];
    val.trim().length !== 0 &&
      Object.values(jsonItems).forEach((value) => {
        const filteredItems = value.filter((item) => {
          const words = item.item.toLowerCase().split(/\s+/);
          return words.some(
            (word) => word.startsWith(val.toLowerCase()) && item
          );
        });
        arr.push(...filteredItems);
      });

    if (arr.length === 0) {
      val.trim().length === 0
        ? setIsNoItemsFound(false)
        : setIsNoItemsFound(true);

      setResultItems(arr);
    } else {
      setIsNoItemsFound(false);
      setResultItems(arr);
    }
  }

  const debouncedOnSearchChange = debounceSearch(onSearchQueryChange, 1000);

  const handleSearchInput = () => {
    const val: string = searchRef.current!.value;
    debouncedOnSearchChange(val);
  };

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
    <div className="search_container_body">
      <div className="custom_section_dummy_div"></div>
      <div className="search_container mt-5">
        <input
          name="search"
          ref={searchRef}
          onChange={handleSearchInput}
          className="searchBar"
          type="text"
          placeholder="search for a item"
        />
        <div className="search_container_items">
          {resultItems.length > 0 && (
            <ul className="menu_item_container mt-3">
              {resultItems.map((each) => {
                return (
                  <li
                    key={each.item}
                    className="menu_item search_container_item"
                  >
                    <img className="menu_item_image" src={each.image} />

                    <div className="pt-3">
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
                      <div className="menu_item_description search_container_desc mt-2">
                        {each.description}
                      </div>
                      <div className="menu_item_details2 mt-2 mb-3">
                        <span className="menu_item_details2_price">
                          ₹ {each.price}
                        </span>
                        {cartItemsAddedList.includes(each.item) ? (
                          <div className="menu_item_button_container">
                            <button
                              onClick={() => handleRemoveButton(each.item)}
                            >
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
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {isNoItemsFound && (
            <div className="search_itemNotFound_container">
              <img
                className="search_itemNotFound_img mb-3"
                src="https://des5nqelydebj.cloudfront.net/20240219173707/assets/images/empty_cart.svg"
              />
              No Items Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
