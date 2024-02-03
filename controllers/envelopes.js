const dbEnvelopes = require("../config/db");
const { findById, deleteById } = require("../helpers/helpers");
const envelopesRouter = require("../routes/envelopes");

// mock retrieval of real db with async/await
exports.getEnvelopes = async (req,res,next) => {
    try {
      const envelopes = await dbEnvelopes;
      res.status(200).send(envelopes);
  
    }catch (error) {
      res.status(400).send(err);
    }
  }

// add envelopes
exports.addEnvelope = async (req,res,next) => {
    try {
        const {title, budget} = req.body;
        const envelopes = dbEnvelopes;
        const newId = createId(envelopes);
        const newEnvelope = {
            id: newId,
            title: title,
            budget: budget
        }
        Envelopes.push(newEnvelope)
        res.status(201).send(newEnvelope)
    }catch (err) {
        res.status(500).send("error")
    }
}

// get single envelopes
exports.getEnvelopeById = async (req,res,next) => {
    try {
        const {id } = req.params;
        const envelopes = await(dbEnvelopes)
        const foundEnvelope = findById(Envelopes,id)
        if(!envelope) {
            return res.status(404).send({
                message: "envelope not found"
            })
        }
        return res.status(200).send(envelope);
    }catch (err) {
        res.status(500).send(err);
    }
}

exports.updateEnvelope = async (req,res,next) => {
    try {
        const {title, budget} = req.body;
    const {id} = req.params
    const envelopes = await dbEnvelopes;
    const envelope = findById(envelopes,id);
    if(!envelope) {
        return res.status(404).send({
            message: "Envelope Not Found",
          });
    }
    envelope.title = title;
    envelope.budget = budget;
    res.status(201).send(envelopes)
    }catch (err) {
        res.status(500).send(err)
    }

}

exports.deleteEnvelope = async (req,res,next) => {
    try {
        const envelopes = await dbEnvelopes;
        const {id} = req.params;
        const envelope = findById(envelopes,id)
        const updateEnvelopes = deleteById(envelopes,id);

        if (!envelope) {
            return res.status(404).send({
              message: "Envelope Not Found",
            });
          }

        return res.status(204).send(updateEnvelopes)
    }catch(err) {
        res.status(500).send(err)
    }
}

exports.transfer = async (req,res,next) => {
    try {
        const envelopes = await dbEnvelopes;
        const { fromId, toId } = req.params;
        const { amount } = req.body;

        const originEnv = findById(envelopes, fromId);
        const destinationEnv = findById(envelopes, toId);

        if (!originEnv || !destinationEnv) {
            return res.status(404).send({
              message: "Envelope Not Found",
            });
        }

        if (originEnv.budget < amount) {
			return res.status(400).send({
				message: "Amount to transfer exceeds envelope budget funds"
			})
		}

        originEnv.budget -= amount;
		destinationEnv.budget += amount;

        return res.status(201).send(originEnv);
    } catch (err) {
		res.status(500).send(err);
	}
}



