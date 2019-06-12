package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.libs.json.JsValue
import play.api.mvc._

import java.io.FileInputStream;

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {



  def appSummary = Action {

    // val stream = new FileInputStream("attractions.json")
    // val json = try {  Json.parse(stream) } finally { stream.close() }

    val json: JsValue = Json.parse("""
      {
        "name": "G27",
        "location": "idk I just follow lucas",
        "description": "it's neet i guess"
      }
    """)

    // Ok(Json.stringify(json))
    // Ok(Json.obj("description" -> "from home controller"))
    // Ok(Json.obj("content" -> "Scala Play React Seed"))
    Ok(Json.obj("content" -> Json.stringify(json)))
  }
}
