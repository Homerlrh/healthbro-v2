import React from "react";
import Modal from "react-modal";
import { BsFillPersonFill, BsFillClockFill } from "react-icons/bs";

//display recipe data in modal form
export default function _modal({ info }) {
  //state for modal toggle
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
        <div>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{info.title}</h2>
          <span style={{ marginRight: 10 }}>
            <BsFillPersonFill size={30} />
            {info.servings}
          </span>
          <span>
            <BsFillClockFill size={30} />
            {info.readyInMinutes}
          </span>
        </div>
        <div>
          <label>Dietary Option</label>
          {info.diets.map((ele, i) => (
            <div key={i}>{ele}</div>
          ))}
        </div>
        <div>
          <div>
            <img width="100px" src={info.image} alt="recipeImage" />
            <p dangerouslySetInnerHTML={{ __html: info.summary }}></p>
          </div>
        </div>
        <div>
          <h2>instructions</h2>
          {instructions}
        </div>
        <button onClick={closeModal}>close</button>
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
