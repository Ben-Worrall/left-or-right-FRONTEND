import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'
import { isEditable } from '@testing-library/user-event/dist/utils';
import { useNavigate } from "react-router-dom"




const LeaderboardHTML = () => {




    return(
 
        <div id='Leaderboard-App'>
              
            <div id='SearchBar'>
               <div id='Left-NavBar'>
                   <input id='SearchBar-Input'  placeholder="Search.."></input>
                   <button type='submit' id='SubmitSearch'>🔍</button>
                  
               </div>

               <div id='Right-NavBar'>
                    <button id='Home'>Home</button>
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
                    <div id='Position-Body'>
                        <div className='Position'>1</div>
                    </div>
                    <div id='FullName-Body'>
                       <div className='FullName-Girl'>Name 1</div>

                    </div>
                    <div id='Score-Body'>
                       <div className='Score-Girl'>1</div>
                       

                    </div>
                
                </div>

             </div>


        </div>

    )
}

export default LeaderboardHTML