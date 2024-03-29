package controllers

import javax.inject._
import play.api.libs.json._
import play.api.mvc._
import models.{Attraction, CommentBean}

import scala.collection.JavaConverters._


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

    val id = (attraction \ "id").asOpt[Int].get
    val name = (attraction \ "name").asOpt[String].get
    val description = (attraction \ "description").asOpt[String].get
    val location = (attraction \ "location").asOpt[String].get
    val imageUrl = (attraction \ "imageUrl").asOpt[String].get

    val attractionOption = Attraction.editAttractionByHashcode(id, name, description, location, imageUrl)

    attractionOption match {
      case Some(_) => Ok(Json.obj("validate" -> "success"))
      case None => Ok(Json.obj("validate" -> "attraction does not exist"))
    }

    Ok(Json.obj("validate" -> "success"))
  }

  def getAttraction: Action[JsValue] = Action (parse.json) { request: Request[JsValue] =>
    val bodyJson = request.body
    val id: Int = (bodyJson \ "id").validate[Int].getOrElse(0)
    id match {
      case 0 => Unauthorized(Json.obj("attraction" -> "Could not find"))
      case name: Int => {

        val attraction: Attraction = Attraction.getAttractionByNameHashcode(name.##).get

        case class AttractionJson(name: String, description: String, location: String, imageUrl: String,
                                  comments: Seq[CommentJson])

        case class CommentJson(authorEmail: String, commentStr: String, rating: Int)

        case class CommentListJson(comments: Seq[CommentJson])

        implicit val CommentJsonWrites = new Writes[CommentJson] {
          def writes(comment: CommentJson) = Json.obj(
            "authorEmail" -> comment.authorEmail,
            "commentStr" -> comment.commentStr,
            "rating" -> comment.rating
          )
        }

        implicit val CommentListJsonWrites = new Writes[CommentListJson] {
          def writes(commentList: CommentListJson) = Json.obj(
            "comments" -> commentList.comments
          )
        }

        val commentSeq = (for (comment <- attraction.getComments.asScala.values) yield
          CommentJson(comment.authorEmail, comment.commentStr, comment.rating)).toList

        implicit val AttractionJsonWrites = new Writes[AttractionJson] {
            def writes(user: AttractionJson) = Json.obj(
                "name" -> attraction.name,
                "description" -> attraction.description,
                "location" -> user.location,
                "imageUrl" -> user.imageUrl,
                "comments" -> commentSeq
            )
        }

        val attractionJson: AttractionJson = AttractionJson(attraction.name, attraction.description,
          attraction.location, attraction.imageUrl, commentSeq)

        val json: JsValue = Json.toJson(attractionJson)


        Ok(Json.obj("attraction" -> Json.stringify(json)))
      }
    }
  }

  def attractions: Action[AnyContent] = Action {

    val attractionList = Attraction.getAttractions

    //for (attraction <- attractionList) println(Try(attraction("comments")).getOrElse("No comments"))

    case class AttractionJson(id: Int, name: String, location: String, description: String, imageUrl: String)

    case class AttractionListJson(attractions: Seq[AttractionJson])

    implicit val AttractionJsonWrites = new Writes[AttractionJson] {
      def writes(attraction: AttractionJson) = Json.obj(
        "id" -> attraction.id,
        "name" -> attraction.name,
        "location" -> attraction.location,
        "description" -> attraction.description,
        "imageUrl" -> attraction.imageUrl,
      )
    }

    implicit  val AttractionListJsonWrites = new Writes[AttractionListJson] {
      def writes(attractionList: AttractionListJson) = Json.obj(
        "attractions" -> attractionList.attractions
      )
    }

    val attractionSeq = for (attraction <- attractionList) yield
      AttractionJson(attraction("name").hashCode, attraction("name"), attraction("location"),
        attraction("description"), attraction("imageUrl"))

    val attractionListJson = AttractionListJson(attractionSeq)

    val json: JsValue = Json.toJson(attractionListJson)

    Ok(Json.obj("content" -> Json.stringify(json)))
  }

  
  def createComment: Action[JsValue] = Action (parse.json) { implicit request: Request[JsValue] =>
    val commentRequest = request.body

    val attractionName = (commentRequest \ "name").asOpt[String].get
    val author = (commentRequest \ "author").asOpt[String].get
    val comment = (commentRequest \ "comment").asOpt[String].get
    val rating = (commentRequest \ "rating").asOpt[Int].get

    val attractionOption = Attraction.addCommentByAttractionHashcode(attractionName.##, author, comment, rating)

    attractionOption match {
      case Some(_) => Ok(Json.obj("validate" -> "success"))
      case None => Ok(Json.obj("validate" -> "attraction already exists"))
    }
  }

  def editComment: Action[JsValue] = Action (parse.json) { implicit request: Request[JsValue] =>

    val commentRequest = request.body

    val attractionName = (commentRequest \ "name").asOpt[String].get
    val author = (commentRequest \ "author").asOpt[String].get
    val comment = (commentRequest \ "comment").asOpt[String].get
    val rating = (commentRequest \ "rating").asOpt[Int].get

    val attractionOption = Attraction.editComment(attractionName.##, author, comment, rating)

    attractionOption match {
      case Some(_) => Ok(Json.obj("validate" -> "success"))
      case None => Ok(Json.obj("validate" -> "attraction already exists"))
    }
  }

  def deleteComment: Action[JsValue] = Action (parse.json) { implicit request: Request[JsValue] =>

    val commentRequest = request.body

    val attractionName = (commentRequest \ "name").asOpt[String].get
    val author = (commentRequest \ "author").asOpt[String].get

    val attractionOption = Attraction.deleteComment(attractionName.##, author)

    attractionOption match {
      case Some(_) => Ok(Json.obj("validate" -> "success"))
      case None => Ok(Json.obj("validate" -> "attraction already exists"))
    }
  }
}
