import { useContext } from "react";
import CartContext from "../context/CartContext";

import { UseCartContextType } from "../context/CartContext";

const useCart = (): UseCartContextType => {
  return useContext(CartContext)
}

export default useCart