
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Table from './components/Table/Table';

function App() {
  return (
      <Switch>
        <Route path="/" component={Table}/>
      </Switch>
  );
}

export default App;
