import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ items, handleRemoveItem, handleEditItem }) {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>

            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEditItem(id)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => handleRemoveItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
