# Tester une conversion avec une structure Java 8

## Objectif

Vérifier la conversion de `MsgBody1` vers `MsgBody2` sans réutiliser le converter dans le calcul attendu et sans modifier le message converti.

- `actual` : message d'origine, avec `get_pitch()` qui retourne un `float`.
- `expected` : message après conversion, contenant `StructEncsElevation`.
- `set_value()` et `get_value()` : méthodes de la structure chargées de transformer la valeur.

## Fonction de test

```java
private void checkPitch(StructEncsElevation expected, float actual) {
    StructEncsElevation elevation = expected.copy();
    elevation.set_value(actual);
    assertEquals(expected.get_value(), elevation.get_value(), 0.0);
}
```

## Utilisation

```java
void test(MsgBody2 expected, MsgBody1 actual) {
    checkPitch(expected.get_attitude().get_pitch(), actual.get_pitch());
}
```

## Points importants

- `copy()` est une méthode **supposée** dans cet exemple : elle doit exister dans la bibliothèque et produire une copie indépendante. Ce n'est pas une méthode Java standard.
- Si `copy()` n'existe pas, utiliser le mécanisme de copie ou de création indépendant réellement fourni par la bibliothèque. Ne pas modifier `expected`.
- `set_value(actual)` et `get_value()` appliquent la logique de la structure ; un cast `(float)` ou `(double)` ne remplace pas cette transformation.
- `0.0` impose une comparaison numérique sans tolérance.
- Pour un test indépendant de la transformation elle-même, utiliser également des valeurs attendues de référence.
