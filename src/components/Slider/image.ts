export const createImage = (getRandomImgSrc, onLoad) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = getRandomImgSrc();
  img.onerror = () => {
    (img as any).src = getRandomImgSrc(); // 图片加载失败的时候重新加载其他图片
  };
  img.onload = () => {
    onLoad(img);
  };
};
