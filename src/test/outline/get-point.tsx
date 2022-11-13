import { isoContours, isoBands } from 'marchingsquares';
import chunk from 'lodash.chunk';


export function createBrands(imageData: ImageData, width: number, lowerBand: number, bandWidth: number) {
  const pixels = imageDataAsRgbaObject(imageData);
  const monochromePixels = pixels.map(p => p.alpha === 0 ? -1 : Math.round((p.red + p.green + p.blue) / 3));
  const chunks = chunk(monochromePixels, width);
  const contours = isoBands(chunks, lowerBand, bandWidth);
  return contours;
}

export const createContours = (imageData: ImageData, width: number, threshold: number) => {
  const pixels = imageDataAsRgbaObject(imageData);
  const monochromePixels = pixels.map(p => p.alpha === 0 ? -1 : Math.round((p.red + p.green + p.blue) / 3));
  const chunks = chunk(monochromePixels, width);
  const contours = isoContours(chunks, threshold);
  return contours;
}

export function imageDataAsRgbaObject(imageData: ImageData) {
  const data = imageData.data; // => [r,g,b,a,...]

  const pixels = [];
  for (let i = 0; i < data.length; i += 4) {
    pixels.push({
      red: data[i],
      green: data[i + 1],
      blue: data[i + 2],
      alpha: data[i + 3] / 255
    });
  }
  return pixels
}