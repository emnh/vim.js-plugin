/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, self: false */
var Module = {
  noInitialRun: false,
  noExitRuntime: true,
  //arguments: ['/usr/local/share/vim/example.js'],
  arguments: ['/root/textarea0'],
  preRun: [
    //function() { window.vimjs.pre_run(); },
    function() {
      window.vimjs.pre_run();
      var textareas = document.getElementsByTagName("textarea");
      var i;
      var textarea;
      var tname;
      //window.FS.mkdir("/root");
      for (i = 0; i < textareas.length; i++) {
        textarea = textareas[i];
        tname = "vimtextarea" + i;
        textarea.classList.add(tname);
        window.FS.writeFile("/root/textarea" + i, textarea.value);
      }

      var vimrc = window.FS.readFile('/usr/local/share/vim/vimrc', { encoding: 'utf8' });
      for (i = 0; i < textareas.length; i++) {
        tname = "vimtextarea" + i;
        // slash at the end escapes JS newline
        // slash at the front escapes vimrc newline
        vimrc += "\
        au BufWritePost /root/textarea" + i + " : \n\
        \\ silent !var data = FS.readFile(\"%\", { encoding: \"utf8\" } ); \n\
        \\ var p = document.getElementsByClassName(\"" + tname + "\")[0]; \n\
        \\ p.value = data; \n\
        ";
      }
      window.FS.writeFile('/usr/local/share/vim/vimrc', vimrc);
    }
  ],
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

