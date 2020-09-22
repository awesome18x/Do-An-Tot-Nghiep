import { User } from './user';
import { DVKT } from './dvkt';

export class HSChiDinhDVKT {
    _id: string;
    idPhieuKham: string;
    idBenhAn: string;
    idDVKT: string;
    TenDVKT: string;
    MaDVKT: string;
    NgayYLenh: Date;
    NgayThucHien: Date;
    NgayTao: Date;
    NguoiTao: string;
    NguoiThucHien: string;
    TrangThai: string;
    SoLuong: number;
    KetQua: string;
    GhiChu: string;
    IsBHYT: boolean;
    IsThanhToan: boolean;
    DonGiaBH: number;
    DonGiaDV: number;
}

export class DSChiDinhDVKT {
  _id: string;
  idPhieuKham: string;
  idBenhAn: string;
  idDVKT: DVKT;
  TenDVKT: string;
  MaDVKT: string;
  NgayYLenh: Date;
  NgayThucHien: Date;
  NgayTao: Date;
  NguoiTao: User;
  NguoiThucHien: string;
  TrangThai: string;
  SoLuong: number;
  KetQua: string;
  GhiChu: string;
  IsBHYT: boolean;
  IsThanhToan: boolean;
  DonGiaBH: number;
  DonGiaDV: number;
}
