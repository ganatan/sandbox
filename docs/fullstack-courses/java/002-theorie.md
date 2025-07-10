
# Creer Main.java

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}


# Explications

  public
    Cela signifie que la méthode est accessible depuis n'importe où.

  static
    Cela signifie que la méthode appartient à la classe et non à une instance de la classe.
    Ainsi, Java peut appeler main sans créer d'objet de la classe.

  void
    Cela signifie que la méthode ne retourne rien.

  main
    C'est le nom obligatoire de la méthode principale en Java.
    Quand tu exécutes une application, c'est cette méthode que la JVM (Java Virtual Machine) recherche et exécute.

  String[] args
    C'est un tableau de chaînes de caractères qui permet de passer des arguments au programme depuis la ligne de commande.


# fonctionnement

  Compile le fichier
    javac Main.java

  Exécute le programme
    java Main

