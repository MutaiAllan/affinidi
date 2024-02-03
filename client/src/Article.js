import React from 'react';
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth'


const Article = ({ availableArticles }) => {
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
 })

 async function logout() {
  handleLogout();
  window.location.href = "/";
 }

  return (
    <div>

      {!profile && <>
        <AffinidiLoginButton />
        <h2>Articles</h2>
        <p>Available articles: {availableArticles}</p>
        <p>
          Display 3 articles for non-logged in users
        </p>
      </>}

      {isLoading && <p>Loading...</p>}

      {profile && <>
          <button style={{ marginRight: 10 }} onClick={logout}>
            Logout
          </button>

          <h3>User Profile</h3>
          <pre style={{ textAlign: "left" }}>{JSON.stringify(profile, null, 4)}</pre>
        </>}

      {error && <><h2>error</h2>{error}</>}

    </div>
  );
}

export default Article;
