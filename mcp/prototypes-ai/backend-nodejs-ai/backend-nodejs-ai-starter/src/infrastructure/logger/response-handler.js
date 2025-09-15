const responseHandler = (req, res, next) => {
  if (res.headersSent) return next()
  const statusCode = res.locals.statusCode || 200
  const data = res.locals.data || null
  res.status(statusCode).json({
    success: true,
    data
  })
}

export default responseHandler

