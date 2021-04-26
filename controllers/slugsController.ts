import { Router as router } from "express";

const slugsController = router();

// some async code
const getFullSlugName = async (slug: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(`Promise-resolved slug: ${slug}`);
    }, 1000)
  });
};

slugsController.param("slug", (req, res, next, slug) => {
  console.log("Getting slug info, as route has :slug param");
  
  getFullSlugName(slug).then((val) => {
    req.slug = val;
    console.log("Resolved slug :", req.slug);
    next();
  });
});

slugsController.get("/:slug/test", (req, res) => {
  res.json({
    slug: req.slug,
  });
});

slugsController.get("/hehe", (req, res) => {
  res.send("heeh");
});

export default slugsController;
