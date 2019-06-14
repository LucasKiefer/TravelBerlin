package controllers

import javax.inject._

import play.api.libs.json._
import play.api.mvc._

import models.Attraction

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

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
