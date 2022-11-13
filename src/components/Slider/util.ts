const PI = Math.PI;

/**
 *
 * @param ctx
 * @param x 随机计算出来的起始位置x
 * @param y 随机计算出来的起始位置y
 * @param operation
 */
export const drawPath = (
  ctx: any,
  x: number,
  y: number,
  operation: "fill" | "clip",
  l,
  r
) => {
  // 从x,y位置开始画出拼图块形状
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  // anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.stroke();
  ctx.globalCompositeOperation = "destination-over"; // 让镂空的形状不受背景底图的影响并覆盖在背景底图的上方
  // 判断是填充还是裁切, 裁切主要用于生成图案滑块
  operation === "fill" ? ctx.fill() : ctx.clip();
};

export function getRandomNumberByRange(start: number, end: number) {
  return Math.round(Math.random() * (end - start) + start);
}
