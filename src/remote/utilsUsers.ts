// https://stackoverflow.com/a/67758273
// https://stackoverflow.com/a/12019115
export function isValidUsername(username: string) {
  const res = /^(?=.{2,99}$)(?![-_., ])(?!.*[-_.,]{2})(?!.*[-_ ]{2})(?!.*[ ]{1}[,._-])[\p{L}0-9., _-]+(?<![-_, ])$/u.exec(username)
  //            └─────┬────┘└───┬─────┘└─────┬───────┘└─────┬──────┘└──────┬─────────┘└─────┬────────┘└───┬─────┘
  //                  │         │            │              │              │                │             no `-_,space` at the end
  //                  │         │            │              │              │                │
  //                  │         │            │              │              │                allowed characters including unicode letters
  //                  │         │            │              │              │
  //                  │         │            no combinations of `_.,` or `_ space` inside, no space before `,._`
  //                  │         │
  //                  │         no `-_.,space` at the beginning
  //                  │
  //                  username is 2-99 characters long
  // *Note the difference in usage of . (dot) and , (comma)

  const valid = !!res
  return valid
}
