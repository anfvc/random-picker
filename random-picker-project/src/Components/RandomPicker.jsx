import { useReducer, useState, useEffect } from "react";
import ItemList from "./ItemList";

// const initialState = [{ items: [], isPlaying: false }]; //{ id: 0, item: "" }

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
      };
    }
    case "PICK_GIF": {
      return { ...state, pickGif: handlePick(gifsArray) };
    }
  }

}

// const testArr = [];
// state.itemsArray.forEach((item) => testArr.push(item.item));

/* function randomItem(array) {
} */

function handlePick(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function RandomPicker() {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isPlaying) {
      const interval = setInterval(() => {
        dispatch({ type: "PICK" });
        dispatch({ type: "PICK_GIF" });
      }, 150);

      setTimeout(() => {
        clearInterval(interval);
        dispatch({ type: "PLAY" });
      }, 4000);
    }
  }, [state.isPlaying]);

  console.log(state);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handlePlay() {
    if (state.itemsArray.length < 2) {
      alert("You need to have 2 or more items, ok??");
    } else {
      dispatch({ type: "PLAY" });
    }
  }

  function reset() {}

  function handleSubmit(e) {
    e.preventDefault();

    if (input.length) {
      dispatch({ type: "ADD", payload: input });
      setInput("");
    } else {
      alert("Are you crazy?");
    }
  }

  //useEffect to send our items to localStorage

  useEffect(() => {
    const saveItems = localStorage.setItem(
      "items",
      JSON.stringify(state.itemsArray)
    );
  }, [state.itemsArray]);

  useEffect(() => {}, []);

  // console.log(state.pickedItem.item)

  return (
    <div className="conatiner">
      <h2>
        {state.pickedItem.item
          ? state.pickedItem.item
          : "Add Items and Pick One"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={input} placeholder="Add an item here!"/>
        <button type="submit">ADD</button>
      </form>
      <div className="btn-container">
        <button onClick={handlePlay} className="add-btn">
          PLAY
        </button>
        <button onClick={() => dispatch({ type: "RELOAD" })}>RESET</button>
      </div>

      <ul>
        {state.itemsArray?.map((obj) => {
          return (
            <div key={obj.id}>
              <li>{obj.item}</li>

              <button
                onClick={() => dispatch({ type: "DELETE", payload: obj.id })}
              >
                X
              </button>
            </div>
          );
        })}
      </ul>

      <div>
        {state.isPlaying ? <img src={state.pickGif} alt="" /> : ""}
        {/* {state.isPlaying ? <img src={state.gifsArray[0]} alt="" />  : ""} */}
      </div>
      {/* <ItemList
        state={state}
        dispatch={dispatch}
        input={input}
        setInput={setInput}
      /> */}
    </div>
  );
}

export default RandomPicker;
