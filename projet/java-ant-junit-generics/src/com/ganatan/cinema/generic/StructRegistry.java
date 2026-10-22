package com.ganatan.cinema.generic;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class StructRegistry {
    protected final Map<Class<?>, StructTypeHome<?>> homes =
            new HashMap<Class<?>, StructTypeHome<?>>();

    public <E> void register(Class<E> type, E value) {
        if (type == null) {
            throw new IllegalArgumentException("type");
        }
        homes.put(type, new StructTypeHome<E>(type, value));
    }

    public <E> E find(Class<E> type) {
        StructTypeHome<?> home = homes.get(type);
        if (home == null) {
            return null;
        }
        return type.cast(home.getValue());
    }

    public StructTypeHome<?> getHome(Class<?> type) {
        return homes.get(type);
    }

    public Map<Class<?>, StructTypeHome<?>> snapshot() {
        return Collections.unmodifiableMap(new HashMap<Class<?>, StructTypeHome<?>>(homes));
    }
}
