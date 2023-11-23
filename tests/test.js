const { currentSystemTheme } = require("../preload") 

//echo \"🔥 Error: no test specified\" && exit 1

console.log("🔥 Error: no test specified")
//console.log("currentSystemTheme: ", currentSystemTheme)

test('string with a single number should result in the number itself', () => {
    expect(currentSystemTheme);
  });