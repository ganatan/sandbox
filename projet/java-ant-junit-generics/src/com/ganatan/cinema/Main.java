package com.ganatan.cinema;

import com.ganatan.cinema.model.Media;
import com.ganatan.cinema.model.Movie;
import com.ganatan.cinema.generic.Box;
import com.ganatan.cinema.generic.Pair;
import com.ganatan.cinema.generic.StructTypeHome;
import com.ganatan.cinema.generic.StructRegistry;
import com.ganatan.cinema.generic.GenericUtils;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Box<String> title = new Box<String>("Alien");
        Box<Integer> year = new Box<Integer>(1979);
        Pair<String, Integer> film = new Pair<String, Integer>(title.get(), year.get());
        System.out.println("Film : " + film.getKey() + " (" + film.getValue() + ")");

        Movie movie = new Movie("Alien", 1979);
        StructRegistry registry = new StructRegistry();
        registry.register(String.class, "Alien");
        registry.register(Integer.class, 1979);
        registry.register(Movie.class, movie);

        String name = registry.find(String.class);
        Integer date = registry.find(Integer.class);
        Movie registeredMovie = registry.find(Movie.class);
        System.out.println("Registry : " + name + " / " + date + " / " + registeredMovie.getTitle());

        StructTypeHome<?> unknownHome = registry.getHome(Movie.class);
        System.out.println("Wildcard ? : " + unknownHome.getValue());

        List<Integer> numbers = Arrays.asList(1, 2, 3);
        System.out.println("extends Number : " + GenericUtils.sum(numbers));

        List<Media> media = new ArrayList<Media>();
        GenericUtils.addMovie(media, movie);
        System.out.println("super Movie : " + media.size());

        GenericUtils.printAll(Arrays.asList("Alien", "Blade Runner"));
        System.out.println("Methode <T> : " + GenericUtils.first(Arrays.asList("Alien", "Avatar")));
    }
}
