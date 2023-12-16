export default function getProfileImg(fileUrl) {
  if (!fileUrl) {
    return "https://djwpyiaajdldabatncon.supabase.co/storage/v1/object/public/avatars/default_picture.jpg";
  }
  return `https://djwpyiaajdldabatncon.supabase.co/storage/v1/object/public/avatars/${fileUrl}`;
}