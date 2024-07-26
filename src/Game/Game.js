import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Game.css'




const GameHTML = () => {
  var ImageLeft = document.getElementById('PersonLeft')
  var ImageRight = document.getElementById('PersonRight')

  var NamesAr = []
  var DynamicNamesAr = []
  var ObjectsAfter = {}

  //useEffect starts when page loads, 
  //will use to get all the data of the girls in the beginning (on load)
  const [dataAR, setData] = useState(null)
    useEffect(() => {
      
        
        fetch('http://localhost:8081/api')
        .then(res => res.json())
        .then(dataAR => setData(dataAR.message))
        .catch(err => console.log(err))



        
      }, []);

      
      //when user presses start button, initialies the array of iamges and start
      function Start(){

        document.getElementById('Start-Game-Bnt').remove()
        document.getElementById('StartCover').remove()
        
        
         for(let i = 0; i < dataAR.length; i++){
            NamesAr.push(dataAR[i].full_name)
            
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
        DynamicNamesAr.splice(0,1)
        ImageRight.src = require(`../assets/${DynamicNamesAr[1]}.jpg`)
        ImageRight.alt = DynamicNamesAr[1]
        DynamicNamesAr.splice(1,1)
        
        
       
      }


      //when user clicks on left image
      function ImageClickLeft(e){
        
        let Girl_Name = e.currentTarget.alt
        //update ArrayAfter with girl's name and score
        ObjectsAfter[Girl_Name] = Girl_Name
        if(ObjectsAfter[Girl_Name+"Score"]){
          ObjectsAfter[Girl_Name+"Score"] = ObjectsAfter[Girl_Name+"Score"] + 1
        }else{
          ObjectsAfter[Girl_Name+"Score"] = 1
        }
         //change





        //change right picture
        ImageRight.src = require(`../assets/${DynamicNamesAr[0]}.jpg`)
         ImageRight.alt = DynamicNamesAr[0]
        DynamicNamesAr.splice(0,1)
        
      }



      //when user clicks on right image
      function ImageClickRight(e){
        
        let Girl_Name = e.currentTarget.alt
        //update ArrayAfter with girl's name and score
        ObjectsAfter[Girl_Name] = Girl_Name
        if(ObjectsAfter[Girl_Name+"Score"]){
          ObjectsAfter[Girl_Name+"Score"] = ObjectsAfter[Girl_Name+"Score"] + 1
        }else{
          ObjectsAfter[Girl_Name+"Score"] = 1
        }
         

        //change left picture
        ImageLeft.src = require(`../assets/${DynamicNamesAr[0]}.jpg`)
         ImageLeft.alt = DynamicNamesAr[0]
        DynamicNamesAr.splice(0,1)
      }
    

    return(
        <div id="GameApp">

           <div id='StartCover'></div>
           <button id='Start-Game-Bnt' onClick={Start}>Lets go</button>


           
            <div id='LeftOrRight-Text' >Left or Right?</div>

            

            <div id="PersonLeftHolder" >
              <img className='PersonImage' id='PersonLeft' onClick={ImageClickLeft}></img>
              </div>

            <div id="PersonRightHolder">
              <img className='PersonImage' id='PersonRight' onClick={ImageClickRight}></img>
            </div>
            
        </div>
    )

}

export default GameHTML