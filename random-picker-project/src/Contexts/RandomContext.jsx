import { createContext } from "react";
import { useReducer, useState } from "react";

export const RandomContext = createContext();

const gifsArray = [
  "https://media.giphy.com/media/pWO49XP9L7TxbgQVib/giphy.gif",
  "https://media.giphy.com/media/rrmf3fICPZWg1MMXOW/giphy.gif",
  "https://media.giphy.com/media/zzC5Z2igqssYgunRuW/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FvOGswMzMyZDF1aTZxeWl5aDR1bWZ6dThvM2NpdDRoYnA0dzA2OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bEVKYB487Lqxy/giphy.gif",
];

const initialState = {
  isPlaying: false,
  itemsArray: JSON.parse(localStorage.getItem("items")) || [],
  pickedItem: {},
  pickGif: gifsArray[0],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        itemsArray: [
          ...state.itemsArray,
          { item: action.payload, id: Date.now() },
        ],
      };
    }
    case "DELETE": {
      const filtered = state.itemsArray.filter((x) => x.id !== action.payload);

      return { ...state, itemsArray: filtered };
    }
    case "PLAY": {
      return { ...state, isPlaying: !state.isPlaying };
    }
    case "PICK": {
      return {
        ...state,
        pickedItem: handlePick(state.itemsArray),
      };
    }
    case "RELOAD": {
      return {
        isPlaying: false,
        itemsArray: [],
        pickedItem: {},
        pickGif: gifsArray[0],
      };
    }
    case "PICK_GIF": {
      return { ...state, pickGif: handlePick(gifsArray) };
    }
  }
}

function handlePick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function RandomContextProvider({ children }) {
  const [error, setError] = useState({ content: "", open: false });
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handlePlay() {
    if (state.itemsArray.length < 2) {
      setError({
        open: true,
        content: "You need to have 2 or more items, ok?",
      });
    } else {
      dispatch({ type: "PLAY" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const duplicate = state.itemsArray.find((obj) => obj.item === input);

    if (duplicate) { //if item duplicated, alert!
      setError({ open: true, content: "This item already exists." });
    } else if (!input) { //if input empty, alert!
      setError({ open: true, content: "You need to type something." });
    } else {
      dispatch({ type: "ADD", payload: input });
    }
    setInput("");
  }

  return (
    <RandomContext.Provider
      value={{
        setError,
        error,
        state,
        handleSubmit,
        handleChange,
        handlePlay,
        dispatch,
        setError,
      }}
    >
      {children}
    </RandomContext.Provider>
  );
}

export default RandomContextProvider;
