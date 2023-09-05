import React from 'react';

const ImageLinkForm = (props) => {
    return (
        <div>
            <div className="tc">
                <p className="f3">An app that detects faces in your pictures! Let's give it a try!</p>
            </div>
            <div className="tc pa4 br3 shadow-5" style={{margin: "0px 100px"}}>
                <input onChange={props.onInputChange} className="db f4 pa2 w-90 center" type="text">
                </input>
                <button onClick={props.onClick} style={{marginTop: "20px"}} className='db w-45 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect faces</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;