module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js"],
    verbose: true,
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

  }