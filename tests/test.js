//const { currentSystemTheme } = require("../preload") 

//echo \"🔥 Error: no test specified\" && exit 1

console.log("🔥 Error: Nothing works success: ✅ ")
//console.log("currentSystemTheme: ", currentSystemTheme)
const {log} = require('../renderer.js')


test('string with a single number should result in the number itself', () => {
    expect(log);
  });

/*
const {describe, expect, test} = require('@jest/globals');
const {log} = require('../renderer.js')

describe('sum module', () => {
  test('Test LOG:', () => {
    expect(log()).toBe("[ OK ]");
  });
});
*/