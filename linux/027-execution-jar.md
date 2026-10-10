# Exécution des JAR

## Version Java

```bash
java -version
```

## Lancer un jar exécutable

```bash
java -jar app.jar
```

## Arguments

```bash
java -jar app.jar Interstellar
```

## Mémoire maximale

```bash
java -Xmx512m -jar app.jar
```

## Environnement

```bash
SERVER_PORT=3000 java -jar app.jar
```

## Arrière-plan

```bash
nohup java -jar app.jar > application.log 2>&1 &
```

## PID lancé

```bash
echo $!
```

## Chercher les processus

```bash
pgrep -af 'java -jar'
```

## Logs

```bash
tail -f application.log
```

## Arrêt propre

```bash
kill -TERM 1234
```

## Lister le JAR

```bash
jar tf app.jar
```

## Manifeste

```bash
unzip -p app.jar META-INF/MANIFEST.MF
```

## Classpath et classe principale

```bash
java -cp 'app.jar:lib/*' com.example.Main
```

## Propriétés Java

```bash
java -XshowSettings:properties -version
```
