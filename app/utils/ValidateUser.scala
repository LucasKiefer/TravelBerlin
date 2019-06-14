package utils

import models.User

case class ValidateUser(email: String, password: String) {

  def isValid: Boolean = {
    User.getUserByEmail(email)
    false
  }
}