export const linkValidate = (v) => {
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?#?([\w.-]*)*$/i.test(
    v
  )
}
