export function reply(data) {
  return {
    model: 'chatgpt',
    input: data,
    output: 'Voici une réponse simulée de ChatGPT.'
  }
}
