import Header from './component/Header'
import Tasks from './component/Tasks'
import AddTask from './component/AddTask'
import { useState } from "react"

function App() {
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Learn ReactJs",
      "day": "Feb 6th at 1:30pm",
      "reminder": false
    },
    {
      "id": 3,
      "text": "learn English",
      "day": "Feb 6th at 1:30pm",
      "reminder": true
    }
  ])
  // delete
  const deleteTask = id => {
    setTasks(tasks.filter(item => item.id !== id))
  }
  // remaider
  const toggleRemainder = id => {
    setTasks(tasks.map(item => item.id === id ? { ...item, reminder: !item.reminder } : item))
  }
  return (
    <div className="container">
      <Header />
      <AddTask />
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemainder} />) : ('no tasks')}
    </div>
  );
}

export default App;
