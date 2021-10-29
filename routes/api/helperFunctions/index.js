module.exports.respond404 = (req, res, detail = "Resource not found") => {
  res.status(404).json({
    status: "404",
    title: "Resource not found",
    detail: `${detail}`,
  });
};

module.exports.respondSuccess = (req, res, detail = "Success") => {
  res.status(200).json({
    status: "200",
    title: "Success",
    detail: `${detail}`,
  });
};

module.exports.respond400 = (req, res, detail = "Bad request") => {
  res.status(400).json({
    status: "400",
    title: "Bad request",
    detail: `${detail}`,
  });
};
