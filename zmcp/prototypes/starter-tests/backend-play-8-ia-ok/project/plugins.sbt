// Résolution des conflits AVANT le plugin
ThisBuild / libraryDependencySchemes += "org.scala-lang.modules" %% "scala-xml" % VersionScheme.Always
ThisBuild / evictionErrorLevel := Level.Warn

// Plugin Play
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.7.9")

// Forcer scala-xml pour résoudre le conflit
dependencyOverrides += "org.scala-lang.modules" %% "scala-xml" % "1.2.0"