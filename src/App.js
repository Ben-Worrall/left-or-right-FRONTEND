import {  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";

  import AppHTML from "./Home";
  import GameHTML from "./Game/Game";

function App() {
  
  return (
    <Router>
       <div className="App">
        <Routes>

          <Route exact path='/' element={<AppHTML/>} />
          <Route exact path='/Game/Game' element={<GameHTML/>} />
         
          

        </Routes>
        </div>

    </Router>
      
    
  );
}


 

 export default App;


