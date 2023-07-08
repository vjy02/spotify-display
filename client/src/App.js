import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './Spotify.js'
import {catchErrors} from './utils.js'
import {BrowserRouter as Router, Routes, Route,useLocation} from "react-router-dom"
import styled from 'styled-components/macro'
import {GlobalStyle} from './styles'
import {Login, Profile} from './pages'

const StyledLogoutButton = styled.button`
  position: absolute;
  top: 2%;
  right: 1%;
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
`

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    setToken(accessToken)

    async function fetchData  () {
        const { data } = await getCurrentUserProfile();
        setProfile(data)
    };

    catchErrors(fetchData())
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login/>
        ) : (
          <div>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
            <Router>
              <ScrollToTop/>
              <Routes>
                <Route path="/top-artists" element = {
                  <h1>Top Artists</h1>} />
                <Route path="/top-tracks" element = {
                  <h1>Top Tracks</h1>} />
                <Route path="/playlists/:id" element = {
                  <h1>Playlists ID</h1>} />
                <Route path="/playlists" element = {
                  <h1>Playlists</h1>} />
                <Route path="/" element = {
                  <Profile/>
                }/>
              </Routes>
            </Router>
          </div>
        )}
      </header>
    </div>
  )
}

export default App;
