voila le rapport



Element	Missed Instructions	Cov.	Missed Branches	Cov.	Missed	Cxty	Missed	Lines	Missed	Methods	Missed	Classes
Total	211 of 217	2 %	10 of 10	0 %	14	16	29	31	9	11	2	4
com.ganatan.controller	1153	2 %		n/a	1	2	2	3	1	2	0	1
com.ganatan.tools	64	0 %	10	0 %	8	8	15	15	3	3	1	1
com.ganatan.model	24	0 %		n/a	4	4	9	9	4	4	1	1
com.ganatan	83	27 %		n/a	1	2	3	4	1	2	0	1



j'ai un test

BackendJavaSpringbootApplicationTests.java



package com.ganatan;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendJavaSpringbootApplicationTests {

	@Test
	void contextLoads() {
	}

}


improve par exemple
pour 
com.ganatan.controller



le code PersonController.java

package com.ganatan.controller;

import com.ganatan.model.Person;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {
    @GetMapping
    public List<Person> getPersons() {
    	System.out.println("00000000001:PersonController");
        return List.of(
            new Person(1, "Steven Spielberg", "Cincinnati"),
            new Person(2, "Martin Scorsese", "New York"),
            new Person(3, "Quentin Tarantino", "Knoxville"),
            new Person(4, "Christopher Nolan", "London"),
            new Person(5, "James Cameron", "Kapuskasing"),
            new Person(6, "Tim Burton", "Burbank"),
            new Person(7, "Francis Ford Coppola", "Detroit"),
            new Person(8, "David Lynch", "Missoula"),
            new Person(9, "Paul Thomas Anderson", "Studio City"),
            new Person(10, "Wes Anderson", "Houston"),
            new Person(11, "Clint Eastwood", "San Francisco"),
            new Person(12, "Brian De Palma", "Newark")
        );
    }
}
