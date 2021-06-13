import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    const jwt = localStorage.getItem('jwt');
    console.log("jwt ", jwt)
   return <Route {...rest} render={(props) => (
        jwt != null
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
    }

export  default  GuardedRoute;