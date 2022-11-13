/**
 * styled-component本质是劫持了className属性
 * 通过柯里化，返回一个新的组件对象，组件内会成唯一的className，并且通过CSSOM方式插入css
 *  - 为何只有组件render的时候才会产生css
 *
 * 通过cssom动态插入样式
 *  - 控制样式插入顺序解决优先级问题
 */

const styled =
  (Tag) =>
  (rawStyles, ...interpolations) => {
    /** rawStyles 传入样式 */
    return function NewComponent(props) {
      /*
        Compute the styles from the template string, the
        interpolation functions, and the provided React props.
      */
      const styles = reconcileStyles(rawStyles, interpolations, props);

      const uniqueClassName = comeUpWithUniqueName(styles);
      const processedStyles = runStylesThroughStylis(styles);
      createAndInjectCSSClass(uniqueClassName, processedStyles);

      // 组合生成的className以及传入的className
      // 根据css优先级问题，为了让传入的className优先，需要styled-component控制好生成的class的插入顺序
      const combinedClasses = [uniqueClassName, props.className].join(" ");
      return <Tag {...props} className={combinedClasses} />;
    };
  };

styled.h1 = styled("h1");
styled.button = styled("button");
