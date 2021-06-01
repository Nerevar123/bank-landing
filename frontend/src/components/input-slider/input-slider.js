import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import inputSliderStyles from "./input-slider.module.css";

function InputSlider({ overlay, values, setValues, name, ...props }) {
  const { Handle } = Slider;

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} ${overlay}`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  const handleChange = (value) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Slider
        className={inputSliderStyles.slider}
        handle={handle}
        onChange={handleChange}
        {...props}
      />
    </>
  );
}

export default InputSlider;
