import React from "react";
import App from './App';
import DefaultRouting from './DefaultRouting';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function Routing() {
  return (
<Router>
  <Route path="/" render={props => {
    const [subdomain] = window.location.hostname.split('.'); //get the stuff before the dot
    if (subdomain === 'cooking')     return <App/>; //cooking
    return <DefaultRouting/>; //homepage
  }}/>
</Router>
  );
}
