name := "backend-play-8"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.17"

libraryDependencies ++= Seq(
  guice,
  javaJdbc,
  "com.typesafe.play" %% "play" % "2.7.9"
)

libraryDependencySchemes += "org.scala-lang.modules" %% "scala-xml" % VersionScheme.Always
dependencyOverrides += "org.scala-lang.modules" %% "scala-xml" % "1.2.0"
ThisBuild / evictionErrorLevel := Level.Warn

javacOptions ++= Seq("-source", "1.8", "-target", "1.8")