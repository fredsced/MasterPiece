export default function authHeader() {
  const user = JSON.parse(
    sessionStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_USER)
  );

  if (user && user.access_token) {
    return {
      Authorization: 'Bearer ' + user.access_token,
      'Content-Type': process.env.REACT_APP_HEADER_JSON,
    };
  } else {
    return {};
  }
}
