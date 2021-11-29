const Vote = require("../model/votes");

const router = require("express").Router();

router.post("/new", async (req, res) => {
  const { event, coming, notcoming, maybe } = req.body;
  try {
    const vote = await Vote.findOne({ event: event });
    if (vote) {
      vote.votes = vote.votes + 1;
      vote.coming = Number(coming) + vote.coming;
      vote.notcoming = Number(notcoming) + vote.notcoming;
      vote.maybe = Number(maybe) + vote.maybe;
      await vote.save();
    } else {
      const votes = 1;
      const newVote = {
        event,
        votes,
        coming,
        notcoming,
        maybe,
      };

      await new Vote(newVote).save();
    }
    return res.status(200).json({ status: 1 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 0 });
  }
});

router.get("/:event", async (req, res) => {
  const event = req.params.event;
  try {
    const vote = await Vote.findOne({ event: event }).populate({
      path: "event",
      model: "Event",
        select: "-guests -_id -createdAt -updatedAt -__v",
      populate:{
        path: "user",
        model: "User",
          select: "-password -email -_id -createdAt -updatedAt -__v",
      }
    });

    return res.status(200).json({ status: 1, data: vote });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 0 });
  }
});

module.exports = router;
