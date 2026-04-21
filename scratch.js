const fs = require('fs');
const file = '/Users/seth/Documents/GitHub/919designs/src/pages/CustomBuild.jsx';
let content = fs.readFileSync(file, 'utf8');

// replace text-xs, text-[9px], text-[10px], text-[11px]
content = content.replace(/\btext-(xs|\[9px\]|\[10px\]|\[11px\])\b/g, 'text-sm');

// replace the qty input color logic
content = content.replace(
  /className=\{`w-full h-full bg-transparent p-3 text-center outline-none focus:ring-inset focus:ring-1 focus:ring-primary font-bold \$\{isExhausted \? 'text-outline\/30' : 'text-on-surface'\}`\}/g,
  "className={`w-full h-full bg-transparent p-3 text-center outline-none focus:ring-inset focus:ring-1 focus:ring-primary font-bold ${isExhausted ? 'text-outline/30' : (remQty !== 0 ? 'text-primary' : 'text-on-surface')}`}"
);

fs.writeFileSync(file, content);
console.log("Done");
