import React from 'react'

const SecondaryButton = ({title ,isButtonDisabled=false,action=''}) => {
  return (
    <button onClick={action} disabled={isButtonDisabled} className={`${isButtonDisabled ? 'bg-#EAEAEA text-#807D7E': 'active:border-#8A33FD hover:bg-#F6F6F6 text-#8A33FD border-2 border-#3C4242'} py-3  px-5  rounded-lg font-medium text-lg text-center `}>
      <p>{title}</p>
    </button>
  )
}

export default SecondaryButton