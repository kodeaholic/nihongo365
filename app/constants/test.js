export const TEST_TYPES = {
  TUVUNG: 1,
  CHUHAN: 2,
  NGUPHAP: 3,
  TIMNGHIA: 4,
  GHEPCAU: 5,
};

export const getTestTypeName = type => {
  switch (type) {
    case TEST_TYPES.TUVUNG:
      return 'Phần từ vựng';
    case TEST_TYPES.CHUHAN:
      return 'Phần chữ Hán';
    case TEST_TYPES.NGUPHAP:
      return 'Phần ngữ pháp';
    case TEST_TYPES.TIMNGHIA:
      return 'Tìm nghĩa đúng của câu và từ';
    case TEST_TYPES.GHEPCAU:
      return 'Ghép thành câu hoàn chỉnh';
  }
};
