# Tester une conversion avec une structure Java 8

## Objectif

Vérifier la conversion de `MsgBody1` vers `MsgBody2` en réutilisant directement `StructPitch`, sans constructeur, sans copie et sans rappeler le converter.

- `actual` : message d'origine (`MsgBody1`), avec un `float` dans `get_pitch()`.
- `expected` : message après conversion (`MsgBody2`), contenant `StructPitch`.
- `set_value()` et `get_value()` : méthodes de transformation de la structure.

## Fonction de test

```java
private void checkPitch(StructPitch expected, float actual) {
    double value = expected.get_value();
    expected.set_value(actual);
    assertEquals(value, expected.get_value(), 0.0);
}
```

## Utilisation

```java
void test(MsgBody2 expected, MsgBody1 actual) {
    checkPitch(expected.get_attitude().get_pitch(), actual.get_pitch());
}
```

## À retenir

- `value` conserve la valeur obtenue après conversion.
- `set_value(actual)` applique la valeur d'origine à la structure existante.
- `get_value()` retourne la valeur transformée à comparer.
- Aucun constructeur, `copy()`, `clone()` ou rappel du converter.
- `0.0` signifie aucune tolérance numérique.
- Le test **modifie `expected`**. Il n'est valide que si `set_value(actual)` puis `get_value()` reproduisent la transformation attendue. Il ne vérifie pas indépendamment la justesse de cette transformation.
