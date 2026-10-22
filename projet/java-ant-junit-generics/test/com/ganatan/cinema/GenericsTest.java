package com.ganatan.cinema;

import com.ganatan.cinema.generic.Box;
import com.ganatan.cinema.generic.Pair;
import com.ganatan.cinema.generic.StructRegistry;
import com.ganatan.cinema.generic.GenericUtils;
import com.ganatan.cinema.model.Media;
import com.ganatan.cinema.model.Movie;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import junit.framework.TestCase;

public class GenericsTest extends TestCase {
    public void testBoxAndPair() {
        Box<String> box = new Box<String>("Alien");
        assertEquals("Alien", box.get());
        box.set("Avatar");
        assertEquals("Avatar", box.get());
        Pair<String, Integer> pair = new Pair<String, Integer>("Alien", 1979);
        assertEquals("Alien", pair.getKey());
        assertEquals(Integer.valueOf(1979), pair.getValue());
    }

    public void testTypedRegistry() {
        StructRegistry registry = new StructRegistry();
        registry.register(String.class, "Alien");
        registry.register(Integer.class, 1979);
        assertEquals("Alien", registry.find(String.class));
        assertEquals(Integer.valueOf(1979), registry.find(Integer.class));
        assertNull(registry.find(Movie.class));
        assertEquals(Integer.valueOf(2), Integer.valueOf(registry.snapshot().size()));
    }

    public void testWildcardsAndGenericMethod() {
        assertEquals(6.0, GenericUtils.sum(Arrays.asList(1, 2, 3)), 0.00001);
        List<Media> media = new ArrayList<Media>();
        GenericUtils.addMovie(media, new Movie("Alien", 1979));
        assertEquals(1, media.size());
        assertEquals("Alien", GenericUtils.first(Arrays.asList("Alien", "Avatar")));
    }
}
