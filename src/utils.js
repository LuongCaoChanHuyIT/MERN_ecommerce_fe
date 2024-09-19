import { jwtDecode } from "jwt-decode";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
export const renderOption = (arr) => {
  let result = [];

  result = arr?.map((opt) => {
    return { value: opt, label: opt };
  });

  result?.push({
    label: "Thêm type",
    value: "add_type",
  });
  return result;
};
export const convertPrice = (price) => {
  try {
    const result = price.toLocaleString().replaceAll(",", ".");
    return result;
  } catch (error) {
    return null;
  }
};

export const handleDecoded = () => {
  let storageData = localStorage.getItem("access_token");
  let decoded = {};
  if (storageData && isJsonString(storageData)) {
    storageData = JSON.parse(storageData);
    decoded = jwtDecode(storageData);
  }
  return { decoded, storageData };
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID,
      cookie: true,
      xfbml: true,
      version: "v8.6",
    });
  };
  (function (d, s, id) {
    console.log(s);
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};
