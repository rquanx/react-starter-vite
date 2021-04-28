import React from "react";

interface IErrorProps {
  errorMessage?: string;
}

export const Error: React.SFC<IErrorProps> = props => {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "25px",
        fontWeight: "bolder",
        marginTop: "100px"
      }}
    >
      {props.errorMessage && props.errorMessage.length > 1
        ? props.errorMessage
        : Error.defaultProps.errorMessage}
    </div>
  );
};

Error.defaultProps = {
  errorMessage: "页面崩溃，请及时联系相关技术人员解决"
};

export default Error;
