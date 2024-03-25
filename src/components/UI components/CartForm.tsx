import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import CustomError from "./CustomError";
import { useCartDispatch } from "../../store/hook";
import { setActiveOption } from "../../store/cart-slice";
import { Persist } from "formik-persist";

type initialVal = {
  name: string;
  mobile: string;
  email: string;
  plot: string;
  street: string;
  landmark: string;
  city: string;
};

const initialValues = {
  name: "",
  mobile: "",
  email: "",
  plot: "",
  street: "",
  landmark: "",
  city: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required*"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits*")
    .required("Required*"),
  email: yup.string().email("Invalid Email*"),
  plot: yup.string().required("Required*"),
  street: yup.string().required("Required*"),
  landmark: yup.string().required("Required*"),
  city: yup.string().required("Required*"),
});

function CartForm() {
  const dispatch = useCartDispatch();

  //<initialVal> represents the type of your form values.
  const onSubmit = (
    values: initialVal,
    submitProps: FormikHelpers<initialVal>
  ) => {
    console.log(values);
    submitProps.resetForm();
    dispatch(setActiveOption("Payment"));
  };

  function handleBackBtn() {
    dispatch(setActiveOption("Items"));
  }

  return (
    <>
      <h3 className="mb-4">Details</h3>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <form className="cartForm_form" onSubmit={formik.handleSubmit}>
              <div className="cartForm_field">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component={CustomError} />
              </div>
              <div className="cartForm_field">
                <label htmlFor="mobile">Mobile</label>
                <Field type="text" id="mobile" name="mobile" />
                <ErrorMessage name="mobile" component={CustomError} />
              </div>
              <div className="cartForm_field">
                <label htmlFor="email">Email (optional)</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage name="email" component={CustomError} />
              </div>
              <div className="cartForm_address_heading">
                <h4 className="mt-4 mb-3">Address: </h4>
              </div>
              <div className="cartForm_address_container">
                <div className="cartForm_address">
                  <div className="cartForm_field">
                    <label htmlFor="plot">Plot/Road No</label>
                    <Field type="text" id="plot" name="plot" />
                    <ErrorMessage name="plot" component={CustomError} />
                  </div>
                  <div className="cartForm_field">
                    <label htmlFor="street">Street</label>
                    <Field type="text" id="streen" name="street" />
                    <ErrorMessage name="street" component={CustomError} />
                  </div>
                </div>
                <div className="cartForm_address">
                  <div className="cartForm_field">
                    <label htmlFor="landmark">Landmark</label>
                    <Field type="text" id="landmark" name="landmark" />
                    <ErrorMessage name="landmark" component={CustomError} />
                  </div>
                  <div className="cartForm_field">
                    <label htmlFor="city">City</label>
                    <Field type="text" id="city" name="city" />
                    <ErrorMessage name="city" component={CustomError} />
                  </div>
                </div>
              </div>
              <div className="cartForm_btn_container">
                <button
                  className="cart_home_btn cartForm_checkout_btn"
                  type="submit"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={handleBackBtn}
                  className="cart_home_btn cartForm_checkout_btn"
                >
                  Back
                </button>
              </div>
              <Persist name="address_form" />
            </form>
          );
        }}
      </Formik>
    </>
  );
}

export default CartForm;
