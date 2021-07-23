import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import {MainView} from './components/main-view/main-view';

//import statement to indicate that you need to bundles `./index.scss`
import  './index.scss';

//main component (will eventually use all the others)
class CineFilesApp extends React.Component{
    render(){
        return (
            <Container id="CineFiles-Client">
                <MainView />      
            </Container>
        );
    }
}

//Find the root of your app
const container = document.getElementsByClassName("app-container")[0];

//tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(CineFilesApp), container);