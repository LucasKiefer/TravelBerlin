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
class User() {
    @BeanProperty var firstName: String = _
    @BeanProperty var lastName: String = _
    @BeanProperty var userName: String = _
    @BeanProperty var email: String = _
    @BeanProperty var password: String = _
    @BeanProperty var isAdmin: Boolean = _
}

object User {

    def createUser(firstName: String, lastName: String, userName: String, email: String, password: String,
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
        user.firstName = firstName
        user.lastName = lastName
        user.userName = userName
        user.email = email
        user.password = password

        //Set user at ref location
        userRef.set(user).foreach(println)
    }
}