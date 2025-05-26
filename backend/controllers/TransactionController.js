const transectionModel = require("../models/transactionModel");
const moment = require("moment");


const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
          date: {
            $gt: moment().subtract(Number(frequency), "d").toDate(),
          },
        }
        : {

          date: {
            $gte: selectedDate[0],
            $lte: selectedDate[1],
          },

        }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),

    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  }
};

const addTransaction = async (req, res) => {
  try {

    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,

};