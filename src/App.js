import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [istEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmitItem = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && istEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setAlert({ show: true, msg: "Item added", type: "success" });
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleRemoveList = () => {
    setList([]);
    setAlert({ show: true, msg: "List removed", type: "danger" });
  };

  const handleRemoveItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setAlert({ show: true, msg: "Item removed", type: "danger" });
  };

  const handleEditItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setIsEditing(true);
    setEditId(id);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmitItem}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className="submit-btn" type="submit">
            {istEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List
          items={list}
          {...list}
          handleRemoveItem={handleRemoveItem}
          handleEditItem={handleEditItem}
        />
      </div>
      <button className="clear-btn" onClick={handleRemoveList}>
        Clear Items
      </button>
    </section>
  );
}

export default App;
