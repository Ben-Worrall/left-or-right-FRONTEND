import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.css'
import { isEditable } from '@testing-library/user-event/dist/utils';
import { useNavigate } from "react-router-dom"



const GameHTML = () => {
  const navigate = useNavigate()
  var ImageLeft = document.getElementById('PersonLeft')
  var ImageRight = document.getElementById('PersonRight')
  var PersonNameLeft = document.getElementById('PersonLeftName')
  var PersonNameRight = document.getElementById('PersonRightName')

  var NamesAr = []
  var DynamicNamesAr = []
  var InstagramLinks = {}

  var FinalResultsOBJ = {}

  //useEffect starts when page loads, 
  //will use to get all the data of the girls in the beginning (on load)
   //getting form backend
  const [dataAR, setData] = useState(null)

    //sending back to backend
    var [data] = useState(" ")
  const [response, setResponse] = useState(null);
  
    useEffect(() => {
      
        
        fetch('http://localhost:8081/api1')
        .then(res => res.json())
        .then(dataAR => setData(dataAR.message))
        .catch(err => console.log(err))



        
      }, []);

      
      //when user presses start button, initialies the array of iamges and start
      function Start(){

        document.getElementById('Start-Game-Bnt').style.display = "none"
        document.getElementById('StartCover').style.display = "none"
        
        
         for(let i = 0; i < dataAR.length; i++){
            NamesAr.push(dataAR[i].full_name)
            InstagramLinks[dataAR[i].full_name+"Instagram"] = dataAR[i].instagram
            
         }
         console.log(NamesAr)


         //create dummy array and shuffy it
          DynamicNamesAr = NamesAr
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)


         //initialise first images
         ImageLeft.src = require(`../assets/${DynamicNamesAr[0]}.jpg`)
         ImageLeft.alt = DynamicNamesAr[0]
         PersonNameLeft.innerText = DynamicNamesAr[0]
        DynamicNamesAr.splice(0,1)
        ImageRight.src = require(`../assets/${DynamicNamesAr[1]}.jpg`)
        ImageRight.alt = DynamicNamesAr[1]
        PersonNameRight.innerText = DynamicNamesAr[1]
        DynamicNamesAr.splice(1,1)
        
        
       
      }


      //when user clicks on left image
      function ImageClickLeft(e){
        
        let Girl_Name = e.currentTarget.alt
        //update ArrayAfter with girl's name and score
        FinalResultsOBJ["Girl_Name " + Girl_Name] = Girl_Name
        if(FinalResultsOBJ[Girl_Name+" Score"]){
          FinalResultsOBJ[Girl_Name+" Score"] = FinalResultsOBJ[Girl_Name+" Score"] + 1
        }else{
          FinalResultsOBJ[Girl_Name+" Score"] = 1
        }
         //change





        //change right picture
        
        if(DynamicNamesAr.length > 0){ 
          ImageRight.src = require(`../assets/${DynamicNamesAr[0]}.jpg`)
          ImageRight.alt = DynamicNamesAr[0]
          PersonNameRight.innerText = DynamicNamesAr[0]
          DynamicNamesAr.splice(0,1)

        }else{
          document.getElementById('StartCover').style.display = ""
          document.getElementById('Submit-Bnt').style.display = ""
          SubmitResults(e)
          NoMoreImagesLeft(e)
        }
        
        
      }












      //when user clicks on right image
      function ImageClickRight(e){
        
        let Girl_Name = e.currentTarget.alt
        //update ArrayAfter with girl's name and score
        FinalResultsOBJ["Girl_Name " + Girl_Name] = Girl_Name
        if(FinalResultsOBJ[Girl_Name+" Score"]){
          FinalResultsOBJ[Girl_Name+" Score"] = FinalResultsOBJ[Girl_Name+" Score"] + 1
        }else{
          FinalResultsOBJ[Girl_Name+" Score"] = 1
        }
         

        //change left picture
        
        if(DynamicNamesAr.length > 0){
          ImageLeft.src = require(`../assets/${DynamicNamesAr[0]}.jpg`)
          ImageLeft.alt = DynamicNamesAr[0]
          PersonNameLeft.innerText = DynamicNamesAr[0]
          DynamicNamesAr.splice(0,1)
        }else{
          
          document.getElementById('StartCover').style.display = ""
          document.getElementById('Submit-Bnt').style.display = ""
          NoMoreImagesRight(e)
          SubmitResults(e)
        }
         
      }














      //when no more images left
      function NoMoreImagesLeft(e){
            let GirlName = e.currentTarget.alt
            let instaLink = InstagramLinks[GirlName+"Instagram"]
            //hide the right side

            ImageRight.style.display = "none"
            PersonNameRight.style.display = "none"
            PersonNameLeft.style.display = "none"
            document.getElementById('PersonRightHolder').style.outline = "none"

            

      }
      //when no more images right
      function NoMoreImagesRight(e){
        let GirlName = e.currentTarget.alt
        let instaLink = InstagramLinks[GirlName+"Instagram"]
        //hide the left side
        ImageLeft.style.display = "none"
        PersonNameLeft.style.display = "none"
        PersonNameRight.style.display = "none"
        document.getElementById('PersonLeftHolder').style.outline = "none"

      }













      //submit results
      function SubmitResults(e){
            
          console.log(FinalResultsOBJ)
          
         //check if left or right
         if(ImageLeft.style.display == ""){
            console.log('image on the left is displaying')

          document.getElementById('text_for_instagram_right').style.display = ""
          document.getElementById('Girl_name_right').innerText = e.currentTarget.alt
          document.getElementById('Instagram_link_right').innerText = InstagramLinks[e.currentTarget.alt+"Instagram"]
          document.getElementById('Instagram_link_right').href = InstagramLinks[e.currentTarget.alt+"Instagram"]

         }else if(ImageRight.style.display == ""){
          console.log('image on the right is displaying')
          document.getElementById('text_for_instagram_left').style.display = ""
          document.getElementById('Girl_name_left').innerText = e.currentTarget.alt
          document.getElementById('Instagram_link_left').innerText = InstagramLinks[e.currentTarget.alt+"Instagram"]
          document.getElementById('Instagram_link_left').href = InstagramLinks[e.currentTarget.alt+"Instagram"]

         }
         

        }













        //send results back to database
        async function SendToDB(){
          data = FinalResultsOBJ
          var result
          console.log('send to db')
             //send data back to nodejs (server.js)
             try{
              console.log('try send to db')
             
              const res = await fetch('http://localhost:8081/api/data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({data}),

                
              }).then(
               //result = await res.json(),
              //setResponse(result)
              ).then(

                //hide buttons
                 
                  document.getElementById('StartCover').style.display = "none",
                  document.getElementById('Submit-Bnt').style.display = "none"

              )
              
              
            }catch (error){
                   console.log(error)
            }

            
              
             
                  //hide buttons
                 
                  //document.getElementById('StartCover').style.display = "none"
                  //document.getElementById('Submit-Bnt').style.display = "none"
            


          
        }










function Restart(){
   window.location.reload()
}
function Home(){
  navigate('/')
  window.location.reload()
}




    return(
        <div id="GameApp">

           <div id='StartCover'></div>
           <button id='Start-Game-Bnt' onClick={Start}>Lets go</button>
           <button id='Submit-Bnt' style={{display:"none"}} onClick={SendToDB}>Submit Results</button>

           
            <div id='LeftOrRight-Text' >Left or Right?</div>
            <button id='Home-BNT' style={{display:"none"}}></button>
            

            
            <div id='PersonLeftName'></div>
            <div id="PersonLeftHolder" >
              <div id='text_for_instagram_left' style={{display:"none"}}>
                   <p id='Girl_name_left'></p>
                   <a id='Instagram_link_left' target="blank"></a>
                   <button className='RestartButton' onClick={Restart}>⟳</button>
                   <button className='HomeButton' onClick={Home}>Home</button>
                   
              </div>
              <img className='PersonImage' id='PersonLeft' onClick={ImageClickLeft}></img>
              </div>


              


            <div id='PersonRightName'></div>
            <div id="PersonRightHolder">

              <div id='text_for_instagram_right' style={{display:"none"}}>
                   <p id='Girl_name_right'></p>
                   <a id='Instagram_link_right' target="blank"></a>
                   <button className='RestartButton' onClick={Restart}>⟳</button>
                   <button className='HomeButton' onClick={Home}>Home</button>
              </div>
              
              <img className='PersonImage' id='PersonRight' onClick={ImageClickRight}></img>
            </div>
            
        </div>
    )

}

export default GameHTML