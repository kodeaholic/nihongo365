export function passwordValidator(password) {
  if (!password) {
    return 'Vui lòng nhập mật khẩu.';
  }
  if (password.length < 9) {
    return 'Vui lòng nhập mật khẩu nhiều hơn 8 ký tự';
  }
  return '';
}
