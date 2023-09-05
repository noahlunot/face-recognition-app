import React from 'react';
import './faceRecognition.css'

const FaceRecognition = (props) => {
    return (
        <div className="center" style={{alignItems:"start"}}>
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={props.imageUrl} style={{width:'500px', height: 'auto'}}></img>
                <div className='bounding-box' style={{
                    top: props.boundingBox.topRow, 
                    right: props.boundingBox.rightCol, 
                    bottom: props.boundingBox.bottomRow, 
                    left: props.boundingBox.leftCol}}>
                </div>
            </div>
        </div>

    )
}

export default FaceRecognition;