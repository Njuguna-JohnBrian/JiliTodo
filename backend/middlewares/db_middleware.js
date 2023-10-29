const { db_helper } = require("../database/helpers/db_helper");
const { db_config } = require("../database/db_config");

const db_middleware = [
  async (req, res, next) => {
    /**
     * get db connection
     */
    const connection = await db_config.client.acquireConnection();

    const db_context = db_helper(connection);

    res.on("close", () => db_config.client.releaseConnection(connection));

    req.db_context = db_context;

    next();
  },
];

module.exports = { db_middleware };
