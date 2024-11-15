const versionInt = require("./config.js");
const jsforce = require("jsforce");

const reportUpdate = async (data) => {
   try {
      const conn = new jsforce.Connection({
         instanceUrl: data.instanceUrl,
         accessToken: data.accessToken,
         version: versionInt,
      });
      let report = await conn.analytics.report(data.reportId);
      const result = await report.execute();
      return result;
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
module.exports = reportUpdate;
