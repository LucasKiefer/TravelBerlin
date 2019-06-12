package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._

@Singleton
class SubmitController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    def login = Action { request =>
        val body: AnyContent = request.body
        print(body)
        Ok("Got request [" + request + "]")
    }
}
