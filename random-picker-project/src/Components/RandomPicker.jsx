import { useReducer, useState, useEffect } from "react";
import ItemList from "./ItemList";
import Modal from "./Modal";

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
        pickedItem: gifsArray[0],
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

function RandomPicker() {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);



  useEffect(() => {
    if (state.isPlaying) {
      const interval = setInterval(() => {
        dispatch({ type: "PICK" });
        dispatch({ type: "PICK_GIF" });
      }, 60);

      setTimeout(() => {
        clearInterval(interval);
        dispatch({ type: "PLAY" });
      }, 2000);
    }
  }, [state.isPlaying]);

  console.log(state);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handlePlay() {
    if (state.itemsArray.length < 2) {
      <Modal />
      alert("You need to have 2 or more items, ok??");
    } else {
      dispatch({ type: "PLAY" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const duplicate = state.itemsArray.find((obj) => obj.item === input);

    if (duplicate) {

      alert("This item already exists.");
      setInput("")
      return;
    }
    if (input) {
      dispatch({ type: "ADD", payload: input });
      setInput("");
    } else {
      alert("You crazy?");
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
    <div className="container">
      <h2>
        {state.pickedItem.item
          ? state.pickedItem.item
          : "Add Items and Pick One"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={input}
          placeholder="Add an item here!"
        />
        <button type="submit">ADD</button>
      </form>
      <div className="btn-container">
        <button onClick={handlePlay} className="add-btn" disabled={state.isPlaying}>
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
        {state.pickGif ? <img src={state.pickGif} alt="" /> : ""}
      </div>
      {/* {error.open && <Modal />} */}

    </div>
  );
}

export default RandomPicker;
