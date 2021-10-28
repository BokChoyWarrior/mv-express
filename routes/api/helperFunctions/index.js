module.exports.respond404 = async (req, res) => {
  await res.status(404).json({
    status: "404",
    title: "Resource not found",
    detail: `Resource not found`,
  });
};
