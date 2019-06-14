package models

import scala.beans.BeanProperty

import com.firebase4s.App
import com.firebase4s.database._
import java.io.File
import java.io.FileInputStream

import scala.concurrent._
import ExecutionContext.Implicits.global

//uses this library: https://github.com/firebase4s/firebase4s

//TODO: CHANGE THE PASSWORD!!!!!!!!
case class User() {
    @BeanProperty var firstName: String = _
    @BeanProperty var lastName: String = _
    @BeanProperty var email: String = _
    @BeanProperty var password: String = _
    @BeanProperty var admin: Boolean = _
}

object User {

    //TODO: Maybe change this so it returns if the createUser attempt is successful
    def createUser(firstName: String, lastName: String, email: String, password: String,
                   isAdmin: Boolean) = {

        try {
            val serviceAccount = new FileInputStream(
                new File("./app/resources/serviceAccountsCredentials.json"))
            App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
        } catch {
            case ise: IllegalStateException => println(ise)
        }

        //Get a database reference
        val db: Database = Database.getInstance()
        val userRef: DatabaseReference = db.ref("Users/" + email.hashCode)

        //Create user
        val user = new User()
        user.setFirstName(firstName)
        user.setLastName(lastName)
        user.setEmail(email)
        user.setPassword(password)
        user.setAdmin(isAdmin)

        //Set user at ref location
        userRef.set(user).foreach(println)
    }

    def getUserByEmail(email: String): Option[User] = {

        val user = User()

        try {
            val serviceAccount = new FileInputStream(
                new File("./app/resources/serviceAccountsCredentials.json"))
            App.initialize(serviceAccount, "https://travelberlin-1b28d.firebaseio.com")
        } catch {
            case ise: IllegalStateException => println(ise)
        }

        val db: Database = Database.getInstance()
        val userRef: DatabaseReference = db.ref("Users/")

        println("UserRef: " + userRef.get())

        user.setAdmin(false)
        user.setEmail("test")
        user.setPassword("test")
        user.setLastName("test")
        user.setPassword("test")

        val userOption: Option[User] = Option(user)

        userOption
    }
}