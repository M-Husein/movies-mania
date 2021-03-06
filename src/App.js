import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavMain from './components/NavMain';
import Spinner from './components/Spinner';
import NotFound from './components/pages/NotFound';

const Home = lazy(() => import('./components/pages/Home'));
const MovieDetail = lazy(() => import('./components/pages/MovieDetail'));
const SearchResult = lazy(() => import('./components/pages/SearchResult'));

const LoadingPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-75vh cwait">
      <Spinner size="3rem" />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <Router>
      <NavMain 
        theme={theme} 
        onChangeTheme={setTheme} 
      />

      <div className="container py-4">
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/movie/:ID" component={MovieDetail} />
            <Route path="/search" component={SearchResult} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
