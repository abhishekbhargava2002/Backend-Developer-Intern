const Financial = require("../models/financial.model");
const mongoose = require("mongoose");

const dashboardSummary = async (req, res) => {
  try {
    const adminId = req.user.id;

    const data = await Financial.aggregate([
      {
        $match: {
          adminId: new mongoose.Types.ObjectId(adminId),
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: null,

          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0],
            },
          },

          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    const result = data[0] || {
      totalIncome: 0,
      totalExpense: 0,
    };

    const netTotal = result.totalIncome - result.totalExpense;

    res.status(200).json({
      success: true,
      message: "Dashboard Data",
      data: {
        totalIncome: result.totalIncome,
        totalExpense: result.totalExpense,
        netTotal,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const categoryTypeSummary = async (req, res) => {
  try {
    const adminId = req.user.id;

    const data = await Financial.aggregate([
      {
        $match: {
          adminId: new mongoose.Types.ObjectId(adminId),
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const result = {};

    data.forEach((item) => {
      const category = item._id.category;
      const type = item._id.type;

      if (!result[category]) {
        result[category] = { Income: 0, Expense: 0 };
      }

      result[category][type] = item.total;
    });

    res.status(200).json({
      success: true,
      message: "Category Type Summary",
      data: result,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { dashboardSummary, categoryTypeSummary };
