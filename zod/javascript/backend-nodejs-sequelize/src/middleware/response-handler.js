const responseHandler = (err, req, res, next) => {
  if (err) {
    const { status = 500, message = 'Internal Server Error' } = err;
    console.error(`[ERROR] ${status}: ${message}`);

    return res.status(status).json({ message });
  }

  if (res.locals.data !== undefined) {
    const statusCode = res.statusCode && res.statusCode >= 100 && res.statusCode < 600 ? res.statusCode : 200;

    return res.status(statusCode).json(res.locals.data);
  }

  return next();
};

export default responseHandler;
