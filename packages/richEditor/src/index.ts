// https://github.com/quilljs/quill
// https://github.com/xdan/jodit
import Quill, { QuillOptionsStatic } from "quill";
import "quill/dist/quill.snow.css";
import "./style.less";

const EDITOR_AREA_CREATED_AT_INITIAL = "editor-area-created-at-initial";

export default class createEditor extends Quill {
  div: Element;
  constructor(container: string | Element, options?: QuillOptionsStatic) {
    let target = container;
    if (typeof target === "string") {
      target = document.querySelector(target)!;
    }
    const div = document.createElement("div");
    div.classList.add(EDITOR_AREA_CREATED_AT_INITIAL);
    target.append(div);
    super(div, options);
    this.div = div;
  }
}
