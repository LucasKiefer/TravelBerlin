package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.libs.json.JsValue
import play.api.mvc._

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
        // val firstName = body.get("firstName").get(0)
        // val lastName = body.get("lastName").get(0)
        // val userName = body.get("userName").get(0)
        // val email = body.get("email").get(0)
        // val password = body.get("password").get(0)
        // User.createUser(firstName, lastName, userName, email, password, false)
        println("yah yeet")
        Ok
    }
}
