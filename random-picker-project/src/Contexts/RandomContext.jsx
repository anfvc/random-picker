import { createContext } from "react";

export const RandomContext = createContext();


function RandomContextProvider({children}) {
  return (
    <RandomContext.Provider>
      {children}
    </RandomContext.Provider>
  )
}

export default RandomContextProvider;
