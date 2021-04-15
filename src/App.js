import Header from "./component/Header";
import Footer from "./component/Footer";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";
import About from "./component/About";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchData();
      setTasks(tasksFromServer);
    };

    getTask();
  }, []);

  //fetch
  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // fetch update id
  const fetchIdUpdat = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // delete
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // remaider
  const toggleRemainder = async (id) => {
    const taskToToggle = await fetchIdUpdat(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, reminder: data.reminder } : item
      )
    );
  };

  //add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleRemainder}
                />
              ) : (
                "No Tasks to Do"
              )}
            </>
          )}
        />
        <Route path="/" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
