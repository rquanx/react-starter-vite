import { useEffect, useRef, useState } from "react";
import { SliderProps } from ".";
import { createImage } from "./image";
import { drawPath, getRandomNumberByRange } from "./util";
export const useSliderService = ({
  width = 320,
  height = 162,
  l = 42,
  r = 9,
  imgUrl,
  sliderText,
  refreshIcon,
  onSuccess,
  onFail,
  onRefresh,
}: SliderProps) => {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>();
  const canvasBlockRef = useRef<HTMLCanvasElement>();

  const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
  const startPositionRef = useRef({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const L = l + r * 2 + 3; // 边长 + 直径(半径 x 2) + gap  滑块实际边长

  // 根据宽高随机获取图片
  const getRandomImgSrc = () => {
    return (
      imgUrl ||
      `https://picsum.photos/id/${getRandomNumberByRange(
        0,
        1084
      )}/${width}/${height}`
    );
  };

  const onLoad = (img) => {
    setLoading(false);
    draw(img);
  };

  const draw = (img) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    const blockRef = canvasBlockRef;
    const blockCtx = blockRef.current.getContext("2d");

    // 最小x：余量 + 滑块宽度（初始化后待拖拽的方块在左侧，增加L防止方块重叠）
    // 最大x: 余量 + 宽度 - L 防止越界
    const x = getRandomNumberByRange(L + 10, width - (L + 10));

    // 最小y：推动只需考虑x坐标，y坐标只要在图片内即可
    // 类似最大x
    const y = getRandomNumberByRange(10 + r * 2, height - (L + 10));

    // 绘制镂空形状

    // 绘制透明的镂空方块覆盖在图片上
    drawPath(canvasCtx, x, y, "fill", l, r);
    drawPath(blockCtx, x, y, "clip", l, r);

    canvasCtx.drawImage(img, 0, 0, width, height);
    blockCtx.drawImage(img, 0, 0, width, height);

    // 截取出镂空裁剪出来的内容，然后重绘block canvas
    const y1 = y - r * 2 - 1; // -1 ??
    const ImageData = blockCtx.getImageData(x - 3, y1, L, L);
    blockRef.current.width = L;
    blockCtx.putImageData(ImageData, 0, y1);
  };
  useEffect(() => {
    createImage(getRandomImgSrc, onLoad);
  }, []);

  const onMouseMove = (e) => {
    // 节流
    if (!isMoving) {
      return;
    }
    const x = e.clientX - startPositionRef.current.x;
    const y = e.clientY - startPositionRef.current.y;
    if (x < 0 || x > width - l) {
      return;
    }

    const blockLeft = ((width - 40 - 20) / (width - 40)) * x;
    canvasBlockRef.current.style.left = blockLeft + "px";
    setPointPosition({
      x: e.clientX - startPositionRef.current.x,
      y: e.clientY - startPositionRef.current.y,
    });
  };
  const onMouseUp = (e) => {
    // 校验是否正确
    // 根据校验结果调用回调
    canvasBlockRef.current.style.left = 0 + "px";
    setIsMoving(false);
    setPointPosition({
      x: 0,
      y: 0,
    });
  };

  const onMouseDown = (e) => {
    setIsMoving(true);
    startPositionRef.current.x = e.clientX;
    startPositionRef.current.y = e.clientY;
  };
  return {
    onMouseMove,
    onMouseUp,
    canvasRef,
    canvasBlockRef,
    isMoving,
    pointPosition,
    onMouseDown,
    loading,
  };
};
