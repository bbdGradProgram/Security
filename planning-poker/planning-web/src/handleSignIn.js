/**
 *
 * @param {string} redirectPath - state path for cognito redirect
 */
export default function handleSignIn(redirectPath) {
  const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  window.location.href = `${cognitoDomain}/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectUri}&response_type=token&client_id=${clientId}&scope=email openid phone&state=${redirectPath}`;
}
