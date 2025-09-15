# Version de play

  # plugins.sbt

  // The Play plugin
  addSbtPlugin("org.playframework" % "sbt-plugin" % "3.0.8")

  // Defines scaffolding (found under .g8 folder)
  // http://www.foundweekends.org/giter8/scaffolding.html
  // sbt "g8Scaffold form"
  addSbtPlugin("org.foundweekends.giter8" % "sbt-giter8-scaffold" % "0.17.0")


# Changer de version de play
  # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  partir sur le repo backend-play-8-ia-ok qui marche

  sbt new playframework/play-java-seed.g8

  backend-play-8/project/plugins.sbt

    // Résolution des conflits AVANT le plugin
    ThisBuild / libraryDependencySchemes += "org.scala-lang.modules" %% "scala-xml" % VersionScheme.Always
    ThisBuild / evictionErrorLevel := Level.Warn

    // Plugin Play
    addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.7.9")

    // Forcer scala-xml pour résoudre le conflit
    dependencyOverrides += "org.scala-lang.modules" %% "scala-xml" % "1.2.0"

  backend-play-8/project/build.properties
    sbt.version=1.8.2

  build.sbt
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