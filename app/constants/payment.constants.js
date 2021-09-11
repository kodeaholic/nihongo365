import { numberToCurrencyFormat } from '../helpers/currency';

export const SERVICES = {
  N5: {
    price: 0,
    label: 'N5',
    priceTag: numberToCurrencyFormat(0),
    description: 'Miễn phí trọn bộ giáo trình N5',
  },
  N4: {
    price: 100000,
    label: 'N4',
    priceTag: numberToCurrencyFormat(100000),
    description: 'Học + thi trọn đời, không giới hạn',
  },
  N3: {
    price: 200000,
    label: 'N3',
    priceTag: numberToCurrencyFormat(200000),
    description: 'Học + thi trọn đời, không giới hạn',
  },
  N2: {
    price: 300000,
    label: 'N2',
    priceTag: numberToCurrencyFormat(300000),
    description: 'Học + thi trọn đời, không giới hạn',
  },
  N1: {
    price: 500000,
    label: 'N1',
    priceTag: numberToCurrencyFormat(500000),
    description: 'Học + thi trọn đời, không giới hạn',
  },
  // VIP: {
  //   price: 2000000,
  //   label: 'VIP',
  //   priceTag: numberToCurrencyFormat(200000),
  // },
  REMOVE_ADS: {
    price: 50000,
    label: 'Bỏ quảng cáo',
    expirable: true,
    priceTag: numberToCurrencyFormat(50000),
    description: 'Loại bỏ hoàn toàn quảng cáo',
  },
};

export const TARGET_BANK_ACCOUNT = {
  TPBANK: {
    bankName: 'Ngân hàng TMCP Tiên Phong (TPB)',
    branch: 'TPbank Mỹ Đình',
    ownerAccount: '00334981402',
    ownerName: 'THEN VAN DUC',
    ownerPhone: '0379269357',
    ownerEmail: 'adm.nihongo365@gmail.com',
  },
};

export const OWNER_INFO = {
  ownerPhone: '0379269357',
  ownerEmail: 'adm.nihongo365@gmail.com',
};

export const COLORS = {
  N5: 'rgba(241, 130, 141,1)',
  N4: 'rgba(165, 55, 253, 1)',
  N3: 'rgba(0, 181, 204, 1)',
  N2: 'rgba(63, 195, 128, 1)',
  N1: 'rgba(241, 90, 34, 1)',
  REMOVE_ADS: 'rgba(78, 205, 196, 1)',
};

export const STATUS = {
  NEW: { label: 'Chưa đăng ký', value: 'NEW', buttonTitle: 'Đăng ký' },
  PENDING: {
    label: 'Chờ xác nhận',
    value: 'PENDING',
    buttonTitle: 'Chờ xác nhận',
  },
  SUCCESS: {
    label: 'Đã thanh toán',
    value: 'SUCCESS',
    buttonTitle: 'Đã thanh toán',
  },
  CANCELLED: {
    label: 'Đã bị hủy',
    value: 'CANCELLED',
    buttonTitle: 'Đăng ký',
  },
  FREE: { label: 'Miễn phí', value: 'FREE', buttonTitle: '' },
};
