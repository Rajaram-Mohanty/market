export interface PickupAddress {
    name: string;
    mobile: string;
    pinCode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export interface BankDetails {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
}

export interface BusinessDetails {
    businessName: string;
    businessEmail: string;
    businessMobile: string;
    logo: string;
    banner: string;
    businessAddress: string;
}

export interface Seller {
    id?: number;
    mobile: string;
    otp:string;
    GSTIN: string;
    pickupAddress: PickupAddress;
    email: string;
    password?: string;
    bankDetails: BankDetails;
    sellerName: string;
    businessDetails: BusinessDetails;
    accountStatus?: string;
    
}

export interface SellerReport {
    id: number;
    seller: Seller;
    totalEarnings: number;
    totalSales: number;
    totalRefund: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
}