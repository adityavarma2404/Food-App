import { useRef, useState } from "react";
import jsonItems from "../json/menu.json";
import { menuListItems } from "./homePage/Menu";

//we are passing parameter as ...args becase we dont know how many parameters are gonna pass from callback function(onSearchQueryChange()). 'args' implicitly has an 'any[]' type
// function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   delay: number
// ): T {
//   //   typeof setTimeout: This expression evaluates to the type of the setTimeout function itself. It doesn't call the function, but rather gets its type information. ReturnType<typeof setTimeout>: This is a generic utility type provided by TypeScript. It takes the type of a function (typeof setTimeout in this case) and returns the type of the value that the function returns.
//   let timeoutId: ReturnType<typeof setTimeout>;

//   return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   } as T;
// }

//here we are returning arrow function, so return type is declared as '(...args: any[]) => void'
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

function Search() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isNoItemsFound, setIsNoItemsFound] = useState<boolean>(false);
  const [resultItems, setResultItems] = useState<menuListItems>([]);

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

  // const debouncedOnSearchQueryChange = debounce(onSearchQueryChange, 1000);
  const debouncedOnSearchChange = debounceSearch(onSearchQueryChange, 1000);

  const handleSearchInput = () => {
    const val: string = searchRef.current!.value;
    debouncedOnSearchChange(val);
  };

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
                        <button className="menu_item_details2_button">
                          Add
                        </button>
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
