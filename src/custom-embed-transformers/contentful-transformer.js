const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['videos.ctfassets.net'].includes(host)
  );
};

const name = 'contentful-transformer';
  
const getHTML = (string) => {
  const src = `${string}`;
  return `<iframe src="${src}" width="100%" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`;
};

module.exports = { getHTML, name, shouldTransform };