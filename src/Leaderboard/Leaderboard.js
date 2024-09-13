import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'
import { isEditable } from '@testing-library/user-event/dist/utils';
import { useNavigate } from "react-router-dom"




const LeaderboardHTML = () => {

    //getting form backend
  const [dataAR, setData] = useState(null)


    useEffect(() => {
      
        
        fetch('https://left-or-right-backend.vercel.app/api2')
        .then(res => res.json())
        .then(dataAR => setData(dataAR.message))
        .catch(err => console.log(err))

        
         
      }, []);


      //show image of girl
      function ShowImage(e){
          console.log(e.currentTarget.alt)
          document.getElementById('image').src = require(`../assets/${e.currentTarget.alt}.jpg`)
          document.getElementById('ShowImage').style.display = ""
          document.getElementById('ShowImageBackground').style.display = ""
      }


  var navigate = useNavigate()
    //get results
  function GetResults(){

    //hide buttons and get data
    document.getElementById('GetResultsButton').style.display = "none"
    document.getElementById('MainBody').style.display = ""

    //sort the array depending on the score
    dataAR.sort((a, b) => b.cur_score - a.cur_score)
    //console.log(dataAR)

    //loop through and for every element append to main body
    for(let i = 0; i < dataAR.length; i++){
        
        let CurGirl = dataAR[i]
        //console.log(i, CurGirl.full_name)

        //position
        let position = document.createElement('div')
        position.className = "Position"
        position.innerText = i+1
        //girl's image
        let img = document.createElement('button')
        img.className = "IMG"
        img.innerText = "Image"
        img.alt = CurGirl.full_name
        img.onclick = ShowImage
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
        document.getElementById('IMG-Body').appendChild(img)
        document.getElementById('FullName-Body').appendChild(name)
        document.getElementById('Score-Body').appendChild(score)

        
    }





  }



  //SEARCH BAR FUNCTION

  function SearchBar(e){
       //console.log(e.currentTarget.value)
       let curInputValue = e.currentTarget.value
       let curInputValueLENGTH = curInputValue.length

       

                //console.log('yes')
                //search through all elements and find one that matches the name
                var elements = document.getElementById('FullName-Body').children;
                for(let k = 0; k < elements.length; k++){
                    let cur_girl_name = elements[k].innerText
                    if(cur_girl_name.toLowerCase().includes(curInputValue.toLowerCase()) && curInputValue !== ""){
                        elements[k].scrollIntoView()

                        //highlight girl
                        setTimeout(function () {
                            elements[k].style.backgroundColor = "yellow"
                            
                          },0)


                          setTimeout(function() {    
                             elements[k].style.backgroundColor = "white"
                          }, 500);
                        
                        
                          
                        

                        return
                    }
                }

                return
          

  }


  //close image function
  function CloseImage(){
    document.getElementById('ShowImage').style.display = "none"
    document.getElementById('ShowImageBackground').style.display = "none"
  }



   function Home(){
       navigate('/')
       window.location.reload()
   }

    return(
 
        <div id='Leaderboard-App'>

            <div id='ShowImage' style={{display:'none'}}>
                <img id='image'></img>
            </div>
            <div id='ShowImageBackground' onClick={CloseImage} style={{display:'none'}}></div>
              
            <div id='SearchBar'>
               <div id='Left-NavBar'>
                   <input id='SearchBar-Input'  placeholder="Search.." onInput={SearchBar}></input>
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
                    <div id='IMG-StickyOverlayLB'>IMG</div>
                    <div id='FullName-StickyOverlayLB'>Full Name</div>
                    <div id='Score-StickyOverlayLB'>Score</div>
                </div>

                <div id='MainBody'>
                    <button id='GetResultsButton' onClick={GetResults}>Get Results</button>
                    <div id='Position-Body'>
                        
                    </div>
                    <div id='IMG-Body'>
                        
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