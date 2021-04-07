import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import Itunes from './Itunes';

class Routing extends Component 
{ 
    render() { 
	    return ( 
	        <Router> 
		        <div> 
			        <Switch> 
                        <Route exact path='/Itunes' component={Itunes}></Route> 
			            
                    </Switch> 
		        </div> 
	        </Router> 
        ); 
    } 
} 

export default Routing; 