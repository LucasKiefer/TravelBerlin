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


case class Attraction() {
  @BeanProperty var name: String = _
  @BeanProperty var location: String = _
  @BeanProperty var description: String = _
  @BeanProperty var imageUrl: String = _
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
    val attractionRef: DatabaseReference = db.ref("Attractions/" + name)

    //TODO: Check if an attraction already exists

    //Create attraction
    val attraction = new Attraction()
    attraction.setName(name)
    attraction.setDescription(description)
    attraction.setLocation(location)
    attraction.setImageUrl(imageUrl)

    val storedAttraction: Attraction = Await.result(attractionRef.set(attraction), 10.second)

    Option(storedAttraction)
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
}