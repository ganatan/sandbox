# Modification sde main.js et index.html

si tu déplaces index.html dans src/renderer/,


il faut juste adapter le chemin de main.js :
  win.loadFile(__dirname + '/../renderer/index.html')

et acces dans index.html
  <script src="./renderer.js"></script>
