// https://stackoverflow.com/a/67758273
// https://stackoverflow.com/a/12019115

export function isValidUsername(username: string) {
  const res = /^[a-z0-9_\.]+$/.exec(username)
  const valid = !!res
  return valid
}
