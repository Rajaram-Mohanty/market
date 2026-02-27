import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types/orderTypes";
import type { Seller } from "../../types/sellerTypes";
import type { User } from "../../types/userTypes";
import { api } from "../../config/api";


export interface Transaction {
    id: number;
    customer: User;
    order: Order;
    seller: Seller;
    date: string;
}

interface TransactionState {
    transactions: Transaction[];
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
};

export const fetchTransactionsBySeller = createAsyncThunk<
    Transaction[],
    string,
    { rejectValue: string }
>('transactions/fetchTransactionsBySeller', async (jwt, { rejectWithValue }) => {
    try {
        const response = await api.get<Transaction[]>('/api/transactions/seller', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        console.log('fetchTransactionsBySeller', response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue('Failed to fetch transactions');
    }
});

export const fetchAllTransactions = createAsyncThunk<
    Transaction[],
    string,
    { rejectValue: string }
>('transactions/fetchAllTransactions', async (jwt, { rejectWithValue }) => {
    try {
        const response = await api.get<Transaction[]>('/api/transactions', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue('Failed to fetch all transactions');
    }
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Transactions By Seller
            .addCase(fetchTransactionsBySeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsBySeller.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch All Transactions
            .addCase(fetchAllTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchAllTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default transactionSlice.reducer;