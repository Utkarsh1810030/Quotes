import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { useEffect } from 'react';

const Landing = () => <h2>Landing</h2>;
const Header = () => <h2>Header</h2>;

function App(props) {
  useEffect(() => {
    props.fetchUser();
  }, []);
  console.log(props, 'aaya');
  return (
    <div>
      <a href="/auth/google">Sign in with google</a>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, actions)(App);
