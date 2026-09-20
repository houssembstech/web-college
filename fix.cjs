const fs = require('fs');

let err_idx = -1;
let buf = fs.readFileSync('d:/lycee_web/src/index.css');

// Find null bytes in buffer (which usually come from UTF-16LE append)
let cleanBuf = Buffer.from(buf.filter(b => b !== 0));
let text = cleanBuf.toString('utf8');

// remove literal quotes added by echo ""
text = text.replace(/""/g, '');
text = text.trim() + '\n'; // trim any weird end lines

fs.writeFileSync('d:/lycee_web/src/index.css', text);
console.log('Fixed index.css encoding issue');
