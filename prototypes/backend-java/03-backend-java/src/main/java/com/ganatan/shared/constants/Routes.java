package com.ganatan.shared.constants;

import java.util.List;
import java.util.Map;

public class Routes {

    public static final Map<String, RouteDefinition> ROUTES = Map.ofEntries(
        Map.entry("continents", new RouteDefinition("/continents", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("countries", new RouteDefinition("/countries", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("cities", new RouteDefinition("/cities", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("professions", new RouteDefinition("/professions", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("persons", new RouteDefinition("/persons", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("person-professions", new RouteDefinition("/person-professions", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("medias", new RouteDefinition("/medias", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("media-types", new RouteDefinition("/media-types", List.of("GET", "POST", "PUT", "DELETE"))),
        Map.entry("media-persons", new RouteDefinition("/media-persons", List.of("GET", "POST", "PUT", "DELETE")))
    );

    public record RouteDefinition(String path, List<String> methods) {}
}

//package com.ganatan.shared.constants;
//
//import java.util.List;
//import java.util.Map;
//
//public class Routes {
//
//    public static final Map<String, RouteDefinition> ROUTES = Map.of(
//        "persons", new RouteDefinition("/persons", List.of("GET", "POST", "PUT", "DELETE")),
//        "cities", new RouteDefinition("/cities", List.of("GET", "POST", "PUT", "DELETE")),
//        "professions", new RouteDefinition("/professions", List.of("GET", "POST", "PUT", "DELETE")),
//        "medias", new RouteDefinition("/medias", List.of("GET", "POST", "PUT", "DELETE"))
//    );
//
//    public record RouteDefinition(String path, List<String> methods) {}
//}
