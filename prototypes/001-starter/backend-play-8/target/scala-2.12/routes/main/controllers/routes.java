// @GENERATOR:play-routes-compiler
// @SOURCE:D:/Chendra/04-tutorials/314-starters-apps/prototypes/starter/backend-play-8/conf/routes
// @DATE:Sun Jul 20 16:02:33 CEST 2025

package controllers;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.ReverseHomeController HomeController = new controllers.ReverseHomeController(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.javascript.ReverseHomeController HomeController = new controllers.javascript.ReverseHomeController(RoutesPrefix.byNamePrefix());
  }

}
