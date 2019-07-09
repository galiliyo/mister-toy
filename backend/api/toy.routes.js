const toyService = require("../services/toy.service");
const express = require("express");
const router = express.Router();

module.exports = router;

// Middleware!
function requireAuth(req, res, next) {
  const user = req.session.user;
  if (!user) return res.status(401).send("Unauthenticated");
  next();
}
function requireAdmin(req, res, next) {
  const user = req.session.user;
  if (!user) return res.status(401).send("Unauthenticated");
  if (!user.isAdmin) return res.status(403).send("UnPrivileged");
  next();
}

//toy List
router.get("/", (req, res) => {
  toyService.query().then(toys => {
    res.json(toys);
  });
});

// toy Single
router.get("/:id", (req, res) => {
  const toyId = req.params.id;
  toyService
    .getById(toyId)
    .then(toy => res.json(toy))
    .catch(() => {
      res.status(404).send("UNKNOWN toy");
    });
});

// toy Delete
router.delete("/:id", (req, res) => {
  var user = req.session.user;
  console.log("user is", user);
  const toyId = req.params.id;
  console.log("deleting", toyId);
  toyService
    .remove(toyId)
    .then(() => {
      res.json({});
    })
    .catch(() => {
      res.status(500).send("Could Not Delete");
    });
});

// toy Edit
router.put("/:id", (req, res) => {
  const toy = req.body;
  toyService
    .update(toy)
    .then(toy => res.json(toy))
    .catch(() => {
      res.status(500).send("Could Not Edit");
    });
});

// // toy Add
router.post("/", (req, res) => {
  const toy = req.body;
  toyService
    .add(toy)
    .then(toyWithId => {
      res.json(toyWithId);
    })
    .catch(() => {
      res.status(500).send("Could Not Add");
    });
});

// router.get('/:id', requireAuth, (req, res) => {
//     const toyId = req.params.id
//     toyService.getById(toyId)
//         .then(toy => res.json(toy))
//         .catch(() => {
//             res.status(404).send('UNKNOWN toy')
//         })
// })
