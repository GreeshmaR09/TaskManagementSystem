import logo from './logo.svg';
import './App.css';
import TaskList from './Components/TaskList';
import TaskDetails from './Components/TaskDetails';
import TaskCreation from './Components/TaskCreation';

function App() {
  return (
    <div className='mainContainer'>
  <TaskList/>
  <TaskCreation/>
    </div>
  );
}

export default App;
