import { Application, Graphics, LINE_JOIN, Sprite } from 'pixi.js'
import { createBrands, createContours } from './get-point'


export function getContours(ctx: CanvasRenderingContext2D, opacityThreshold = 1) {
  const { width, height } = ctx.canvas
  const imageData = ctx.getImageData(0, 0, width, height)
  return createContours(imageData, width, opacityThreshold);
}

export function getBrands(ctx: CanvasRenderingContext2D, lowerBand: number, bandWidth: number) {
  const { width, height } = ctx.canvas
  const imageData = ctx.getImageData(0, 0, width, height)
  return createBrands(imageData, width, lowerBand, bandWidth);
}


export const drawOutline = (canvas: HTMLCanvasElement, sprite: Sprite, graph: Graphics, options: {
  thickness: number;
  color: number;
}) => {
  const ctx = canvas.getContext('2d')
  graph.clear();
  graph.x = sprite.x - (sprite.width / 2);
  graph.y = sprite.y - (sprite.height / 2);
  const contoursList = getBrands(ctx, 0, 765)
  graph.lineStyle({
    width: options.thickness,
    color: options.color,
    join: LINE_JOIN.ROUND,
  })
  contoursList.map((contours) => {
    graph.moveTo(contours[0][0], contours[0][1])
    for (let i = 1; i < contours.length; i++) {
      graph.lineTo(contours[i][0], contours[i][1])
    }
  })
  graph.closePath();
}
