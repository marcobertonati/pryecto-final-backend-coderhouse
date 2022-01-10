const log4js = require("log4js");

log4js.configure({
  appenders: {
    logConsole: { type: "console" },
    logErrorFile: { type: "file", filename: "error.log" },
    logWarnFile: { type: "file", filename: "warn.log" },
  },
  categories: {
    default: { appenders: ["logConsole"], level: "info" },
    myError: { appenders: ["logErrorFile", "logConsole"], level: "error" },
    myWarn: { appenders: ["logWarnFile", "logConsole"], level: "warn" },
    myTrace: { appenders: ["logConsole"], level: "trace" },
  },
});

const loggers = {
  loggerDefault: log4js.getLogger(),
  loggerError: log4js.getLogger("myError"),
  loggerWarn: log4js.getLogger("myWarn"),
  loggerTrace: log4js.getLogger("myTrace"),
};

module.exports = loggers;
