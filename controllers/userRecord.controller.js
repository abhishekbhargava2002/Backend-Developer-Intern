const User = require("../models/user.model");
const Financial = require("../models/financial.model");

const createFinancial = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount, type and category are required",
      });
    }

    const financial = await Financial.create({
      userId: req.user.id,
      amount,
      type,
      category,
      date,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Financial record created successfully",
      data: financial,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getFinancials = async (req, res) => {
  try {
    let { page = 1, limit = 10, type, category } = req.query;

    page = Math.max(parseInt(page), 1);
    limit = Math.min(parseInt(limit), 50);
    const skip = (page - 1) * limit;

    // 2. Filter
    const filter = { isDeleted: false };

    if (type) {
      filter.type = { $regex: `^${type}$`, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const financialRecords = await Financial.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const cleanedRecords = financialRecords.filter(
      (item) => item.userId !== null,
    );

    const total = await Financial.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Financial records fetched successfully",
      data: cleanedRecords,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in getFinancials:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFinancialById = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Financial.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateFinancial = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, notes } = req.body;

    const record = await Financial.findOne({
      _id: id,
      userId: req.user.id,
      isDeleted: false,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    if (amount) {
      record.amount = amount;
    }
    if (type) {
      record.type = type;
    }
    if (category) {
      record.category = category;
    }
    if (notes) {
      record.notes = notes;
    }

    await record.save();
    res.json({
      success: true,
      message: "Record updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteFinancial = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Financial.findOneAndDelete({
      _id: id,
      userId: req.user.id,
      isDeleted: false,
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Record deleted successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createFinancial,
  getFinancials,
  getFinancialById,
  updateFinancial,
  deleteFinancial,
};
