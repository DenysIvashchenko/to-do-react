import Header from './component/Header'
import Tasks from './component/Tasks'
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
      "reminder": true
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
    console.log('del', id)
  }
  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
