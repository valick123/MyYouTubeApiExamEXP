import '../scss/main.scss';
import 'bootstrap/scss/bootstrap-grid.scss';
import React from 'react';
import{render} from 'react-dom'
import 'fontsource-roboto';
import {Provider} from 'react-redux';
import {store} from './store/store'
import {AppComponent} from "./components/app.component"

 render(
 <Provider store={store}>
     <AppComponent />
 </Provider>, 
    document.querySelector('.app'));