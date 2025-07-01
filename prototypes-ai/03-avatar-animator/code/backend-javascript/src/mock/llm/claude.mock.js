export function reply(data) {
  const name = (data.name || 'Inconnu').replace('-', ' ')
  const length = data.length || 'medium'
  const style = data.style || 'neutral'

  const base = `${name} est un cinéaste britannique né en 1937, maître du cinéma épique et de science-fiction. Connu pour Alien (1979), Blade Runner (1982), Gladiator (2000) et Seul sur Mars (2015), il excelle dans la création d'univers visuels immersifs et de récits grandioses.`

  const styles = {
    neutral: base,
    casual: `${name} ? Un génie du cinéma ! Le type qui a créé Alien, l'univers cyberpunk de Blade Runner, et qui nous a fait pleurer avec Gladiator. Toujours des films visuellement époustouflants, même à 87 ans il continue de tourner.`,
    technical: `${name} (1937-) est un réalisateur britannique reconnu pour sa maîtrise de la direction artistique et sa capacité à combiner effets pratiques et numériques. Ses films se caractérisent par une photographie soignée, des décors monumentaux et une attention méticuleuse aux détails visuels. Il a remporté plusieurs nominations aux Oscars.`,
    narrative: `Dans le nord de l'Angleterre naissait ${name}, qui deviendrait l'un des architectes visuels les plus influents du cinéma. De ses débuts publicitaires à Hollywood, il a forgé des mondes inoubliables, transformant chaque film en une expérience visuelle unique qui transcende les époques.`,
    press: `Le réalisateur britannique ${name}, lauréat de nombreux prix internationaux, demeure une figure incontournable du cinéma contemporain. Avec plus de 25 longs-métrages à son actif, il continue d'influencer les nouvelles générations de cinéastes par son approche visionnaire de la mise en scène.`
  }

  const texte = styles[style] || base

  const répétitions = {
    short: 1,
    medium: 2,
    long: 4
  }

  const fois = répétitions[length] || 2

  return `${texte} `.repeat(fois).trim()
}