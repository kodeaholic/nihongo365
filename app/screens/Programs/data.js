import { apiConfig } from '../../api/config/apiConfig';

export const PROGRAM_IDS = {
  TUVUNG: 1,
  CHUHAN: 2,
  GRAMMAR: 3,
  NGHE: 4,
  HOITHOAI: 5,
  READING: 6,
  LUYENTHI: 7,
  THITHU: 8,
};

export const PROGRAM_TYPES = {
  1: 'TUVUNG',
  2: 'CHUHAN',
  3: 'GRAMMAR',
  4: 'NGHE',
  5: 'HOITHOAI',
  6: 'READING',
  7: 'LUYENTHI',
  8: 'THITHU',
};

export const DATA = [
  {
    id: PROGRAM_IDS.TUVUNG,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '04/03/2020',
    startTime: '10:30 AM',
    endTime: '10:30 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Từ vựng',
    description: 'Học theo cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.CHUHAN,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '11:00 AM',
    endTime: '13:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Chữ Hán',
    description: 'Học theo cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.GRAMMAR,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Ngữ pháp',
    description: 'Học theo cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.NGHE,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Luyện nghe',
    description: 'Học theo cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.HOITHOAI,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Luyện hội thoại',
    description: 'Học theo cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.READING,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Luyện đọc',
    description: 'Học theo cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.LUYENTHI,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Luyện thi',
    description: 'Chọn từng cấp độ',
    available: true,
  },
  {
    id: PROGRAM_IDS.THITHU,
    name: 'Văn Đức sensei',
    sex: 'M',
    date: '05/03/2020',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    tags: ['N5', 'N4', 'N3', 'N2', 'N1'],
    avatar: `${apiConfig.baseUrl}/avatars/logo.jpg`,
    program: 'Thi thử',
    description: 'Chọn từng cấp độ',
    available: true,
  },
];
