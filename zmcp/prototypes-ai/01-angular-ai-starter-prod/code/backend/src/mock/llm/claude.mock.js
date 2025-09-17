export function reply(data) {
  return {
    model: 'claude',
    input: data,
    output: 'Voici une réponse simulée de claude.'
  }
}
