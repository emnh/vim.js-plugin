/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, self: false */
function main() {
  var tag = "textarea";
  var i;
  var elements = document.getElementsByTagName(tag);
  console.log("helo from page mod");
  var hasTextArea = (elements.length > 0);
  if (!hasTextArea) {
    return;
  }
  var textarea = elements[0];
  console.log("textarea size", textarea.offsetWidth, textarea.offsetHeight);
  var hasBigTextArea = textarea.offsetWidth * textarea.offsetHeight > 100*24;
  if (!hasBigTextArea) {
    return;
  }
  for (i = 0; i < elements.length; i++) {
    console.log("element", elements[i]);
  }
  window.shouldLoadVim = true;
  console.log("after");
  var Module = {
    noInitialRun: false,
    noExitRuntime: true,
    arguments: ['/usr/local/share/vim/example.js'],
    preRun: [ function() { window.vimjs.pre_run(); } ],
    postRun: [],
    print: function() { 
      if (console.group !== undefined) {
        console.group.apply(console, arguments); 
        console.groupEnd();
      } else {
        // IE
        console.log(arguments);
      }
    },
    printErr: function() { 
      if (console.group !== undefined) {
        console.group.apply(console, arguments); 
        console.groupEnd();
      } else {
        // IE
        console.log(arguments);
      }
    },
  };
  window.Module = Module;
  var div = document.createElement("div");
  textarea.parentNode.insertBefore(div, textarea);
  console.log("inserted before", div, textarea);
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
  textarea.parentNode.insertBefore(div2, textarea);
  var baseUrl = "http://192.168.100.128:8000/";
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
  //div2.innerHTML += "<script src=\"" + self.data.url("vim.js") + "\"></script>";
  var script = document.createElement("script");
  //script.src = "http://coolwanglu.github.io/vim.js/experimental/vim.js";
  script.src = "http://192.168.100.128:8000/vim.js";
  script.async = true;
  //document.body.appendChild(script);
}
self.port.on("loadVim", function(url) {
  console.log("vim url", url);
  if (window.shouldLoadVim) {
    console.log("loading vim");
    self.port.emit("loadVim");
  }
});
main();
