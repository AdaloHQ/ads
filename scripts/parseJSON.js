#!/usr/bin/env node

// Util function to do a DFS on the proton bundle
const traverseObject = (obj, callback) => {
  // Array
  if (Array.isArray(obj)) {
    return obj.map((child) => traverseObject(child, callback));
  }

  // Non-object
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  for (let child of Object.values(obj)) {
    traverseObject(child, callback);
  }

  callback(obj);
};

const [, , ...args] = process.argv;
if (args.length !== 2) {
  console.error(
    "Usage:\n\n node install_android.js [PROJECT_PATH] [PLATFORM_ID]\n"
  );
  process.exit(1);
}
let project_path = args[0];
let platform_id = args[1];
let fs = require("fs");
let rawData = fs.readFileSync(project_path + "/proton-bundle.json");
let protonBundle = JSON.parse(rawData);
let appID;
appId =
  protonBundle.libraryGlobals["@adalo/ads"]["Ads"][`${platform_id}Global`];

if (appId) {
  let appIDFinal = appID.replace(/\s/g, "");
  console.log(appIDFinal);
} else {
  traverseObject(protonBundle, (node) => {
    if (node[platform_id]) {
      appID = node[platform_id];
    }
  });
  let appIDFinal = appID.replace(/\s/g, "");
  console.log(appIDFinal);
}
