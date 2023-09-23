import React from 'react';
import Eagle from '../Assets/Logo.png';
import '../style.css';

const UNTBar = () => {
    return (
        <div class="untbar">
            <div className="untHeaderCol1">
                <div className="untImg">
                     <img src={Eagle} alt="UNT_Eagle" className="untbar-eagle"/>
                </div>
               
            </div>
           
           
            <div className='untHeaderCol2'>
                <div className='untHeaderTitle'>
                    <h3 class="untbarText">UNIVERSITY OF NORTH TEXAS</h3>
                    <h2 class="untbarText">UNT CAFTERIA</h2>
                </div>
                
            </div>
           
           
            <div className='untHeaderCol3'>
                <div className='untHeaderLogin'>
                    <button className='Header_btn'>Login</button>
                    <a ><p>No Account? Sign UP HERE</p></a>
                </div>
               

            </div>
            
        </div>
    );
}

export default UNTBar;