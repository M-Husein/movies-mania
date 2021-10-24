import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavMain from './components/NavMain';
import NotFound from './components/pages/NotFound';

const Home = lazy(() => import('./components/pages/Home'));
const MovieDetail = lazy(() => import('./components/pages/MovieDetail'));

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <Router>
      <NavMain 
        theme={theme} 
        onChangeTheme={setTheme} 
      />

      <div className="container py-4">
        <Suspense fallback={"LOADING"}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movie/:ID" component={MovieDetail} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
