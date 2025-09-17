package controllers;

import play.mvc.Controller;
import play.mvc.Result;

public class HomeController extends Controller {

    public Result index() {
        return ok("Backend Play 2.7.9 - Java 8 OK");
    }
}