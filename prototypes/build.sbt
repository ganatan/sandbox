name := "backend-play-8"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

// Scala 2.12 pour Play 2.7
scalaVersion := "2.12.17"

libraryDependencies ++= Seq(
  guice,
  javaJdbc,
  "com.typesafe.play" %% "play" % "2.7.9",
  "com.h2database" % "h2" % "1.4.200",
  "org.mindrot" % "jbcrypt" % "0.4",
  "com.auth0" % "java-jwt" % "3.19.2",
  "com.fasterxml.jackson.core" % "jackson-databind" % "2.10.5"
)

// Configuration Java 8
javacOptions ++= Seq("-source", "1.8", "-target", "1.8")