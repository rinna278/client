import React from "react";

const PrimaryButton = ({ title,isButtonDisabled=false ,action='',type}) => {

  return (
    <button type={type} onClick={action} disabled={isButtonDisabled} className={`${isButtonDisabled ? 'bg-#EAEAEA text-#807D7E': 'active:bg-#6620C1 bg-#8A33FD text-white'}   rounded-lg py-3 px-5 font-medium text-lg`}>
      {title}
    </button>
  );
};

export default PrimaryButton;
