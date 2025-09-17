// @GENERATOR:play-routes-compiler
// @SOURCE:D:/atester/backend-play-8/conf/routes
// @DATE:Sun Jul 20 15:49:02 CEST 2025


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
