// https://github.com/quilljs/quill
// https://github.com/xdan/jodit
// https://github.com/wangeditor-team/wangEditor
// https://github.com/ether/etherpad-lite
// https://github.com/codex-team/editor.js
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  Toolbar,
  createEditor,
  createToolbar,
} from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";
import "./style.less";

const EDITOR_AREA_CREATED_AT_INITIAL = "editor-area-created-at-initial";
const EDITOR_WRAPPER_ID = "editor-wrapper";
const TOOLBAR_CLASS = "toolbar-container";
const PANEL_CLASS = "panel-container";

type SetConfig<T> = (config: T) => any;
type InsertFnType = (url: string, alt: string, href: string) => void;

export default class CreateRichEditor {
  $root: Element;
  $toolbar: HTMLDivElement;
  $panel: HTMLDivElement;
  editorConfig: Partial<IEditorConfig>;
  toolbarConfig: Partial<IToolbarConfig>;
  editor: IDomEditor;
  toolbar: Toolbar;

  constructor(container: string | Element, options?: {}) {
    let target = container;
    if (typeof target === "string") {
      target = document.querySelector(target)!;
    }
    if (!target.getAttribute("id")) {
      target.setAttribute("id", EDITOR_WRAPPER_ID);
    }
    target.classList.add(EDITOR_AREA_CREATED_AT_INITIAL);
    this.$root = target;

    this.editorConfig = {
      placeholder: "请输入",
      MENU_CONF: {
        lineHeight: {
          lineHeightList: ["100%", "150%", "200%"],
        },
        uploadImage: {
          maxFileSize: 10 * 1024 * 1024, // 10Mb
          async customUpload(file: File, insertFn: InsertFnType) {
            // file 即选中的文件
            // insertFn(url, alt, href)
          },
          base64LimitSize: 100 * 1024, // 100kb
        },
      },
    };

    this.toolbarConfig = {
      toolbarKeys: [
        "fontFamily",
        "fontSize",
        "headerSelect",
        // "header1",
        // "header2",
        // "header3",
        // "header4",
        // "header5",
        "lineHeight",
        "bold",
        "underline",
        "italic",
        "through",
        // "code",
        // "sub",
        // "sup",
        "clearStyle",
        "color",
        "bgColor",
        // "indent",
        // "delIndent",
        "justifyLeft",
        "justifyRight",
        "justifyCenter",
        "justifyJustify",
        // {
        //   key: "group-image", // 必填，要以 group 开头
        //   title: "更多样式", // 必填
        //   iconSvg: `<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>`, // 可选
        //   menuKeys: ["insertImage", "uploadImage"], // 下级菜单 key ，必填
        // },
        "uploadImage",
        // "deleteImage",
        // "editImage",
        // "viewImageLink",
        // "imageWidth30",
        // "imageWidth50",
        // "imageWidth100",
        // "divider",
        // "emotion",
        "insertLink",
        // "editLink",
        // "unLink",
        // "viewLink",
        // "codeBlock",
        "blockquote",
        // "todo",
        // "redo",
        // "undo",
        // "fullScreen",
        // "enter",
        "bulletedList",
        "numberedList",
        "insertTable",
        // "deleteTable",
        // "insertTableRow",
        // "deleteTableRow",
        // "insertTableCol",
        // "deleteTableCol",
        // "tableHeader",
        // "tableFullWidth",
        // "insertVideo",
        // "uploadVideo",
        // "editVideoSize",
        // "codeSelectLang",
      ],
    };
  }
  render() {
    this.createToolbarDOM();
    this.createPanelDOM();

    this.editor = createEditor({
      selector: this.$panel,
      html: "",
      config: this.editorConfig,
      mode: "default", // or 'simple'
    });

    console.log(this.editor.getAllMenuKeys());

    this.toolbar = createToolbar({
      editor: this.editor,
      selector: this.$toolbar,
      config: this.toolbarConfig,
      mode: "default", // or 'simple'
    });
  }
  createToolbarDOM() {
    if (this.$toolbar) return;
    const toolbar = document.createElement("div");
    toolbar.classList.add(TOOLBAR_CLASS);
    this.$root.append(toolbar);
    this.$toolbar = toolbar;
  }
  createPanelDOM() {
    if (this.$panel) return;
    const panel = document.createElement("div");
    panel.classList.add(PANEL_CLASS);
    this.$root.append(panel);
    this.$panel = panel;
  }
  setEditorConfig(setConfig: SetConfig<Partial<IEditorConfig>>) {
    setConfig(this.editorConfig);
  }
  setToolbarConfig(setConfig: SetConfig<Partial<IToolbarConfig>>) {
    setConfig(this.toolbarConfig);
  }
}
