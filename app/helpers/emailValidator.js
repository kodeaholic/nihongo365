export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return 'Vui lòng nhập email của bạn.';
  }
  if (!re.test(email)) {
    return 'Vui lòng nhập đúng địa chỉ email của bạn.';
  }
  return '';
}
