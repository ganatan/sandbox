## ✅ Obtenir et tester une clé API OpenAI (Windows)

| Étape | Action                                                                                      |
|-------|---------------------------------------------------------------------------------------------|
| 1     | Aller sur [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) |
| 2     | Se connecter avec ton compte ChatGPT                                                        |
| 3     | Cliquer sur **"Create new secret key"**                                                     |
| 4     | Copier et sauvegarder la clé générée (elle s'affiche une seule fois)                        |
| 5     | Ouvrir le terminal `cmd` sur Windows                                                        |
| 6     | Coller et exécuter la commande `curl` ci-dessous pour tester                               |
| 7     | Vérifier que la réponse contient du texte de ChatGPT                                        |

### 🔧 Exemple de commande `curl` (clé fictive – à remplacer par la tienne)

```cmd
curl https://api.openai.com/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer 1234567890-1234567890-1234567890-1234567890-1234567890-1234567890-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-XXXXXXXXX-1234-123456789-123456789-123456789-123456789-123456789-123" -d "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"Bonjour, peux-tu te présenter ?\"}]}"


