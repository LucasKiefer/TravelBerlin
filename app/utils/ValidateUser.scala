package utils

import models.User
import utils.ValidationStatus.ValidationStatus
import io.github.nremond._
//this import is hashing library: https://github.com/nremond/pbkdf2-scala

case class ValidateUser(email: String, password: String) {

  def isValid: ValidationStatus = {
    val userOption: Option[User] = User.getUserByEmail(email)
    userOption match {
      case None => ValidationStatus.ACCOUNT_NOT_FOUND
      case Some(user: User) => {
        //TODO: do some actual password checking/hashing here later
        if (SecureHash.validatePassword(password, user.getPassword)) ValidationStatus.SUCCESS else ValidationStatus.PASSWORD_INCORRECT
      }
    }
  }
}

object ValidationStatus extends Enumeration {
  type ValidationStatus = Value
  val ACCOUNT_NOT_FOUND, PASSWORD_INCORRECT, SUCCESS = Value
}