import  { useEffect, useState } from "react";
import axios from "axios";
import "./Taskmanager.css";

function Taskmanager() {
  const [user, setUsers] = useState([]);
  const [formdata, setformdata] = useState({ title: "", desc: "", id: "" });
  const [edit, setedit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/task/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      await axios.put(
        `http://localhost:1000/api/task/${formdata.id}`,
        formdata
      );
    } else {
      await axios.post("http://localhost:1000/api/task/", formdata);
    }
    fetchData();
    setedit(false);
    setformdata({ title: "", desc: "" });
  };

  const deletetask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/task/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editdata = (ele) => {
    setformdata({
      title: ele.title,
      desc: ele.desc,
      id: ele._id,
    });
    setedit(true);
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <form className="task-form" onSubmit={handlesubmit}>
        <input
          type="text"
          name="task"
          id="task"
          className="task-input"
          placeholder="Enter the name of task"
          onChange={(e) => {
            setformdata({ ...formdata, title: e.target.value });
          }}
          value={formdata.title}
        />
        <input
          type="text"
          name="desc"
          id="desc"
          className="task-input"
          placeholder="Enter the description"
          onChange={(e) => {
            setformdata({ ...formdata, desc: e.target.value });
          }}
          value={formdata.desc}
        />
        <button type="submit" className="task-button">
          Submit
        </button>
      </form>

      <div className="task-list">
        {user.map((ele) => (
          <div key={ele._id} className="task-item">
            <span className="task-title">{ele.title}</span> -
            <span className="task-desc">{ele.desc}</span>
            <button
              onClick={() => {
                deletetask(ele._id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                editdata(ele);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Taskmanager;
