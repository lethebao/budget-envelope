const express = require("express");
const envelopesRouter = express.Router()
const {
  getEnvelopes,
  addEnvelope,
  getEnvelopeById,
  deleteEnvelope,
	updateEnvelope,
	transfer,
} = require("../controllers/envelopes");

envelopesRouter.get("/:id",getEnvelopeById)
envelopesRouter.post("/",addEnvelope)
envelopesRouter.put("/:id",updateEnvelope)
envelopesRouter.delete("/:id", deleteEnvelope);
envelopesRouter.post('/:fromId/transfer/:toId', transfer);


module.exports = envelopesRouter

module.exports = envelopesRouter;
