export function validate(v, file) {
  const e = {};
  if (v.name.trim().length < 3) e.name = 'Enter your full name (at least 3 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!/^(?:\+880|880|0)1[3-9]\d{8}$/.test(v.phone.trim())) e.phone = 'Enter a valid Bangladesh mobile number.';
  if (v.password.length < 8 || !/[A-Za-z]/.test(v.password) || !/\d/.test(v.password)) e.password = 'Use at least 8 characters with letters and numbers.';
  if (!['web','design','python','ielts'].includes(v.course)) e.course = 'Please select a course.';
  const birth = new Date(v.birthDate + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  if (!v.birthDate || Number.isNaN(birth.getTime())) e.birthDate = 'Please enter a valid date of birth.';
  else if (birth > today) e.birthDate = 'Date of birth cannot be in the future.';
  if (!file) e.image = 'Please upload a profile image.';
  else if (!['image/jpeg','image/png','image/webp'].includes(file.type)) e.image = 'Only JPG, PNG and WebP images are allowed.';
  else if (file.size > 2 * 1024 * 1024) e.image = 'Image must be 2 MB or smaller.';
  return e;
}
