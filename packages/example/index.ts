import CreateRichEditor from "rich-editor";
import lodash from "lodash";

const instance = new CreateRichEditor(document.querySelector(".editor")!);

instance.setEditorConfig((editorConfig) => {
  editorConfig.onChange = lodash.debounce(function (editor) {
    const html = editor.getHtml();
    console.log("editor content", html);
    // 也可以同步到 <textarea>
  }, 1000);
});

instance.render();
