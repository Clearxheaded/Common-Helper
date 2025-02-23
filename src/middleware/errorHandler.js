export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === 'MulterError') {
    return res.status(400).json({
      error: 'File upload error',
      message: err.message
    });
  }

  res.status(500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
} 