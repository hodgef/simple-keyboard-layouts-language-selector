import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import "./index.css";

/**
 * Available layouts
 * https://github.com/hodgef/simple-keyboard-layouts/tree/master/src/lib/layouts
 */
import SimpleKeyboardLayouts from "simple-keyboard-layouts";
const defaultLayout = "english";
const layoutSelector = document.querySelector(".layout-selector");
const layouts = new SimpleKeyboardLayouts().get();
const rtlLayouts = [
  "arabic",
  "farsi",
  "gilaki",
  "hebrew",
  "kurdish",
  "sindhi",
  "urdu",
  "uyghur",
];

Object.keys(layouts).forEach((layoutName) => {
  // Populate selector
  const option = document.createElement("option");
  option.setAttribute("value", layoutName);
  option.textContent = layoutName;
  layoutSelector.appendChild(option);

  const isSelected = layoutName === defaultLayout;
  const isRtl = rtlLayouts.includes(layoutName);
  layouts[layoutName].rtl = isRtl;

  if (isSelected) {
    option.setAttribute("selected", "selected");
  }
});

let keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  ...layouts[defaultLayout],
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", (event) => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  document.querySelector(".input").value = input;
  console.log("Input changed", input);
}

function onKeyPress(button) {
  console.log("Button pressed", button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}

/**
 * Selector onChange
 */
layoutSelector.addEventListener("change", (e) => {
  const layoutName = e.target.value;
  const isRtl = rtlLayouts.includes(layoutName);
  document.querySelector(".input").style.direction = isRtl ? "rtl" : "ltr";
  keyboard.setOptions({ ...layouts[e.target.value] });
});
