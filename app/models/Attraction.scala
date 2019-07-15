package models


import scala.beans.BeanProperty
import com.firebase4s.App
import com.firebase4s.database._
import java.io.File
import java.io.FileInputStream

import scala.concurrent._
import ExecutionContext.Implicits.global
import scala.concurrent.duration._
import scala.collection.JavaConverters._
import collection.JavaConversions._

case class Attraction() {
  @BeanProperty var name: String = _
  @BeanProperty var location: String = _
  @BeanProperty var description: String = _
  @BeanProperty var imageUrl: String = _
  @BeanProperty var comments: java.util.Map[String, CommentBean] = _
}

case class Comment(authorEmail: String, commentStr: String, rating: Int) {
  override def hashCode(): Int = {
    authorEmail.##
  }

  def toBean: CommentBean = {
    val comment = new CommentBean()
    comment.authorEmail = authorEmail
    comment.commentStr = commentStr
    comment.rating = rating
    comment
  }
}

class CommentBean() {
  @BeanProperty var authorEmail: String = ""
  @BeanProperty var commentStr: String = ""
  @BeanProperty var rating: Int = 0
  def toCase: Comment = Comment(authorEmail, commentStr, rating)
}

object Attraction {

  def createAttraction(name: String, description: String, location: String, imageUrl: String): Option[Attraction] = {

    try {
      val serviceAccount = new FileInputStream(
        new File("./app/resources/serviceAccountsCredentials.json"))
      App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
    } catch {
      case ise: IllegalStateException => println("Logged error:" + ise)
    }

    //Get a database reference
    val db: Database = Database.getInstance()
    val attractionRef: DatabaseReference = db.ref("Attractions/" + name.hashCode)

    //Checks if an attraction already exists
    val attractionOption = getAttractionByNameHashcode(name.hashCode)

    attractionOption match {
      case None =>
        //Create attraction
        val attraction = new Attraction()
        attraction.setName(name)
        attraction.setDescription(description)
        attraction.setLocation(location)
        attraction.setImageUrl(imageUrl)

        val storedAttraction: Attraction = Await.result(attractionRef.set(attraction), 10.second)

        Option(storedAttraction)
      case _ => None
    }
  }

  def getAttractionByNameHashcode(nameHash: Int): Option[Attraction] = {

    try {
      val serviceAccount = new FileInputStream(
        new File("./app/resources/serviceAccountsCredentials.json"))
      App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
    } catch {
      case ise: IllegalStateException => println("Logged error:" + ise)
    }

    //Get a database reference
    val db: Database = Database.getInstance()
    val attractionRef: DatabaseReference = db.ref("Attractions/" + nameHash)

    val futureAttraction: Future[Option[Attraction]] = attractionRef.get()
        .map(snapshot => snapshot.getValue(classOf[Attraction]))

    val attractionOption = Await.result(futureAttraction, 10.second)
    
    attractionOption
  }

  def getAttractions: List[Map[String, String]] = {

    try {
      val serviceAccount = new FileInputStream(
        new File("./app/resources/serviceAccountsCredentials.json"))
      App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
    } catch {
      case ise: IllegalStateException => println("Logged error: " + ise)
    }

    val db: Database = Database.getInstance()
    val attractionRef: DatabaseReference = db.ref("Attractions/")

    val futureAttraction: Future[Any] = attractionRef.get()
      .map(snapshot => snapshot.getValue)
      .map((attractions: Option[Any]) => attractions.getOrElse(throw new RuntimeException()))

    val resultIterator = Await.result(futureAttraction, 10.second)
      .asInstanceOf[scala.collection.immutable.Map[String, java.util.HashMap[String, String]]].values

    val attractionsList: List[Map[String, String]] = (for (attraction <- resultIterator) yield
      collection.immutable.HashMap() ++ attraction.asScala).toList

    attractionsList
  }

  def editAttractionByHashcode(nameHash: Int, name: String, description: String, location: String,
                               imageUrl: String): Option[Attraction] = {

    try {
      val serviceAccount = new FileInputStream(
        new File("./app/resources/serviceAccountsCredentials.json"))
      App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
    } catch {
      case ise: IllegalStateException => println("Logged error: " + ise)
    }

    val attractionOption = getAttractionByNameHashcode(nameHash)

    val db: Database = Database.getInstance()
    val attractionRef: DatabaseReference = db.ref("Attractions/" + attractionOption.get.name.hashCode)

    attractionOption match {
      case None => None
      case Some(attraction: Attraction) =>
        attraction.setName(name)
        attraction.setDescription(description)
        attraction.setLocation(location)
        attraction.setImageUrl(imageUrl)

        val storedAttraction = Await.result(attractionRef.set(attraction), 10.second)

        Option(storedAttraction)
    }
  }

  def addCommentByAttractionHashcode(nameHash: Int, authorEmail: String, commentStr: String, rating: Int):
    Option[Attraction] = {

    try {
       val serviceAccount = new FileInputStream(
         new File("./app/resources/serviceAccountsCredentials.json"))
       App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
     } catch {
       case ise: IllegalStateException => {
         println("Logged error: " + ise)
       }
     }

    val attractionOption = getAttractionByNameHashcode(nameHash)

    val db: Database = Database.getInstance()

    val attractionRef: DatabaseReference = db.ref("Attractions/" + attractionOption.get.name.hashCode)
    
    attractionOption match {
      case None => None
      case Some(attraction: Attraction) =>

        val comment = Comment(authorEmail, commentStr, rating)

        val commentMap: java.util.Map[String, CommentBean] = Option(attraction.getComments).getOrElse(
          new java.util.HashMap[String, CommentBean]())

        val comments = commentMap + (comment.##.toString -> comment.toBean)

        attraction.setComments(comments)

        val storedAttraction = Await.result(attractionRef.set(attraction), 10.second)

        Option(storedAttraction)
    }
  }

   def editComment(nameHash: Int, authorEmail: String, commentStr: String, rating: Int): Option[Attraction] = {

     try {
       val serviceAccount = new FileInputStream(
         new File("./app/resources/serviceAccountsCredentials.json"))
       App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
     } catch {
       case ise: IllegalStateException => println("Logged error: " + ise)
     }

     val attractionOption = getAttractionByNameHashcode(nameHash)

     val db: Database = Database.getInstance()
     val attractionRef: DatabaseReference = db.ref("Attractions/" + attractionOption.get.name.hashCode)

     attractionOption match {
       case None => None
       case Some(attraction: Attraction) =>
         val comment = Comment(authorEmail, commentStr, rating)
         val commentMap: java.util.Map[String, CommentBean] = Option(attraction.getComments).getOrElse(
           new java.util.HashMap[String, CommentBean]())
         println("Old comment map: " + commentMap)
         commentMap(comment.##.toString) = comment.toBean

         val storedAttraction = Await.result(attractionRef.set(attraction), 10.second)

         Option(storedAttraction)
     }
   }

  def deleteComment(nameHash: Int, authorEmail: String): Option[Attraction] = {

     try {
       val serviceAccount = new FileInputStream(
         new File("./app/resources/serviceAccountsCredentials.json"))
       App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
     } catch {
       case ise: IllegalStateException => println("Logged error: " + ise)
     }

     val attractionOption = getAttractionByNameHashcode(nameHash)

     val db: Database = Database.getInstance()
     val attractionRef: DatabaseReference = db.ref("Attractions/" + attractionOption.get.name.hashCode)

     attractionOption match {
       case None => None
       case Some(attraction: Attraction) =>
         val commentMap: java.util.Map[String, CommentBean] = Option(attraction.getComments).getOrElse(
           new java.util.HashMap[String, CommentBean]())
         println("Old comment map: " + commentMap)
         println("Hash to Remove: " + authorEmail.##.toString)
         commentMap -= authorEmail.##.toString

         val storedAttraction = Await.result(attractionRef.set(attraction), 10.second)

         Option(storedAttraction)
     }
   }
}