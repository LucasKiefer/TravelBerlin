package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.libs.json.JsValue
import play.api.libs.json._
import play.api.mvc._
import java.util.NoSuchElementException
import models.User

@Singleton
class SubmitController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    //TODO: Change this so it actually logs in
    def login = Action (parse.formUrlEncoded) { request: Request[Map[String, Seq[String]]] =>
        val body: Map[String, Seq[String]] = request.body
        val name = body.get("userName").get(0)
        val password = body.get("password").get(0)

        Ok("Got request [" + body + "]")
    }

    def register = Action (parse.json) { request: Request[JsValue] =>
        // val body: Map[String, Seq[String]] = request.body

        // val firstName = ""
        // val lastName = ""
        // val email = ""
        // val password = ""
        // val userName = ""
        // try{
            // val firstName = (request.body \ "adminPassword").asOpt[String].get
        //     val lastName = (request.body \ "lastName").asOpt[String].get
        //     val userName = (request.body \ "userName").asOpt[String].get
        //     val email = (request.body \ "email").asOpt[String].get
        //     val password = (request.body \ "password").asOpt[String].get
        //     User.createUser(firstName, lastName, userName, email, password, false)
        // } catch {
            // case nse: NoSuchElementException => {
        //         println("Missing one or more fields")
                // throw(nse)
            // }
        // }
        // println("First Name is: " + firstName)
        // val lastName = body.get("lastName").get(0)
        // val userName = body.get("userName").get(0)
        // val email = body.get("email").get(0)
        // val password = body.get("password").get(0)
        
        // val x = (request.body \ "answer").asOpt[String].drop(0).head
        val userData = request.body
        println(userData)
        // val regAsAdmin = false//(userData \ "regAsAdmin").asOpt[Boolean].get
        // val firstName = ""//(userData \ "firstName").asOpt[String].get
        // val lastName = ""//(userData \ "lastName").asOpt[String].get
        // val email = ""
        // val password = ""
        try {
            // val regAsAdmin = falsej
            // if (regAsAdmin) {
            //     if ((userData \ "adminPassword").asOpt[String].get == "1234") {
            //         //register as admin
            //         regAsAdmin = true
            //     }
            //     else println("false admin attempt")
            // } else {
            //     println("User registered!")
            // }

            val regAsAdminAttempt = (userData \ "regAsAdmin").asOpt[Boolean].get
            val regAsAdmin = regAsAdminAttempt & (userData \ "adminPassword").asOpt[String].get == "1234"
            println("This is an admin: " + regAsAdmin)
            val firstName = (userData \ "firstName").asOpt[String].get
            val lastName = (userData \ "lastName").asOpt[String].get
            val email = (userData \ "email").asOpt[String].get
            val password = (userData \ "password").asOpt[String].get
            // println("regAsAdmin: " + regAsAdmin + "firstName: " + firstName)
            User.createUser(firstName, lastName, email, password, regAsAdmin)
        } catch {
            case nse: NoSuchElementException => throw(nse)
        }
        Ok
    }
}
