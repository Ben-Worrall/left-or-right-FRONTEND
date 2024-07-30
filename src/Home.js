import logo from './logo.svg';
import './App.css';
import { useNavigate } from "react-router-dom"


const AppHTML = () => {

  const navigate = useNavigate()


  

    function StartGame(){
      navigate('/Game/Game')
      window.location.reload()
    }
    function Leaderboard(){
      navigate('/Leaderboard/Leaderboard')
      window.location.reload()
    }


  



  return (
    <div className="App">
      

      <div id='Leaderboard'>
        <button id='LeaderboardButton' onClick={Leaderboard}>Leaderboard</button>
      </div>


      <div id='StartDiv'>
        <button id='StartButton' onClick={StartGame}>
          Start
        </button>

      </div>




    </div>
  );
}

export default AppHTML;