const bootstrap = (app, express) => {
  app.use(express.json());

  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  });
};

export default bootstrap;
