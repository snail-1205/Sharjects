import React from 'react'

import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { signIn, useSession } from 'next-auth/react'
import type { GithubProfile } from 'next-auth/providers/github'

import { useGithubData } from './GithubStaticDataContext'
import FetchSuspenseWrapper from './FetchSuspenseWrapper'

import RepoIcon from 'src/assets/icons/github/RepoIcon'
import GistIcon from 'src/assets/icons/github/GistIcon'
import FollowerIcon from 'src/assets/icons/github/FollowerIcon'

const getPalette = (dark: boolean) => dark
  ? {
    background: '#0d1117',
    textColor: '#58a6ff',
    borderColor: '#30363d',
    iconColor: '#8b949e',
  }
  : {
    background: 'white',
    textColor: '#0969da',
    borderColor: '#d0d7de',
    iconColor: '#57606a',
  }

const GithubUserCardFetcher: React.FC<{ username: string }> = ({ username }) => {
  const { getData } = useGithubData();
  return (
    <FetchSuspenseWrapper
      fetcher={() => getData<GithubProfile>(username, `users/${username}`)}
      Component={GithubUserCard}
      fetchedPropName='user'
    />
  )
}

const GithubUserCard: React.FC<{ user: GithubProfile }> = ({ user }) => {
  const [isFollowing, setFollowing] = React.useState(false);
  const { data: session } = useSession();

  const request = React.useCallback((method: string = 'GET') => {
    if (!(session && session.accessToken) || user.name === session?.user?.name) return;

    return fetch(`https://api.github.com/user/following/${user.login}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `token ${session.accessToken}`
      }
    })
  }, [session])

  React.useEffect(() => {
    if (session && session.accessToken) {
      request()?.then(res => setFollowing(res.status === 204))
    }
  }, [request, session])

  const fetchFollowing = () => {
    if (session && session.accessToken)
      request(isFollowing ? 'DELETE' : 'PUT')?.then(res => res.ok && setFollowing(prev => !prev))
    else signIn('github')
  }

  const theme = useTheme();
  const palette = getPalette(theme.palette.mode === 'dark');

  return (
    <div style={{
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
      border: '1px solid',
      borderColor: palette.borderColor,
      borderRadius: '6px',
      background: palette.background,
      padding: '16px',
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#24292e',
    }}>
      <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
        <Avatar src={user.avatar_url} />
        <div style={{ display: 'flex', marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center', minWidth: '40%' }}>
          <div aria-label='profile name'>
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              <a
                style={{ textDecoration: 'none', color: palette.textColor }}
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {user.login}
              </a>
            </Typography>
            <Typography variant='caption' sx={{ position: 'relative', top: '-10px' }}>
              {user.name ?? <span style={{ color: 'gray' }}>{"<Empty>"}</span>}
            </Typography>
          </div>
          <Button
            id='followbtn'
            size='small'
            variant='outlined'
            onClick={fetchFollowing}
            sx={{ height: '35px', marginLeft: '20px' }}
            disabled={user.name === session?.user?.name}
          >
            {isFollowing ? "UnFollow" : "Follow"}
          </Button>
        </div>
      </div>
      <div style={{ marginLeft: '20px' }}>
        <Typography variant='body1' sx={{ ml: '5px' }}>{user.bio}</Typography>
        <div style={{ display: 'flex', margin: '10px auto' }}>
          {[
            [user.public_repos, <RepoIcon sx={{ fill: palette.iconColor, marginRight: '8px' }} fontSize='small' />],
            [user.public_gists, <GistIcon sx={{ fill: palette.iconColor, marginRight: '8px' }} fontSize='small' />],
            [user.followers, <FollowerIcon sx={{ fill: palette.iconColor, marginRight: '8px' }} fontSize='small' />]
          ].map(([value, icon], i) =>
            <div key={i} style={{
              margin: 'auto 5px',
              display: value === 0 ? 'none' : 'flex',
              alignItems: 'center'
            }}>
              {icon}
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GithubUserCardFetcher;