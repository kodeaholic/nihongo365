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
      return 'từ vựng';
    case TEST_TYPES.CHUHAN:
      return 'chữ Hán';
    case TEST_TYPES.NGUPHAP:
      return 'ngữ pháp';
    case TEST_TYPES.TIMNGHIA:
      return 'tìm nghĩa đúng của câu và từ';
    case TEST_TYPES.GHEPCAU:
      return 'ghép thành câu hoàn chỉnh';
  }
};
