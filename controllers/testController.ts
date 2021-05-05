
import { Router as router } from "express";

const testController = router();

testController.get("/", (req, res) => {
  const body = req.query;
  res.render('testView', { viewName: 'view name from model', model: Object.keys(body).length > 0 ? JSON.stringify(body) : null })
});

export default testController;