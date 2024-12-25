export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log(`IP: ${clientIp}`);
  console.log(`User-Agent: ${req.headers['user-agent']}`);

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response sent:`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Duration: ${duration}ms`);
    console.log('-------------------');
  });

  next();
};