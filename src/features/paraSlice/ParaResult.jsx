import React, { useState, useMemo, useEffect } from "react";
import HightLight from "react-syntax-highlighter";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "../../components/utils/Modal";
import deriveStyles from "../../lib/deriveStyles";

const ParaResult = () => {
  const { styles } = useSelector((state) => state.para);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const copyToClipboard = () => {
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(resultStyles);
    handleCloseModal();
  };

  const resultStyles = useMemo(() => {
    let derivedStyles = deriveStyles(styles);

    // turn the object key value pairs into a CSS ruleset
    let result = ".para {\n";
    for (let key in derivedStyles) {
      result += `    ${key}: ${derivedStyles[key]};\n`;
    }
    result += "}";
    return result;
  }, [styles]);

  useEffect(() => {
    let stylesElement = document.getElementById("para-generated-styles");
    stylesElement.innerHTML = resultStyles;
  }, [resultStyles]);

  return (
    <>
      <div className="overlflow-auto mx-6">
        <div className="overflow-auto max-w-lg px-12 min-w-[400px] min-h-[250px] grid place-items-center bg-gray-100">
          <p className="para ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            suscipit, commodi dolores unde dolorem aspernatur nemo ad animi
            aliquam temporibus! Excepturi aliquam vitae maiores delectus
            aspernatur nesciunt impedi.
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="absolute top-8 right-8 px-10 py-3 text-white font-bold rounded-md bg-blue-500"
        >
          Get CSS
        </button>
        <h2 className="absolute top-8 left-1/2 translate-x-8 font-bold  ">
          Paragraph Editor
        </h2>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="bg-[#011627] p-8">
            <HightLight language="css" wrapLongLines={true} style={nightOwl}>
              {resultStyles}
            </HightLight>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-blue-500 py-3  mt-6 rounded text-white font-bold"
          >
            Copy to clipboard
          </button>
        </Modal>
      )}

      {createPortal(
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
        />,
        document.getElementById("toast")
      )}
    </>
  );
};

export default ParaResult;
