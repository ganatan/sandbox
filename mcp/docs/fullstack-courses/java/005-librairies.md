# Creer la librairie
  MoviesLibrary.java

public class MoviesLibrary {

    public static void showMoviesList() {
        System.out.println("00000001:MoviesList");
    }
}

javac MoviesLibrary.java
jar cf movies-library.jar MoviesLibrary.class

# UTiliser la librairie

public class Server {

  public static void main(String[] args) {
    System.out.println("00000000001:Server");
    showMoviesList();

    MoviesLibrary.showMoviesList();
  }

  private static void showMoviesList() {
    System.out.println("00000001:MoviesList");
  }

}