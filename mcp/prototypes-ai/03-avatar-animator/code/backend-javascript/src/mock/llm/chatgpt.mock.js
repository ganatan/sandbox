export function reply(data) {
  const name = (data.name || 'Inconnu').replace('-', ' ')
  const length = data.length || 'medium'
  const style = data.style || 'neutral'

  const base = `${name} est un réalisateur britannique reconnu pour des films comme Alien, Blade Runner, Gladiator ou Seul sur Mars. Son style mêle innovation visuelle et narration puissante.`

  const styles = {
    neutral: base,
    casual: `${name} ? C’est le gars qui a fait Alien, Gladiator, plein de films cultes. Du grand spectacle, toujours marquant.`,
    technical: `Sir ${name}, né en 1937, est un cinéaste britannique. Il est connu pour ses œuvres de science-fiction et épiques, avec une attention marquée à la composition et à la direction artistique.`,
    narrative: `Il était une fois un jeune homme nommé ${name}, qui allait transformer le cinéma avec des mondes visuels forts et des récits intenses.`,
    press: `Le cinéaste britannique ${name}, auteur de Gladiator et Blade Runner, continue de marquer le cinéma moderne par sa rigueur et sa vision artistique.`
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
