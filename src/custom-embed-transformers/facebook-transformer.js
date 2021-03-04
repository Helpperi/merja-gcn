const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['facebook.com', 'www.facebook.com'].includes(host) &&
    pathname.includes('/videos/')
  );
};

const name = 'facebook-transformer';
  
const getHTML = (string) => {
  const src = `https://facebook.com/plugins/video.php?href=${string}`;
  return `<iframe src="${src}" width="100%" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`;
};

module.exports = { getHTML, name, shouldTransform };