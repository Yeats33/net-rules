"use strict";

var TITLE = "虚拟币服务查询";
var GEOBLOCK_URL = "https://polymarket.com/api/geoblock";
var policy = $environment.params.trim();
var completed = false;

function finish(payload) {
  if (completed) {
    return;
  }
  completed = true;
  $done(payload);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function countryFlag(country) {
  if (!/^[A-Z]{2}$/.test(country)) {
    return "";
  }
  return String.fromCodePoint(
    country.charCodeAt(0) + 127397,
    country.charCodeAt(1) + 127397,
  );
}

function renderResult(geo, route) {
  var country = geo.country.toUpperCase();
  var region = geo.region || "-";
  var flag = countryFlag(country);
  var location =
    (flag ? flag + " " : "") +
    escapeHtml(country) +
    " / " +
    escapeHtml(region);
  var availability = geo.blocked ? "🚫 地区受限" : "✅ 可用";
  var lines = [
    "<b>Polymarket:</b> " + availability,
    "<b>出口位置:</b> " + location,
    "<b>出口 IP:</b> " + escapeHtml(geo.ip),
    "<b>节点:</b> " + escapeHtml(route),
  ];

  return {
    title: TITLE,
    htmlMessage:
      '<p style="text-align: center; font-family: -apple-system; font-size: large">' +
      lines.join("</br></br>") +
      "</p>",
  };
}

function renderError(message) {
  return {
    title: TITLE,
    htmlMessage:
      '<p style="text-align: center; font-family: -apple-system; font-size: large">' +
      "<b>Polymarket:</b> ⚠️ " +
      escapeHtml(message) +
      "</br></br><b>节点:</b> " +
      escapeHtml(policy) +
      "</p>",
  };
}

function parseGeoblockResponse(response) {
  if (response.statusCode !== 200) {
    throw new Error("HTTP " + response.statusCode);
  }

  var geo;
  try {
    geo = JSON.parse(response.body);
  } catch (error) {
    throw new Error("响应格式异常");
  }

  if (
    typeof geo.blocked !== "boolean" ||
    typeof geo.ip !== "string" ||
    typeof geo.country !== "string" ||
    typeof geo.region !== "string"
  ) {
    throw new Error("响应格式异常");
  }

  return geo;
}

if (!policy) {
  finish(renderError("请长按节点或策略后运行此任务"));
} else {
  var geoblockRequest = $task.fetch({
    url: GEOBLOCK_URL,
    method: "GET",
    timeout: 8000,
    opts: { policy: policy },
    headers: {
      Accept: "application/json",
      "User-Agent": "Quantumult X Crypto Availability Check",
    },
  });

  var policyRequest = $configuration.sendMessage({
    action: "get_policy_state",
    content: policy,
  }).then(function (response) {
    var state = response && response.ret ? response.ret[policy] : null;
    if (Array.isArray(state)) {
      return state.join(" ➟ ");
    }
    return state ? String(state) : policy;
  }).catch(function () {
    return policy;
  });

  Promise.all([geoblockRequest, policyRequest]).then(function (values) {
    var geo = parseGeoblockResponse(values[0]);
    finish(renderResult(geo, values[1]));
  }).catch(function (error) {
    var message = error && error.message ? error.message : "响应格式异常";
    if (/timeout|timed out/i.test(message)) {
      message = "检测超时";
    } else if (message !== "响应格式异常" && !/^HTTP \d+$/.test(message)) {
      message = "网络异常";
    }
    finish(renderError(message));
  });
}
