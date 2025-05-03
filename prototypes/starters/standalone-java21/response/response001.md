# response 01

  # Creation
  
  Menu : File → New → Java Project
  Nom du projet : java21-standalone-starter
  JDK : sélectionne JavaSE-21 (si installé)
  Décoche Create module-info.java file
  Clique sur Finish


  Open Perspective



  Clic droit sur src → New → Class
  Nom de la classe : Main
  Coche public static void main(String[] args)
  Clique sur Finish

  Main.java


  public class Main {
    public static void main(String[] args) {
        System.out.println("🎬 Réalisateurs célèbres :");
        String[] directors = {
            "Christopher Nolan",
            "Quentin Tarantino",
            "Steven Spielberg",
            "Martin Scorsese",
            "James Cameron",
            "Ridley Scott",
            "Denis Villeneuve"
        };
        for (String director : directors) {
            System.out.println("- " + director);
        }
    }
}

  # Execution
  

    Clique droit sur ton projet standalone-java21
        Export
        Catégorie : Java
        Sélectionne : Runnable JAR file
        Launch configuration : choisis Main - standalone-java21
        Export destination :
          D:\Chendra\standalone-java21\standalone-java21.jar
        coche : Package required libraries into generated JAR
        Clique sur Finish

  java -jar D:\demo\standalone-java21.jar