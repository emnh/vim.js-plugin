/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, self: false */
function main() {
  var tag = "textarea";
  var i;
  var textareas = document.getElementsByTagName(tag);
  var codemirrors = document.getElementsByClassName("CodeMirror");
  var hasTextArea = (textareas.length > 0);
  if (!hasTextArea) {
    return;
  }
  //console.log("textarea size", textarea.offsetWidth, textarea.offsetHeight);
  var biggest = null;
  var biggestSize = 0;
  var size = 0;
  var codemirror;
  var insertBeforeNode;
  for (i = 0; i < textareas.length; i++) {
    size = textareas[i].offsetWidth * textareas[i].offsetHeight;
    if (size > biggestSize) {
      biggest = textareas[i];
      biggestSize = size;
    }
  }
  for (i = 0; i < codemirrors.length; i++) {
    codemirror = codemirrors[i];
    size = codemirror.offsetWidth * codemirror.offsetHeight;
    if (size > biggestSize) {
      biggest = codemirror;
      biggestSize = size;
    }
  }
  insertBeforeNode = biggest;
  window.shouldLoadVim = true;
  console.log("after");
  var div = document.createElement("div");
  insertBeforeNode.parentNode.insertBefore(div, insertBeforeNode);
  console.log("inserted before", div, insertBeforeNode);
  div.innerHTML = '\
        <div id="vimjs-container" class="container">\
          <canvas id="vimjs-canvas"></canvas>\
          <div style="text-align:center">\
            <h3>Brought to you by <em>Lu Wang</em> and <em>Eivind Magnus Hvidevold</em></h3>\
            <div class="vimjs-loading-container">\
              <div class="vimjs-loading"></div>\
              <div id="vimjs-loading-text">loading...</div>\
            </div>\
          </div>\
        </div>';
  var div2 = document.createElement("div");
  insertBeforeNode.parentNode.insertBefore(div2, insertBeforeNode);
  var baseUrl = "http://coolwanglu.github.io/vim.js/experimental/";
  div2.innerHTML = '\
    <audio id="vimjs-beep" src="' + baseUrl + 'drip.ogg"></audio>\
    <input id="vimjs-file" class="vimjs-invisible" type="file">\
    <div id="vimjs-font-test" class="vimjs-invisible"></div>\
    <div id="vimjs-trigger-dialog" class="modal">\
      <div class="modal-dialog">\
        <div class="modal-content">\
          <div class="modal-header">\
            <h4 class="modal-title">Ugly workaround for Chrome</h4>\
          </div>\
          <div class="modal-body">\
            <button id="vimjs-trigger-button" type="button" class="btn btn-primary">Click Me</button>\
          </div>\
        </div>\
      </div>\
    </div>';
}
self.port.on("loadVim", function(url) {
  console.log("vim url", url);
  if (window.shouldLoadVim) {
    console.log("loading vim");
    self.port.emit("loadVim");
  }
});
main();
