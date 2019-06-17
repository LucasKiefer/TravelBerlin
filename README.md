[![MIT License][license-badge]][LICENSE]
# What is Tour Berlin
This is a Georgia Tech CS 2340 project.  Browse a variety of Berlin attractions, write reviews, and get recommendations.

# How to run it
Prerequisites
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) `brew install yarn`
- [sbt](https://www.scala-sbt.org/download.html) `brew install sbt`

Steps to run (start in base directory)
``` console
cd ui
yarn install
cd ..
sbt run
```

Then in your web browser open localhost:3000

# Features
## M1
- S1 (Create user): Simply click "Register" and fill out the form.  **Note: Admin Password is 1234**
- S2/S3 (Profile): After registering or logging in click "Profile" in the navbar.  This brings you to a page with your profile information.  You can click "edit profile" to change any of your information.
- S4 (Admin Actions): If you chose to register as an Admin, you will have the special "Administrator" tag on your profile, as well as access to the "Add attraction" button (not yet functional).

# Attributions
Thanks [Scala-Play-React-Seed](https://github.com/yohangz/scala-play-react-seed) for the project template
