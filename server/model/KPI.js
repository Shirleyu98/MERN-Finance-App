import mongoose from "mongoose";
import {loadType} from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);
const Currency = mongoose.Types.Currency;

const daySchema = new Schema(
    {
        date: String,
        revenue: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        expenses: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
    },
    { toJSON: { getters: true } }
);

const monthSchema = new Schema(
    {
        month: String,
        revenue: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        expenses: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        operationalExpenses: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        nonOperationalExpenses: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
    },
    { toJSON: { getters: true } }
);

const KPISchema = new mongoose.Schema(
    {
        totalProfit: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        totalRevenue: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        totalExpenses: {
            type: Currency,
            currency: "USD",
            get: (v) => `${v / 100}`,
        },
        expensesByCategory: {
            type: Map,
            of: {
                type: Currency,
                currency: "USD",
                get: (v) => `${v / 100}`,
            },
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;