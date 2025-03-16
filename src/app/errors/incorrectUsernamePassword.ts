//  this is for custom incorrect username and password error.

export class IncorrectUsernamePassword extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'IncorrectUsernamePassword'
  }
}
