import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import thinkingLogo from './thinkingImage.png';

const Logo = () => {
    return (
        <div>
            <div className='ma4 mt0 center'>   
                <Tilt className="Tilt br2 shadow-2" style={{height:"150px", width:"150px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img alt="thinking" style={{height:"120px"}} src={thinkingLogo}></img>
                </Tilt>
            </div>
        </div>
    )
}

export default Logo;