package controllers

import javax.inject._
import play.api.libs.json.Json
import play.api.libs.json.JsValue
import play.api.mvc._
import java.util.NoSuchElementException

import models.User
import utils.{ValidateUser, ValidationStatus}
import utils.ValidationStatus.ValidationStatus

//TODO: Set a timeout in the cookies
@Singleton
class UserController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    def login = Action (parse.json) { implicit request: Request[JsValue] =>

        val userLogin = request.body

        try {
            val email = (userLogin \ "email").asOpt[String].get
            val password = (userLogin \ "password").asOpt[String].get
            val validated: ValidationStatus = ValidateUser(email, password).isValid

            if (validated == ValidationStatus.SUCCESSFUL) {
                val user: User = User.getUserByEmail(email).get
                Ok(Json.obj("validate" -> "success")).withSession(
                    "email" -> user.getEmail + "firstName" -> user.getFirstName +
                      "last_name" -> user.getLastName
                )
            }
            else if (validated == ValidationStatus.PASSWORD_INCORRECT) Ok(
                Json.obj("validate" -> "password incorrect"))
            else Ok(Json.obj("validate" -> "account not found"))

        } catch {
             case nse: NoSuchElementException => throw(nse)
             Ok(Json.obj("validate" -> "form not filled"))
        }
    }

    def register = Action (parse.json) { request: Request[JsValue] =>

        val userData = request.body

        try {
            val regAsAdminAttempt = (userData \ "regAsAdmin").asOpt[Boolean].get
            val regAsAdmin = regAsAdminAttempt & (userData \ "adminPassword").asOpt[String].get == "1234"
            println("This is an admin: " + regAsAdmin)
            val firstName = (userData \ "firstName").asOpt[String].get
            val lastName = (userData \ "lastName").asOpt[String].get
            val email = (userData \ "email").asOpt[String].get
            val password = (userData \ "password").asOpt[String].get
            User.createUser(firstName, lastName, email, password, regAsAdmin)
        } catch {
            case nse: NoSuchElementException => throw(nse)
        }
        //TODO: checks if registration was successful
        Ok(Json.obj("success" -> true))
    }
}