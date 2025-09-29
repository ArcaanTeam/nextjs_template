require("dotenv").config();

module.exports = {
  petstore: {
    output: {
      mode: "tags-split",
      target: "./src/gen/api",
      schemas: "./src/gen/schemas",
      mock: true,
      baseUrl: {
        getBaseUrlFromSpecification: true,
      },
    },
    input: {
      target: process.env.BASE_OPENAPI_JSON_URL,
    },
    hooks: {
      afterAllFilesWrite: ["prettier --write"],
    },
  },
  petstoreZod: {
    output: {
      client: "zod",
      mode: "single",
      target: "./src/gen/zod",
    },
    input: {
      target: process.env.BASE_OPENAPI_JSON_URL,
    },
    hooks: {
      afterAllFilesWrite: ["prettier --write"],
    },
  },
};
