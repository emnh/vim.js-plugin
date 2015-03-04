/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
var buttons = require('sdk/ui/button/action');
var tag = "textarea";
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");

function handleClick(state) {
  console.log(state);
  //tabs.open("https://www.mozilla.org/");
  require("sdk/tabs").activeTab.attach({
    contentScriptFile: self.data.url("load-vim.js")
  });
}

var button = buttons.ActionButton({
  id: "mozilla-link",
    label: "Load Vim",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
  },
  onClick: handleClick
});

pageMod.PageMod({
  include: "*",
  contentScriptFile: self.data.url("load-vim.js"),
  contentStyleFile: self.data.url("vim.css"),
  onAttach: function(worker) {
    worker.port.emit("loadVim");
    worker.port.on("loadVim", function() {
      console.log("attaching vim");
      worker.tab.attach({
        contentScriptFile: [
          self.data.url("vim-pre.js"),
          self.data.url("vim.js")
          //"http://coolwanglu.github.io/vim.js/emterpreter/vim.js"
        ]
      });
    });
  }
});
