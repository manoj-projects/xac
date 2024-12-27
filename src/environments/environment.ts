// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  // ==========================================Production=================================================//

  //  loginApiBaseUrl: 'https://emislogin.tnschools.gov.in/emis_login/api/login',

  
  ////////////// Currently Used ////////////////
  //  apiBaseUrl: 'https://emis2.tnschools.gov.in',

  // ==========================================Staging ===============================================//

  // loginApiBaseUrl: "http://13.232.216.80/emis_login/api/login",

  ///////////// Currently Used /////////////

  // apiBaseUrl: "http://13.232.216.80/staffcounselling_backendAPI",
  // apiBaseUrl: "http://13.232.216.80/emis2APICode",

  // For Node URL Staging
  apiBaseUrl: "http://13.126.113.175:3000",
  // apiBaseUrl: "http://localhost:3000",
  loginApiBaseUrl: "https://tng2c2.tnschools.gov.in/emis_login/api/elogin",

  // production live Node URL
  // loginApiBaseUrl: 'https://emislogin.tnschools.gov.in/emis_login/api/elogin',
  // apiBaseUrl: "https://emis5.tnschools.gov.in",


  apibaseurlg2c:"http://13.232.216.80/g2c",
  loginAuthorization: "EMIS@2019_api",
  loggedInAuthorization: "EMIS_web@2019_api",
  authorization: "EMIS_web@2019_api",
  apiBaseUrl1:
    "https://24iv009qs1.execute-api.ap-south-1.amazonaws.com/emis-prod",
  getSignedUrlApi:
    "https://d8omnqcdi1.execute-api.ap-south-1.amazonaws.com/staging-resource-collection-mgmt/resource-collection-mgmt/resource-preurl",
  readingFileApi:
    "https://d8omnqcdi1.execute-api.ap-south-1.amazonaws.com/staging-resource-collection-mgmt/resource-collection-mgmt/resource-listurl",
  authorization1: "xYwjU0aw0iar8dNgpKrlE39s2pxXdyuk9kqtMVAA",
  apiBaseUrl2:
    "https://731fou5s3g.execute-api.ap-south-1.amazonaws.com/Production/",
  authorization2: "xYwjU0aw0iar8dNgpKrlE39s2pxXdyuk9kqtMVAA",
  apiBaseUrl3: 'https://5388d2qb88.execute-api.ap-south-1.amazonaws.com/MobilePrd/',
  authorization3: '3dPWrCiAyS96cjq8HFf21XLjEkFnOgU9mJVZUla7',
  dikshaUrl: "https://preprod.ntp.net.in",
  production: false,
  environment: "LOCAL",
  showEnvironment: true,
};