import { PhongKham } from './phongkham';

export class User {
    _id: string;
    username: string;
    hoten: string;
    hocvi: string;
    CCHN: string;
    khoaphong: PhongKham;
    active: boolean;
}
