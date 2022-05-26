describe("Register custom keyword", function() {
  it("function called", function() {
    var schema = {
      customKeyword: "A"
    };
    var data = {};

    tv4.defineKeyword("customKeyword", function() {
      return "Custom failure";
    });

    var result = tv4.validateMultiple(data, schema, false, true);
    assert.isFalse(result.valid, "Must not be valid");
    assert.deepEqual(
      result.errors[0].message,
      "Keyword failed: customKeyword (Custom failure)"
    );
  });

  it("custom error code", function() {
    var schema = {
      customKeywordFoo: "A"
    };
    var data = "test test test";

    tv4.defineKeyword("customKeywordFoo", function(data, value) {
      return {
        code: "CUSTOM_KEYWORD_FOO",
        message: { data: data, value: value }
      };
    });
    tv4.defineError("CUSTOM_KEYWORD_FOO", 123456789, "{value}: {data}");

    var result = tv4.validateMultiple(data, schema, false, true);
    assert.isFalse(result.valid, "Must not be valid");
    assert.deepEqual(result.errors[0].message, "A: test test test");
    assert.deepEqual(result.errors[0].code, 123456789);
  });

  it("custom error code (numeric)", function() {
    var schema = {
      customKeywordBar: "A"
    };
    var data = "test test test";

    tv4.defineKeyword("customKeywordBar", function(data, value) {
      return {
        code: 1234567890,
        message: { data: data, value: value }
      };
    });
    tv4.defineError("CUSTOM_KEYWORD_BAR", 1234567890, "{value}: {data}");

    var result = tv4.validateMultiple(data, schema, false, true);
    assert.isFalse(result.valid, "Must not be valid");
    assert.deepEqual(result.errors[0].message, "A: test test test");
    assert.deepEqual(result.errors[0].code, 1234567890);
  });

  it("restrict custom error codes", function() {
    assert.throws(function() {
      tv4.defineError("CUSTOM_KEYWORD_BLAH", 9999, "{value}: {data}");
    });
  });

  it("restrict custom error names", function() {
    assert.throws(function() {
      tv4.defineError("doesnotmatchpattern", 10002, "{value}: {data}");
    });
  });

  it("can't defined the same code twice", function() {
    assert.throws(function() {
      tv4.defineError("CUSTOM_ONE", 10005, "{value}: {data}");
      tv4.defineError("CUSTOM_TWO", 10005, "{value}: {data}");
    });
  });

  it("function can return existing (non-custom) codes", function() {
    var schema = {
      type: "object",
      properties: {
        aStringValue: {
          type: "string",
          "my-custom-keyword": "something"
        },
        aBooleanValue: {
          type: "boolean"
        }
      }
    };
    var data = {
      aStringValue: "a string",
      aBooleanValue: true
    };

    tv4.defineKeyword("my-custom-keyword", function() {
      return { code: 0, message: "test" };
    });

    var result = tv4.validateMultiple(data, schema, false, true);
    assert.equal(result.errors[0].code, tv4.errorCodes.INVALID_TYPE);
  });

  it("function only called when keyword present", function() {
    var schema = {
      type: "object",
      properties: {
        aStringValue: {
          type: "string",
          "my-custom-keyword": "something"
        },
        aBooleanValue: {
          type: "boolean"
        }
      }
    };
    var data = {
      aStringValue: "a string",
      aBooleanValue: true
    };

    var callCount = 0;
    tv4.defineKeyword("my-custom-keyword", function() {
      callCount++;
    });

    tv4.validateMultiple(data, schema, false, true);
    assert.deepEqual(
      callCount,
      1,
      "custom function must be called exactly once"
    );
  });

  it("function knows dataPointerPath", function() {
    var schema = {
      type: "object",
      properties: {
        obj: {
          type: "object",
          properties: {
            test: {
              "my-custom-keyword": "something",
              type: "string"
            }
          }
        }
      }
    };
    var data = { obj: { test: "a string" } };

    var path = null;
    tv4.defineKeyword("my-custom-keyword", function(
      data,
      value,
      schema,
      dataPointerPath
    ) {
      path = dataPointerPath;
    });

    tv4.validateMultiple(data, schema, false, true);
    assert.strictEqual(
      path,
      "/obj/test",
      "custom function must know its context path"
    );
  });
});

// demo

const tv4 = require("tv4");
var schema = {
  required: ["name", "age"],
  properties: {
    age: {
      // 这个是引用的自定义的key
      customKeywordBar: "年龄超过范围"
    }
  }
};
var data = {
  name: "ivan",
  age: 211
};

tv4.defineKeyword("customKeywordBar", function(data, value, schema) {
  // data是你放在哪个层级就是哪个层级的值
  console.log(schema);
  if (data > 100) {
    return {
      code: tv4.errorCodes.CUSTOM_KEYWORD_BAR,
      message: {
        data: "Age",
        value: data + "" + value,
        desc: "这是一个描叙信息"
      }
    };
  }
  return null;
});

tv4.defineError("CUSTOM_KEYWORD_BAR", 1234567890, "{value}: {data} ({desc})");

// var result = tv4.validateMultiple(data, schema, false, true);

// result.errors.forEach(error => {
//   console.log(error.message)
//   console.log(error.code)
// })

// var result = tv4.validateResult(data, schema, false, true);
// console.log(result.valid)
// console.log(result.error.message)
// console.log(result.error.code)

var result = tv4.validateResult(data, schema);
console.log(JSON.stringify(result));
// console.log(result.error.message)
// console.log(result.error.code)

// 自定义错误报告
const tv4 = require("tv4");

var api = tv4.freshApi();

var data = {
  name: "iavan",
  age: 22,
  personinfo: {
    moneny: -19
  }
};
var schema = {
  type: "object",
  required: ["name", "age", "personinfo"],
  properties: {
    personinfo: {
      type: "object",
      properties: {
        moneny: {
          type: "number",
          minimum: 0
        }
      }
    }
  }
};
api.setErrorReporter(function(error, data, schema) {
  if (error.code === 101) {
    return data + "的最小值是：" + schema.minimum;
  }
  return error.message;
});

var res = api.validateResult(data, schema);
console.log(res.error.dataPath);
console.log(res.error.message);
console.log(res.error.code);
