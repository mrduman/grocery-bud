import { useState } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmitItem = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleRemoveList = () => {
    setList([]);
  };

  const handleRemoveItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmitItem}>
        {alert.show && <Alert {...alert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} {...list} handleRemoveItem={handleRemoveItem} />
      </div>
      <button className="clear-btn" onClick={handleRemoveList}>
        Clear Items
      </button>
    </section>
  );
}

export default App;
