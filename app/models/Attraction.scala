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


class Attraction() {
  @BeanProperty var name: String = _
  @BeanProperty var location: String = _
  @BeanProperty var description: String = _
}

object Attraction {

  def getAttractions: List[Map[String, String]] = {

    try {
      val serviceAccount = new FileInputStream(
        new File("./app/resources/serviceAccountsCredentials.json"))
      App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
    } catch {
      case ise: IllegalStateException => println("Logged error: " + ise)
    }

    val db: Database = Database.getInstance()
    val attractionRef: DatabaseReference = db.ref("Attractions")

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