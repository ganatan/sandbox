Ajouter un fichier de test dans le même package que la classe source (src/main/java/...) n'est pas une bonne pratique. Maven et les frameworks de test (JUnit) séparent le code de production et le code de test pour plusieurs raisons :

Tests non inclus dans le build final : Si tu mets les tests dans src/main/java, ils seront inclus dans le JAR ou WAR généré, ce qui est inutile et augmente la taille du projet.
Gestion des dépendances : Les dépendances de test (scope test) ne sont disponibles que dans src/test/java.
Séparation claire des responsabilités : src/main/java pour le code, src/test/java pour les tests.