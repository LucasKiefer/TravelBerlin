package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.libs.json.JsValue
import play.api.libs.json._
import play.api.mvc._
import java.util.NoSuchElementException
import models.User
import utils.ValidateUser

//TODO: possibly put this entire think in HomeController.scala
@Singleton
class SubmitController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    //TODO: Change this so it actually logs in
    def login = Action (parse.json) { request: Request[JsValue] =>
        println(request.body)
        Ok
        // val userLogin = request.body

        // try {
        //     val email = (userLogin \ "email").asOpt[String].get
        //     val password = (userLogin \ "password").asOpt[String].get
        //     val validated = ValidateUser(email, password).isValid
        //     if (validated) Ok("true") else Ok("false")
        // } catch {
        //     case nse: NoSuchElementException => throw(nse)
        //     NotAcceptable
        // }
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
        Ok
    }
}