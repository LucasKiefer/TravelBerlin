package controllers

import javax.inject._

import play.api.libs.json._
import play.api.mvc._

import models.Attraction

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {



//  def appSummary = Action {
//
//    // val stream = new FileInputStream("attractions.json")
//    // val json = try {  Json.parse(stream) } finally { stream.close() }
//
//    val json: JsValue = Json.parse("""
//    [
//        {
//          "name": "G27",
//          "location": "idk I just follow lucas",
//          "description": "it's neet i guess"
//        },
//        {
//          "name": "G28",
//          "location": "big meme",
//          "description": "ecksdeee"
//        }
//    ]
//    """)
//
//    // Ok(Json.stringify(json))
//    // Ok(Json.obj("description" -> "from home controller"))
//    // Ok(Json.obj("content" -> "Scala Play React Seed"))
//    Ok(Json.obj("content" -> Json.stringify(json)))
//  }

  def attractions = Action {

    val attractionList = Attraction.getAttractions

    case class AttractionJson(name: String, location: String, description: String)

    case class AttractionListJson(attractions: Seq[AttractionJson])

    //TODO: Fix warnings
    implicit val AttractionJsonWrites = new Writes[AttractionJson] {
      def writes(attraction: AttractionJson) = Json.obj(
        "name" -> attraction.name,
        "location" -> attraction.location,
        "description" -> attraction.description
      )
    }

    implicit  val AttractionListJsonWrites = new Writes[AttractionListJson] {
      def writes(attractionList: AttractionListJson) = Json.obj(
        "attractions" -> attractionList.attractions
      )
    }

    val attractionSeq = for (attraction <- attractionList) yield {
      AttractionJson(attraction("name"), attraction("location"), attraction("description"))
    }

    val attractionListJson = AttractionListJson(attractionSeq)

    val json: JsValue = Json.toJson(attractionListJson)

    println(json)

    Ok(Json.obj("content" -> Json.stringify(json)))
  }
}
