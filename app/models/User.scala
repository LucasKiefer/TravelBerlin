package models

import scala.beans.BeanProperty

import com.firebase4s.App
import com.firebase4s.database._
import java.io.File
import java.io.FileInputStream

import scala.concurrent._
import scala.concurrent.duration._
import ExecutionContext.Implicits.global

//uses this library: https://github.com/firebase4s/firebase4s

import io.github.nremond._
//this import is a hashing library: https://github.com/nremond/pbkdf2-scala

case class User() {
    @BeanProperty var firstName: String = _
    @BeanProperty var lastName: String = _
    @BeanProperty var email: String = _
    @BeanProperty var password: String = _
    @BeanProperty var birthYear: Int =_
    @BeanProperty var homeTown: String = _
    //TODO: CHange this to a List[String] at some point
    @BeanProperty var interests: String = _
    @BeanProperty var admin: Boolean = _
}

object User {

    //TODO: Maybe change this so it returns if the createUser attempt is successful
    def createUser(firstName: String, lastName: String, email: String, password: String,
                   isAdmin: Boolean): Option[User] = {

        try {
            val serviceAccount = new FileInputStream(
                new File("./app/resources/serviceAccountsCredentials.json"))
            App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
        } catch {
            case ise: IllegalStateException => println("Logged error:" + ise)
        }

        //Get a database reference
        val db: Database = Database.getInstance()
        val userRef: DatabaseReference = db.ref("Users/" + email.hashCode)

        //Check if user already exists
        val userOption: Option[User] = getUserByEmail(email)

        userOption match{
            case None => {
                //Create user
                val user = new User()
                user.setFirstName(firstName)
                user.setLastName(lastName)
                user.setEmail(email)
                user.setPassword(SecureHash.createHash(password))
                user.setAdmin(isAdmin)
                user.setBirthYear(0)
                user.setHomeTown("")
                user.setInterests("")

                //Set user at ref location
                val storedUser: User = Await.result(userRef.set(user), 10.second)

                Option(storedUser)
            }
            case _ => None
        }
    }

    def getUserByEmail(email: String): Option[User] = {

        try {
            val serviceAccount = new FileInputStream(
                new File("./app/resources/serviceAccountsCredentials.json"))
            App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
        } catch {
            case ise: IllegalStateException => println("Logged error: " + ise)
        }

        val db: Database = Database.getInstance()
        val userRef: DatabaseReference = db.ref("Users/" + email.hashCode)

        val futureUser: Future[Option[User]] = userRef.get()
            .map(snapshot => snapshot.getValue(classOf[User]))

        val userOption: Option[User] = Await.result(futureUser, 10.second)

        userOption
    }

    def editUserByEmail(email: String, firstName: String, lastName: String, birthYear: Int, interests: List[String],
                        homeTown: String): Option[User] = {

        try {
            val serviceAccount = new FileInputStream(
                new File("./app/resources/serviceAccountsCredentials.json"))
            App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
        } catch {
            case ise: IllegalStateException => println("Logged error: " + ise)
        }

        val db: Database = Database.getInstance()
        val userRef: DatabaseReference = db.ref("Users/" + email.hashCode)

        val userOption: Option[User] = getUserByEmail(email)

        userOption match{
            case None => None
            case Some(user: User) => {
                user.setFirstName(firstName)
                user.setLastName(lastName)
                user.setEmail(email)
                user.setBirthYear(birthYear)
                user.setInterests(interests.mkString(","))
                user.setHomeTown(homeTown)

                //Set user at ref location
                val storedUser: User = Await.result(userRef.set(user), 10.second)

                Option(storedUser)
            }
        }

    }
}