// const jsforce = require('jsforce');

import version from "./config";

const upsert = async (data) => {
   /** try {
    const conn = new jsforce.Connection({
      instanceUrl: data.instanceUrl,
      accessToken: data.accessToken,
    });
    const result = await conn
      .sobject(data.objectName)
      .upsert(data.records, data.externalId, {
        allOrNone: false,
      });
    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  } */
   const records = data.records.map((record) => {
      return { ...record, attributes: { type: data.objectName } };
   });
   try {
      const response = await fetch(
         `${data.instanceUrl}/services/data/${version}/composite/sobjects/${data.objectName}/${data.externalId}`,
         {
            method: "PATCH",
            body: JSON.stringify({ allOrNone: false, records }),
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${data.accessToken}`,
            },
         }
      );
      return response.json();
   } catch (err) {
      return {
         success: false,
         error: err.message,
      };
   }
};
export default upsert;
