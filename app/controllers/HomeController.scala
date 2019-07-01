package controllers

import javax.inject._

import play.api.libs.json._
import play.api.mvc._

import models.Attraction

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {


  def create: Action[JsValue] = Action (parse.json) { implicit request: Request[JsValue] =>
    val attraction = request.body

    val name = (attraction \ "name").asOpt[String].get
    val description = (attraction \ "description").asOpt[String].get
    val location = (attraction \ "location").asOpt[String].get
    val imageUrl = (attraction \ "imageUrl").asOpt[String].get

    val attractionOption = Attraction.createAttraction(name, description, location, imageUrl)

    attractionOption match {
      case Some(_) => Ok(Json.obj("validate" -> "success"))
      case None => Ok(Json.obj("validate" -> "attraction already exists"))
    }
  }

  def editAttraction: Action[JsValue] = Action (parse.json) { implicit request: Request[JsValue] =>
    val attraction = request.body

    val nameHashcode = (attraction \ "nameHash").asOpt[Int].get
    val name = (attraction \ "name").asOpt[String].get
    val description = (attraction \ "description").asOpt[String].get
    val location = (attraction \ "location").asOpt[String].get
    val imageUrl = (attraction \ "imageUrl").asOpt[String].get

    val attractionOption = Attraction.editAttractionByHashcode(nameHashcode, name, description, location, imageUrl)

    attractionOption match {
      case Some(_) => Ok(Json.obj("validate" -> "success"))
      case None => Ok(Json.obj("validate" -> "attraction does not exist"))
    }

    Ok(Json.obj("validate" -> "success"))
  }

  def getAttraction: Action[JsValue] = Action (parse.json) { request: Request[JsValue] =>
      val bodyJson = request.body
      val nameHash: Int = (bodyJson \ "id").validate[Int].getOrElse(0)
      nameHash match {
          case 0 => Unauthorized(Json.obj("attraction" -> "Could not find"))
          case name: Int => {

              val attraction: Attraction = Attraction.getAttractionByNameHashcode(name.##).get

              case class AttractionJson(name: String, description: String, loaction: String, imageUrl: String)

              implicit val AttractionJsonWrites = new Writes[AttractionJson] {
                  def writes(user: AttractionJson) = Json.obj(
                      "name" -> attraction.name,
                      "description" -> attraction.description,
                      "location" -> user.loaction,
                      "imageUrl" -> user.imageUrl,
                  )
              }
              val attractionJson: AttractionJson = AttractionJson(attraction.name, attraction.description,
                  attraction.location, attraction.imageUrl)

              val json: JsValue = Json.toJson(attractionJson)

              Ok(Json.obj("attraction" -> Json.stringify(json)))
          }
      }
  }

  def attractions = Action {

    val attractionList = Attraction.getAttractions

    case class AttractionJson(nameHash: Int, name: String, location: String, description: String, imageUrl: String)

    case class AttractionListJson(attractions: Seq[AttractionJson])

    //TODO: Fix warnings
    implicit val AttractionJsonWrites = new Writes[AttractionJson] {
      def writes(attraction: AttractionJson) = Json.obj(
        "nameHash" -> attraction.nameHash,
        "name" -> attraction.name,
        "location" -> attraction.location,
        "description" -> attraction.description,
        "imageUrl" -> attraction.imageUrl
      )
    }

    implicit  val AttractionListJsonWrites = new Writes[AttractionListJson] {
      def writes(attractionList: AttractionListJson) = Json.obj(
        "attractions" -> attractionList.attractions
      )
    }

    val attractionSeq = for (attraction <- attractionList) yield {
      AttractionJson(attraction("name").hashCode, attraction("name"), attraction("location"),
        attraction("description"), attraction("imageUrl"))
    }

    val attractionListJson = AttractionListJson(attractionSeq)

    val json: JsValue = Json.toJson(attractionListJson)

    Ok(Json.obj("content" -> Json.stringify(json)))
  }
}
