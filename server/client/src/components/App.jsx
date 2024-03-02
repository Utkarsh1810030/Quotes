import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Landing = () => <h2>Landing</h2>;
function App() {
  return (
    <>
      <div>
        <a href="/auth/google">Sign in with google</a>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
