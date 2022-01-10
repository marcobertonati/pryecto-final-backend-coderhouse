/*Numero de procesadores en servidor */
const numberCPUs = require("os").cpus().length;

/* Argumentos de Entrada */
const argvArray = [];
process.argv.forEach((val, index) => {
  argvArray.push(val);
});
const exectPath = process.argv.slice(1, 2);

exports.processInfo = {
  entryArgv: argvArray,
  plattaformName: process.platform,
  nodeVersion: process.version,
  memoryUsage: process.memoryUsage(),
  execPath: exectPath,
  processId: process.pid,
  folderName: process.cwd(),
  numberOfCPUS: numberCPUs,
};
