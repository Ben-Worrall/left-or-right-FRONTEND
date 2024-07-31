import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'
import { isEditable } from '@testing-library/user-event/dist/utils';
import { useNavigate } from "react-router-dom"




const LeaderboardHTML = () => {

    //getting form backend
  const [dataAR, setData] = useState(null)


    useEffect(() => {
      
        
        fetch('http://localhost:8081/api2')
        .then(res => res.json())
        .then(dataAR => setData(dataAR.message))
        .catch(err => console.log(err))

        
         
      }, []);



  var navigate = useNavigate()
    //get results
  function GetResults(){

    //hide buttons and get data
    document.getElementById('GetResultsButton').style.display = "none"
    document.getElementById('MainBody').style.display = ""

    //sort the array depending on the score
    dataAR.sort((a, b) => b.cur_score - a.cur_score)
    console.log(dataAR)

    //loop through and for every element append to main body
    for(let i = 0; i < dataAR.length; i++){
        
        let CurGirl = dataAR[i]
        console.log(i, CurGirl.full_name)

        //position
        let position = document.createElement('div')
        position.className = "Position"
        position.innerText = i+1
        //girl's name
        let name = document.createElement('div')
        name.className = "FullName-Girl"
        name.innerText = CurGirl.full_name
        //girl's score
        let score = document.createElement('div')
        score.className = "Score-Girl"
        score.innerText = CurGirl.cur_score

        //append them all
        document.getElementById('Position-Body').appendChild(position)
        document.getElementById('FullName-Body').appendChild(name)
        document.getElementById('Score-Body').appendChild(score)

        
    }





  }








   function Home(){
       navigate('/')
       window.location.reload()
   }

    return(
 
        <div id='Leaderboard-App'>
              
            <div id='SearchBar'>
               <div id='Left-NavBar'>
                   <input id='SearchBar-Input'  placeholder="Search.."></input>
                   <button type='submit' id='SubmitSearch'>🔍</button>
                  
               </div>

               <div id='Right-NavBar'>
                    <button id='Home' onClick={Home}>Home</button>
                    <button id='RefreshDB'>⟳</button>
               </div>
            </div>




             <div id='Leaderboard-Body'>

                <div id='StickyOverlayLB'>
                    <div id='Position-StickyOverlayLB'>Place</div>
                    <div id='FullName-StickyOverlayLB'>Full Name</div>
                    <div id='Score-StickyOverlayLB'>Score</div>
                </div>

                <div id='MainBody'>
                    <button id='GetResultsButton' onClick={GetResults}>Get Results</button>
                    <div id='Position-Body'>
                        
                    </div>
                    <div id='FullName-Body'>
                       

                    </div>
                    <div id='Score-Body'>
                       
                       

                    </div>
                
                </div>

             </div>


        </div>

    )
}

export default LeaderboardHTML