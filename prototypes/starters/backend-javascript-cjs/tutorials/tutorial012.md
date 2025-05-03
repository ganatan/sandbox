# tutorial 1
 Qu'est-ce que /health ?
C'est une route HTTP spéciale de ton API.

Elle répond très rapidement (généralement avec 200 OK) pour dire :

"Je suis vivant et fonctionnel."

Exemple concret :

bash
Copier
Modifier
GET /health
200 OK
Body: { "status": "ok" }
🛠️ Pourquoi /health est indispensable

Usage	Détail
Load Balancer	Ex : AWS, Azure, GCP vérifient /health pour savoir si ton app doit recevoir du trafic.
Kubernetes	K8s fait des readiness probes et liveness probes sur /health.
Monitoring/Alerting	Grafana/Prometheus peuvent checker /health pour générer des alertes si ton API tombe.
CI/CD Pipeline	Après déploiement auto, on check /health pour valider que l'app est bien montée.
🔥 Types de probes

Type	Utilité
Liveness Probe	Est-ce que l'app est toujours vivante (pas bloquée/crashée) ?
Readiness Probe	Est-ce que l'app est prête à accepter du trafic (ex: base de données connectée, serveur écoutant, etc.) ?
✅ Exemple de code /health minimal dans Express
js
Copier
Modifier
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
Simple, rapide, sans base de données ni dépendance.