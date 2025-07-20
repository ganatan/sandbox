scalaVersion := "2.12.17"

libraryDependencies ++= Seq(
  guice,
  "com.typesafe.play" %% "play" % "2.7.9"
)

javacOptions ++= Seq("-source", "1.8", "-target", "1.8")
