# Inscription 
  
  https://www.redhat.com/

  name            chendra-scrum
  login			      dannymemory123456@gmail.com
  password        Trustno1982BrisbyNimh

# Installation

  https://developers.redhat.com/products/openshift-local/overview

  Le binaire OpenShift Local (crc).
  
  https://console.redhat.com/openshift/create/local




# Documentation
  https://www.youtube.com/watch?v=XjJOxCZCIxo&ab_channel=Cookieconnect%C3%A9



# OpenShift conteneur Platform
  https://www.redhat.com/en/technologies/cloud-computing/openshift/container-platform

# Info
  https://www.redhat.com/en/technologies/cloud-computing/openshift

  Red Hat OpenShift Container Platform
    Start your trial
  https://www.redhat.com/openshift/create/local


# Principes  
  Openshift est une distribution de Kubernetes

# Installation
  Video
    https://www.youtube.com/watch?v=0aFEtnEnmKI&ab_channel=CodeCraftShop

  Aller sur 
    https://developers.redhat.com/products/codeready-containers/overview

    Install openshift on your laptop

    Download pull secret

    Aller dans
      C:\Program Files\Red Hat OpenShift Local
    Lancer
      crc start

    Message d'erreur 
      file 'C:\Users\chendra\.crc\cache\crc_hyperv_4.13.0_amd64.crcbundle' does not exist

    Essayer d'installer HyperV
      Activer avec commande prompt
      Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All      

        ou

      Ajouter ou supprimer
      programmes et fonctionnalités à droite
      Activer ou désactiver des fonctionnalités Windows.
      Hyper-V

# Creation de PODS
  https://console.redhat.com/openshift/
  

  Process à suivre
    https://www.redhat.com/en
      Console
      Log in to the console
      Red Hat OpenShift

        Clusters
          Create Clusters
          Create Trial Cluster

# Creation du cluster
  https://www.youtube.com/watch?v=ElhpkEaAM5Y&t=102s&ab_channel=TechTejendra          



# Fonctionnement
  - A container runs in a pod
  - A group of pods, related or unrelated, run on a cluster. 
  - A pod is a unit of replication on a cluster;
  - A cluster can contain many pods, grouped under the tight logical borders called namespaces.


# Create Cluster en local
  
  C:\Program Files\Red Hat OpenShift Local
  
  crc start

  si Erreur
    C:\Users\chendra\.crc\cache\crc_hyperv_4.13.3_amd64.crcbundle' does not exist


  en Mode Administrateur    
    cmd   C:\Program Files\Red Hat OpenShift Local
    crc setup

    Telechargement du fichier crcbundle
    unpacling

  en Mode non Administrateur    
    cmd   C:\Program Files\Red Hat OpenShift Local
    crc start

# Resultat
  CRC instance is running with IP 127.0.0.1    

The server is accessible via web console at:
  https://console-openshift-console.apps-crc.testing

Log in as administrator:
  Username: kubeadmin
  Password: 8sCWd-XHXYb-ZrM2w-FUoFI

Log in as user:
  Username: developer
  Password: developer

Use the 'oc' command line interface:
  > @FOR /f "tokens=*" %i IN ('crc oc-env') DO @call %i
  > oc login -u developer https://api.crc.testing:6443