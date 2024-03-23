import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useCartSelector } from "../store/hook";
import { useRef } from "react";

function Header() {
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const hiddenNavRef = useRef<HTMLDivElement>(null);

  const cartQuantity = useCartSelector((state) =>
    state.cart.items.reduce((val, item) => val + item.quantity, 0)
  );

  const handleNavBar = () => {
    hamburgerRef.current?.classList.toggle("activeBar");
    hiddenNavRef.current?.classList.toggle("visible_header");
  };
  const navOptions = () => {
    return (
      <>
        <Link to="/search" className="header_option">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-search mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          Search
        </Link>

        <Link to="/help" className="header_option">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-info-circle mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>{" "}
          Help
        </Link>

        <Link to="/cart" className="header_option">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22 "
            height="22  "
            fill="currentColor"
            className="bi bi-cart3 mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          cart {cartQuantity}
        </Link>
      </>
    );
  };

  return (
    <header className="header">
      <div>
        <Link to="/">
          <img className="header_logo" src={logo} />
        </Link>
      </div>
      <div className="header_options">{navOptions()}</div>
      <button ref={hamburgerRef} onClick={handleNavBar} className="hamburger">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div ref={hiddenNavRef} className="hidden_header">
        {navOptions()}
      </div>
    </header>
  );
}

export default Header;
