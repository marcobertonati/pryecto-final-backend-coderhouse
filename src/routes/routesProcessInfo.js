const { processInfo } = require("../utils/processInfo");
const { isAdmin } = require("../auth/isAdmin");

module.exports = (router) => {
  router.get("/info", isAdmin, (req, res, next) => {
    res.render("./pages/server-info", { processInfo });
  });
  return router;
};
