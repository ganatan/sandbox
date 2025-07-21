// @GENERATOR:play-routes-compiler
// @SOURCE:D:/atester/backend-play-8/conf/routes
// @DATE:Sun Jul 20 15:49:02 CEST 2025

package controllers;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.ReverseHomeController HomeController = new controllers.ReverseHomeController(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.javascript.ReverseHomeController HomeController = new controllers.javascript.ReverseHomeController(RoutesPrefix.byNamePrefix());
  }

}
