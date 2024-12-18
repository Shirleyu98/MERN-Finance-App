export interface MonthlyData {
    month: string;
    revenue: number;
    expenses: number;
    operationalExpenses: number;
    nonOperationalExpenses: number;
}

export interface DailyData {
    date: string;
    revenue: number;
    expenses: number;
}

export interface expensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface revenueByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface getKpiResponse {
    id: string;
    _id: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
    monthlyData: Array<MonthlyData>;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: expensesByCategory;
    revenueByCategory: revenueByCategory;
    dailyData: Array<DailyData>;
}

export interface getProductResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
}

export interface getTransactionResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
}

