package utils

import models.User
import utils.ValidationStatus.ValidationStatus

case class ValidateUser(email: String, password: String) {

  def isValid: ValidationStatus = {
    val userOption: Option[User] = User.getUserByEmail(email)
    userOption match {
      case None => ValidationStatus.ACCOUNT_NOT_FOUND
      case Some(user: User) => {
        //TODO: do some actual password checking/hashing here later
        if (password == user.getPassword) ValidationStatus.SUCCESSFUL else ValidationStatus.PASSWORD_INCORRECT
      }
    }
  }
}

object ValidationStatus extends Enumeration {
  type ValidationStatus = Value
  val ACCOUNT_NOT_FOUND, PASSWORD_INCORRECT, SUCCESSFUL = Value
}