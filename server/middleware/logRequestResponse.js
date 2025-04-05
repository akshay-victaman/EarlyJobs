const logger = require('../services/logger.service');
const { v4: uuidv4 } = require('uuid');

function logRequestResponse(req, res, next) {
  const requestId = uuidv4();
  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  const startTime = Date.now();
  const chunks = [];

  // Capture response body by overriding res.write and res.end
  const oldWrite = res.write;
  const oldEnd = res.end;

  res.write = function (chunk) {
    chunks.push(chunk);
    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);
    oldEnd.apply(res, arguments);
  };

  // Capture request details
  const requestData = {
    method: req.method,
    endpoint: req.path,
    query_params: req.query,
    headers: { ...req.headers },
    body: req.body,
    client_ip: req.ip,
  };

  // Exclude sensitive headers
  delete requestData.headers.authorization;

  // Log after response is sent
  function log() {
    const latency = Date.now() - startTime;
    const responseBody = Buffer.concat(chunks).toString('utf8');
    const responseData = {
      status_code: res.statusCode,
      body: responseBody,
    };

    const logData = {
      requestId: req.requestId,
      request: requestData,
      response: responseData,
      latency_ms: latency,
    };

    if (res.statusCode >= 400) {
      logger.error('API Error', logData);
    } else {
      logger.info('API Success', logData);
    }
  }

  res.on('finish', log);
  next();
}

module.exports = logRequestResponse;