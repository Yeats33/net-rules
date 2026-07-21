"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptPath = path.resolve(
  __dirname,
  "../scripts/crypto-unlock-check.js",
);

function loadScript() {
  return fs.existsSync(scriptPath) ? fs.readFileSync(scriptPath, "utf8") : "";
}

function runScript(options = {}) {
  const params = options.params === undefined ? "虚拟币交易" : options.params;
  const response = options.response || {
    statusCode: 200,
    body: JSON.stringify({
      blocked: false,
      ip: "203.0.113.10",
      country: "IE",
      region: "",
    }),
  };
  const configurationResponse = options.configurationResponse || {
    ret: { [params]: [params, "爱尔兰节点"] },
  };

  return new Promise((resolve, reject) => {
    let doneCalls = 0;
    let fetchCalls = 0;
    let configurationCalls = 0;
    let fetchOptions;
    let result;

    const watchdog = setTimeout(() => {
      reject(new Error("script did not call $done"));
    }, 250);

    const context = {
      $environment: { params },
      $task: {
        fetch(request) {
          fetchCalls += 1;
          fetchOptions = request;
          return options.fetchError
            ? Promise.reject(options.fetchError)
            : Promise.resolve(response);
        },
      },
      $configuration: {
        sendMessage(message) {
          configurationCalls += 1;
          if (options.configurationError) {
            return Promise.reject(options.configurationError);
          }
          return Promise.resolve(configurationResponse);
        },
      },
      $done(payload) {
        doneCalls += 1;
        if (doneCalls > 1) {
          clearTimeout(watchdog);
          reject(new Error("script called $done more than once"));
          return;
        }
        result = payload;
        setImmediate(() => {
          clearTimeout(watchdog);
          resolve({
            payload: result,
            doneCalls,
            fetchCalls,
            configurationCalls,
            fetchOptions,
          });
        });
      },
      clearTimeout,
      console: { log() {} },
      Promise,
      setTimeout,
    };

    vm.runInNewContext(loadScript(), context, { filename: scriptPath });
  });
}

test("shows Polymarket availability through the selected policy", async () => {
  // Given: Polymarket reports an eligible Irish exit and QX resolves its chain.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      blocked: false,
      ip: "203.0.113.10",
      country: "IE",
      region: "",
    }),
  };

  // When: the interaction task runs for the selected crypto policy.
  const result = await runScript({ response });

  // Then: the panel reports availability, location, IP, route, and one finish.
  assert.equal(result.payload.title, "虚拟币服务查询");
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ✅ 可用/);
  assert.match(result.payload.htmlMessage, /🇮🇪 IE \/ -/);
  assert.match(result.payload.htmlMessage, /203\.0\.113\.10/);
  assert.match(result.payload.htmlMessage, /虚拟币交易 ➟ 爱尔兰节点/);
  assert.equal(result.doneCalls, 1);
  assert.equal(result.fetchCalls, 1);
  assert.equal(result.configurationCalls, 1);
  assert.equal(result.fetchOptions.opts.policy, "虚拟币交易");
});

test("shows a restriction when Polymarket blocks the selected exit", async () => {
  // Given: Polymarket reports that a British exit is blocked.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      blocked: true,
      ip: "203.0.113.11",
      country: "GB",
      region: "LND",
    }),
  };

  // When: the interaction task checks that exit.
  const result = await runScript({ response });

  // Then: the panel reports the official geographic restriction.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> 🚫 地区受限/);
  assert.match(result.payload.htmlMessage, /🇬🇧 GB \/ LND/);
});

test("shows a response-format error for malformed Polymarket JSON", async () => {
  // Given: the endpoint returns a successful HTTP response with invalid JSON.
  const response = { statusCode: 200, body: "{" };

  // When: the interaction task parses the response.
  const result = await runScript({ response });

  // Then: the panel explains that the response format is invalid.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ⚠️ 响应格式异常/);
  assert.equal(result.doneCalls, 1);
});

test("shows a response-format error when a required field is missing", async () => {
  // Given: the endpoint omits the required blocked boolean.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      ip: "203.0.113.12",
      country: "IE",
      region: "",
    }),
  };

  // When: the interaction task validates the API boundary.
  const result = await runScript({ response });

  // Then: the incomplete payload is rejected instead of treated as available.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ⚠️ 响应格式异常/);
});

test("shows the HTTP status when Polymarket returns a non-success response", async () => {
  // Given: the endpoint is temporarily unavailable.
  const response = { statusCode: 503, body: "Service Unavailable" };

  // When: the interaction task receives that response.
  const result = await runScript({ response });

  // Then: the panel includes the exact HTTP status.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ⚠️ HTTP 503/);
});

test("shows a timeout when the selected exit does not answer in time", async () => {
  // Given: QX rejects the request with a timeout error.
  const fetchError = new Error("request timeout");

  // When: the interaction task checks the selected exit.
  const result = await runScript({ fetchError });

  // Then: the panel uses a stable localized timeout message.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ⚠️ 检测超时/);
});

test("shows a network error when the request fails for another reason", async () => {
  // Given: QX rejects the request because the connection was reset.
  const fetchError = new Error("connection reset");

  // When: the interaction task checks the selected exit.
  const result = await runScript({ fetchError });

  // Then: implementation details are replaced with a stable network error.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ⚠️ 网络异常/);
});

test("asks for a long-pressed node or policy when no selection is provided", async () => {
  // Given: the task is launched without a QX interaction selection.
  const params = "";

  // When: the script starts.
  const result = await runScript({ params });

  // Then: it explains the correct launch path without sending a request.
  assert.match(result.payload.htmlMessage, /请长按节点或策略后运行此任务/);
  assert.equal(result.fetchCalls, 0);
  assert.equal(result.configurationCalls, 0);
  assert.equal(result.doneCalls, 1);
});

test("keeps the Polymarket result when policy-state lookup fails", async () => {
  // Given: the geoblock request succeeds but QX cannot resolve the policy chain.
  const configurationError = new Error("configuration API unavailable");

  // When: the interaction task renders the result.
  const result = await runScript({ configurationError });

  // Then: availability remains visible and the selected policy is the fallback.
  assert.match(result.payload.htmlMessage, /Polymarket:<\/b> ✅ 可用/);
  assert.match(result.payload.htmlMessage, /<b>节点:<\/b> 虚拟币交易/);
  assert.equal(result.doneCalls, 1);
});

test("escapes API and policy values before rendering HTML", async () => {
  // Given: boundary values contain HTML-significant characters.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      blocked: false,
      ip: "203.0.113.10&probe",
      country: "IE",
      region: "<west>",
    }),
  };
  const configurationResponse = {
    ret: { 虚拟币交易: ["虚拟币交易", "<script>alert(1)</script>"] },
  };

  // When: the interaction task builds its HTML panel.
  const result = await runScript({ response, configurationResponse });

  // Then: untrusted values are escaped and cannot create markup.
  assert.doesNotMatch(result.payload.htmlMessage, /<script>/);
  assert.match(result.payload.htmlMessage, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(result.payload.htmlMessage, /&lt;west&gt;/);
  assert.match(result.payload.htmlMessage, /203\.0\.113\.10&amp;probe/);
});

test("omits a flag when the country is not a two-letter code", async () => {
  // Given: the endpoint returns a nonstandard country label.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      blocked: false,
      ip: "203.0.113.13",
      country: "UNKNOWN",
      region: "",
    }),
  };

  // When: the result panel is rendered.
  const result = await runScript({ response });

  // Then: the code remains visible but no misleading flag is generated.
  assert.match(result.payload.htmlMessage, /出口位置:<\/b> UNKNOWN \/ -/);
  assert.doesNotMatch(result.payload.htmlMessage, /🇺🇳/);
});
