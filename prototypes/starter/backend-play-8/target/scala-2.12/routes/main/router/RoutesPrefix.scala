// @GENERATOR:play-routes-compiler
// @SOURCE:D:/Chendra/04-tutorials/314-starters-apps/prototypes/starter/backend-play-8/conf/routes
// @DATE:Sun Jul 20 16:02:33 CEST 2025


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
