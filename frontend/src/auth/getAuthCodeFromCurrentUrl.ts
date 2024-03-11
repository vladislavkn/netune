const getAuthCodeFromCurrentUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("code");
};

export default getAuthCodeFromCurrentUrl;
