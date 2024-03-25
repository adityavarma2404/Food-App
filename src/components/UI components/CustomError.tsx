import { ReactNode, FC } from "react";

type customErrorProps = {
  children?: ReactNode;
};

const CustomError: FC<customErrorProps> = (props) => {
    return <div className="cartForm_errorText mt-1">{props.children}</div>;
  };
export default CustomError 