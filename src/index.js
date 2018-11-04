import React from 'react'; //importing React object - to get features like hot module reloading
import ReactDOM from 'react-dom'; //importing ReactDOM object- to get features like rendering
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( < App / > , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();