package controllers

import javax.inject._
import play.api.mvc._
import java.util.NoSuchElementException

import models.User
import play.api.libs.json._
import utils.{ValidateUser, ValidationStatus}
import utils.ValidationStatus.ValidationStatus

//TODO: Set a timeout in the cookies
@Singleton
class UserController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    def login: Action[JsValue] = Action (parse.json) { implicit request: Request[JsValue] =>

        val userLogin = request.body

        try {
            val email = (userLogin \ "email").asOpt[String].get
            val password = (userLogin \ "password").asOpt[String].get
            val validated: ValidationStatus = ValidateUser(email, password).isValid

            if (validated == ValidationStatus.SUCCESS) {
                val user: User = User.getUserByEmail(email).get
                Ok(Json.obj("validate" -> "success")).withSession("email" -> user.getEmail)
            }
            else if (validated == ValidationStatus.PASSWORD_INCORRECT) Ok(
                Json.obj("validate" -> "password incorrect"))
            else Ok(Json.obj("validate" -> "account not found"))

        } catch {
             case nse: NoSuchElementException => throw(nse)
             Ok(Json.obj("validate" -> "form not filled"))
        }
    }

    def register: Action[JsValue] = Action (parse.json) { request: Request[JsValue] =>

        val userData = request.body

        val regAsAdminAttempt = (userData \ "regAsAdmin").asOpt[Boolean].get
        val regAsAdmin = regAsAdminAttempt & (userData \ "adminPassword").asOpt[String].get == "1234"
        val firstName = (userData \ "firstName").asOpt[String].get
        val lastName = (userData \ "lastName").asOpt[String].get
        val email = (userData \ "email").asOpt[String].get
        val password = (userData \ "password").asOpt[String].get
        //TODO: Put a block on this somehow
        val userOption = User.createUser(firstName, lastName, email, password, regAsAdmin)
        if (firstName == "" || lastName == "" || email == "" || password == "")
            Ok(Json.obj("validate" -> "form not filled"))
        else userOption match {
                case Some(user: User) => Ok(Json.obj("validate" -> "success"))
                  .withSession("email" -> user.getEmail)
                case None => Ok(Json.obj("validate" -> "email used"))
            }
    }

    def edit: Action[JsValue] = Action (parse.json) { request: Request[JsValue] =>

        val bodyJson = request.body
        val email = request.session.get("email").get

        val firstName: String = (bodyJson \ "firstName").validate[String].getOrElse("")
        val lastName: String = (bodyJson \ "lastName").validate[String].getOrElse("")
        val birthYear: Int = (bodyJson \ "birthYear").validate[Int].getOrElse(0)
        val interests: List[String] = (bodyJson \ "interests").validate[List[String]].getOrElse(List())
        val homeTown: String = (bodyJson \ "homeTown").validate[String].getOrElse("")

        val userOption = User.editUserByEmail(email, firstName, lastName, birthYear, interests, homeTown)

        userOption match {
            case None => Ok(Json.obj("validate" -> "edit not successful"))
            case Some(_) => Ok(Json.obj("validate" -> "success"))
        }
    }

    def getUser: Action[JsValue] = Action (parse.json) { request: Request[JsValue] =>

        val email: Option[String] =  request.session.get("email")

        email match {
            case Some(emailVal: String) => {

                val user: User = User.getUserByEmail(emailVal).get

                case class UserJson(firstName: String, lastName: String, email: String, isAdmin: Boolean,
                                    birthYear: Int, homeTown: String, interests: List[String])

                implicit val UserJsonWrites = new Writes[UserJson] {
                    def writes(user: UserJson) = Json.obj(
                        "firstName" -> user.firstName,
                        "lastName" -> user.lastName,
                        "email" -> user.email,
                        "isAdmin" -> user.isAdmin,
                        "birthYear" -> user.birthYear,
                        "homeTown" -> user.homeTown,
                        "interests" -> user.interests
                    )
                }

                val userJson: UserJson = UserJson(user.firstName, user.lastName, user.email, user.admin, user.birthYear,
                    if (user.homeTown == null) "" else user.homeTown,
                    if (user.interests == null) List() else user.interests.split(",").toList)

                val json: JsValue = Json.toJson(userJson)

                Ok(Json.obj("user" -> Json.stringify(json)))
            }
            case None => Unauthorized(Json.obj("user" -> "Not logged in"))
        }
    }

    def logout: Action[JsValue] = Action { Ok(Json.obj("validate" -> "success").withNewSession }
}