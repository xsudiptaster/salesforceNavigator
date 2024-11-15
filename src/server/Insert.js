const versionInt = require("./config.js");
const jsforce = require("jsforce");

const insert = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      const result = await conn.sobject(data.objectName).create(data.records, { allOrNone: false, allowRecursive: true });
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = insert;
