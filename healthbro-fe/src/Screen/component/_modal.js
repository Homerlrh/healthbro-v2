import React from "react";
import Modal from "react-modal";
import {
  BsFillPersonFill,
  BsFillClockFill,
  BsFillStarFill,
} from "react-icons/bs";
import { useContext } from "react/cjs/react.development";
import { AppContext } from "../../context/AuthContext";

//display recipe data in modal form
export default function _modal({ info, liked = false }) {
  //state for modal toggle
  const [modalIsOpen, setIsOpen] = React.useState(false);

  //context
  const { apiCaller } = useContext(AppContext);

  //custome modal css
  //take it out from App.scss coz it is easier to manage
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      borderRadius: 25,
    },
  };

  //title in the modal
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  //behavior when the modal component is opened
  function afterOpenModal() {
    subtitle.style.color = "#ff9900";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }

  //if the recipe info is not empty and instruction is attched then render component
  const instructions =
    info && info.analyzedInstructions[0] ? (
      info.analyzedInstructions[0].steps.map((ele, i) => (
        <div key={i}>
          <span>Step {ele.number}:</span>
          <p>{ele.step}</p>
        </div>
      ))
    ) : (
      <div>no instructions for this recipe yet</div>
    );

  //like or unlike the recipe
  const handleLike = async (id) => {
    const result = await apiCaller.post("/api/favouriteRecipe", {
      recipeId: id,
    });
    alert(result.data);
    window.location.reload();
  };

  //if the recipe info is not empty then return the component, until then component remain null
  return info ? (
    <div style={{ display: "flex" }}>
      <button onClick={openModal} className="viewRecipe">
        View More
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="recipeTitle">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{info.title}</h2>
          <div>
            <span style={{ marginRight: 10 }}>
              <BsFillPersonFill size={30} />
              {info.servings}
            </span>
            <span>
              <BsFillClockFill size={30} />
              {info.readyInMinutes}
            </span>
            <span style={{ color: liked === true ? "#ff9900" : "" }}>
              <BsFillStarFill
                className="likedButton"
                onClick={() => handleLike(info.id)}
                size={30}
              />
            </span>
          </div>
        </div>
        <div className="dietaryTag">
          <h2>Dietary Option: </h2>
          <section className="tags">
            {info.diets.map((ele, i) => (
              <p key={i}>{ele}</p>
            ))}
          </section>
        </div>
        <div className="recipeSummary">
          <img className="recipeImage" src={info.image} alt="recipeImage" />
          <p dangerouslySetInnerHTML={{ __html: info.summary }}></p>
        </div>

        <div className="recpieInstruction">
          <h2>Instructions</h2>
          {instructions}
        </div>
        <button className="modalClose" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  ) : (
    <></>
  );
}

/**
 * Left to-do:
 * custom css for dietarty option tag
 * custom css for instruction step
 * css for the modal to fit the design
 */
