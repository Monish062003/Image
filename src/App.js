import logo from './logo.svg';
import Stable from './components/stable';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Popup from './components/popup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Stable/>}></Route>
          <Route path='/pop' element={<Popup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
