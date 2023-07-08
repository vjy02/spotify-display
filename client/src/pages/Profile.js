import { useState, useEffect } from 'react'
import { catchErrors } from '../utils'
import { getCurrentUserProfile, getCurrentUserPlaylists, getTopArtists } from '../Spotify'
import {StyledHeaders} from '../styles'
import { SectionWrapper, ArtistsWrapper} from '../components';
import styled from 'styled-components/macro';

const ProfilePageWrapper = styled.main`
  display: flex;
  border: 3px solid white;
  flex-direction: row;
  justify-items: center;
  height: 100vh;
`

const TopArtists = styled.main`
  width: 60vw;
  height: 80vh;
`

const Profile = () => {

  const [profile, setProfile] = useState(null)
  const [playlists, setPlaylists] = useState(null)
  const [topArtists, setTopArtists] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const  userProfile  = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists()
      setPlaylists(userPlaylists.data)

      const userTopArtists = await getTopArtists()
      setTopArtists(userTopArtists.data)

      console.log(topArtists)
    }

    catchErrors(fetchData());
  }, [])

  return (
    <ProfilePageWrapper>
      {profile && (
          <StyledHeaders type="user">
              <div id = "profile_flex">
                {profile.images.length && profile.images[0].url && (
                  <img className="header_img" src={profile.images[0].url} alt="Avatar"/>
                )} 
                <h1 className="header_name">{profile.display_name}</h1>
                <p className="header_meta">
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
          </StyledHeaders>
        )}

      {topArtists && (
        <TopArtists >
          <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
            <ArtistsWrapper artists={topArtists.items.slice(0, 10)} />
          </SectionWrapper>
        </TopArtists >
      )}
    </ProfilePageWrapper>
  )
};

export default Profile;