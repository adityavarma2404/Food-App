import { Link } from "react-router-dom";

function HeaderHelp() {
  return (
    <div className="headerHelp_container">
      <div className="headerHelp_content">
        <div className="headerHelp_closeBtn_container mb-3">
          <Link to="/" className="headerHelp_closeBtn me-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </Link>
        </div>
        <h5 className="headerHelp_headings">Customer Support</h5>
        <p>
          Our customer experience team is available all days from 9am to 12.00am
          to assist you with any questions or issues you might have.
        </p>
        <div>
          <h5 className="headerHelp_headings">Email us</h5>
          <p>order@feasthub.com</p>
        </div>
        <div>
          <h5 className="headerHelp_headings">Call us</h5>
          <p>080-1605-1512</p>
        </div>
      </div>
    </div>
  );
}

export default HeaderHelp;
