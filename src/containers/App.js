import React from 'react';
import './App.css'
//npm packages
import ParticlesBg from 'particles-bg'
import 'tachyons';
//components
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import SignIn from '../components/SignIn/SignIn'
import SignUp from '../components/SignUp/SignUp'
//CLARIFAI START

//CLARIFAI END
const initialState = {
    input: '',
    imageUrl: '',
    boundingBox: {},
    route: 'signin',
    isSignedIn: false,
    users: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends React.Component {
    constructor() {
        super()
        this.state = initialState;
    }
    

    loadUser = (data) => {
        this.setState({users: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEntriesChange = (event) => {
        this.setState({entries: event.target.value})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputimage')
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({boundingBox: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        }).then(res => res.json())
        .then(faceBorder => {
            if(faceBorder) {
                fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.users.id
                })
                }).then(res => res.json()).then(count => {
                    this.setState(Object.assign(this.state.users, {entries: count}))}
                ).catch(console.log)
            }
            this.displayFaceBox(this.calculateFaceLocation(faceBorder)
        )
    })
        .catch(error => console.log('error', error));
    }



    onRouteChange = (route) => {
        if(route === 'signin') {
            this.setState(initialState)
        } else if (route === 'signup') {
            this.setState({isSignedIn: false})
        } else {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }
    
    render() {
        return(
            <div className="App">
                <ParticlesBg  color="#ffffff" type="cobweb" bg={true} />
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                { this.state.route === 'signin'
                    ?  
                    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                    : 
                    this.state.route === 'home' 
                    ?
                    <div>
                        <Logo />
                        <Rank name={this.state.users.name} entries={this.state.users.entries}/>
                        <ImageLinkForm onClick={this.onButtonSubmit} onInputChange={this.onInputChange}/>
                        <FaceRecognition boundingBox={this.state.boundingBox} imageUrl={this.state.imageUrl}/>
                    </div>
                    :
                    this.state.route === 'signup'
                    ?
                    <div>
                        <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    </div>
                    :
                    <div>
                        <h1>Error</h1>
                    </div>
                }
            </div>
        )
    }
}

export default App;