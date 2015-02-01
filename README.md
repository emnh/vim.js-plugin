# vim.js-plugin
Chrome/Firefox plugin based on vim.js.

Replaces the biggest textarea or CodeMirror per page with vim.js.
There is only support for one vim instance per page because of the way emscripten works (there does exist multiple heap experimental support, but I haven't tried it).
Therefore textareas are editable as files in /root, with names
 - /root/textarea0
 - /root/textarea1
 - ...
 - /root/codemirror0
 - /root/codemirror1
 - ...

It currently doesn't hide the original element, so you can see whether it's updating the content.
TODO: Support replacing Ace editor.

# Alternatives
 - [Windows only: Text Editor Anywhere](http://www.listary.com/text-editor-anywhere) (Works with CodeMirror.)
 - [Firefox plugin: It's all text](https://addons.mozilla.org/en-US/firefox/addon/its-all-text/?src=ss)
 - [Chrome alternatives to It's all text](http://superuser.com/questions/261689/its-all-text-for-chrome)
