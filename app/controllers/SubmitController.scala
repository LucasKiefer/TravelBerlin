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

        // try{
        //     val firstName = (request.body \ "firstName").asOpt[String].drop(0).head
        //     val lastName = (request.body \ "lastName").asOpt[String].drop(0).head
        //     val userName = (request.body \ "userName").asOpt[String].drop(0).head
        //     val email = (request.body \ "email").asOpt[String].drop(0).head
        //     val password = (request.body \ "password").asOpt[String].drop(0).head
        // } catch {
        //     case nse: NoSuchElementException => throw(nse)
        // }
        // val lastName = body.get("lastName").get(0)
        // val userName = body.get("userName").get(0)
        // val email = body.get("email").get(0)
        // val password = body.get("password").get(0)
        // User.createUser(firstName, lastName, username, email, password, false)
        // val x = (request.body \ "answer").asOpt[String].drop(0).head
        val x = (request.body \ "answer").writes[Int]
        println(x)
        println("yah yeet")
        Ok
    }
}
