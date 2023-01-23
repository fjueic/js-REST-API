const e = require("express");
const express = require("express");
const router = express.Router();
const Subscriber = require("../subscriber");

// Get all subscribers

router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one subscriber

router.get("/:id", getSubscriberById, async (req, res) => {
    res.json(res.subscriber);
});

// Create one subscriber

router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subcribedTo: req.body.subcribedTo,
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one subscriber

router.patch("/:id", getSubscriberById, async (req, res) => {
    if (req.body.name!=null) {
        console.log("name is not provided");
        res.subscriber.name = req.body.name;
    }
    if (req.body.subcribedTo!=null) {
        res.subscriber.subcribedTo = req.body.subcribedTo;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one subscriber

router.delete("/:id", getSubscriberById, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: "subscriber removed" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getSubscriberById(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber)
            return res.status(404).json({ message: "subscriber not found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;
