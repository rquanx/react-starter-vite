import React, { ReactNode } from "react";
import "./index.css";
import { useSliderService } from "./service";
export interface SliderProps {
  width?: number;
  height?: number;
  imgUrl?: string;

  l?: number;
  r?: number;
  sliderText?: string | ReactNode;
  refreshIcon?: string;
  /**
   * @description   验证成功回调
   * @default       ():void => {}
   */
  onSuccess?: VoidFunction;
  /**
   * @description   验证失败回调
   * @default       ():void => {}
   */
  onFail?: VoidFunction;
  /**
   * @description   刷新时回调
   * @default       ():void => {}
   */
  onRefresh?: VoidFunction;
}

const Loading = ({ width, height, show }) => {
  return (
    <div
      className="slider-loading"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: show ? "flex" : "none",
      }}
    >
      <div className="slider-loading-icon"></div>
      <span className="slider-loading-text">加载中...</span>
    </div>
  );
};

export const Slider = (props: SliderProps) => {
  const { width = 320, height = 162, l = 42, sliderText } = props;

  const {
    onMouseMove,
    onMouseUp,
    canvasRef,
    canvasBlockRef,
    isMoving,
    pointPosition,
    onMouseDown,
    loading,
  } = useSliderService(props);
  return (
    <div
      className="slider-container"
      style={{
        width: `${width}px`,
        margin: "0 auto",
      }}
      onMouseMove={onMouseMove} // 挂载父节点上，这样在整个父元素的空间内都可以滑动，如果只绑在slider block，一旦鼠标超出block区域就无法滚动
      onMouseUp={onMouseUp}
    >
      <div
        className="slider-canvas"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {/* 主canvas用于显示图片以及缺块区域 */}
        <canvas ref={canvasRef} width={width} height={height}></canvas>

        {/* 推动拼块 */}
        <canvas
          className="block"
          ref={canvasBlockRef}
          width={width}
          height={height}
        ></canvas>
      </div>
      <div
        className="slider-block-container"
        style={{
          width: `${width}px`,
          height: `${l}px`,
        }}
      >
        <div
          className={`slider-block-background ${
            isMoving ? "slider-block-background-avtive" : ""
          }`}
          style={{
            width: `${pointPosition.x ?? 0}px`,
            height: `${l}px`,
          }}
        >
          <div
            className={`slider ${isMoving ? "slider-active" : ""}`}
            style={{
              width: `${l}px`,
              height: `${l}px`,
              textAlign: "center",
              lineHeight: `${l}px`,
              left: `${pointPosition.x ?? 0}px`,
            }}
            onMouseDown={onMouseDown}
          >
            →
          </div>
        </div>
        <div
          className="slider-block-text"
          style={{
            textAlign: "center",
            lineHeight: `${l}px`,
          }}
        >
          {sliderText}
        </div>
      </div>
      <Loading width={width} height={height} show={loading} />
    </div>
  );
};

export default Slider;
