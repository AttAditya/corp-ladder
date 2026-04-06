import { getAppStyles } from "@/stylesheets/theme";

const STYLE_ELEMENT_ID = "app-styles";

export function installAppStyles() {
  if (document.getElementById(STYLE_ELEMENT_ID)) {
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ELEMENT_ID;
  styleElement.textContent = getAppStyles();
  document.head.appendChild(styleElement);
}
