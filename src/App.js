import './App.css';
import Modal from './modal';
import Dashboard from './dashboard_logo';
import AppBar from './appbar';
import MyCalendar from './calendar';

function App() {
  return (
    <div id='body'>
      <div className='container'>
        <div className='logo'>
          <Dashboard />
          <AppBar />
        </div>
        <div className='content'>
          <MyCalendar className='calendar' />
        </div>
      </div>
    </div>
  );
}

export default App;
