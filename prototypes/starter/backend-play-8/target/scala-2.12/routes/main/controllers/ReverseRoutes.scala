// @GENERATOR:play-routes-compiler
// @SOURCE:D:/Chendra/04-tutorials/314-starters-apps/prototypes/starter/backend-play-8/conf/routes
// @DATE:Sun Jul 20 16:02:33 CEST 2025

import play.api.mvc.Call


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:1
package controllers {

  // @LINE:1
  class ReverseHomeController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:1
    def index(): Call = {
      
      Call("GET", _prefix)
    }
  
  }


}
