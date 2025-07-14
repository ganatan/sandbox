package com.ganatan.starter_app.services;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService {

    public List<String> getItems() {
        List<String> names = new ArrayList<>();
        names.add("James Cameron");
        names.add("Christopher Nolan");
        return names;
    }
}

