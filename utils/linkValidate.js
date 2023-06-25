export const linkValidate = (v) => {
  return /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?|(https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9\-]+)/.test(
    v
  )
}

export const checkLink =
  /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?|(https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9\-]+)/
