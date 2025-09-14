class LLMService {
  constructor(client) {
    this.client = client;
  }

  async processPrompt(prompt) {
    try {
      return await this.client.generateResponse(prompt);
    } catch (error) {
      throw new Error(`LLM Error: ${error.message}`);
    }
  }
}

export default LLMService;



// class LLMService {
//   constructor(client) {
//     this.client = client;
//   }

//   async processPrompt(prompt) {
//     try {
//       const result = await this.client.generateResponse(prompt);
//       return {
//         success: true,
//         data: result
//       };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.message || 'Unknown error from LLM'
//       };
//     }
//   }
// }

// export default LLMService;



// class LLMService {
//   constructor(client) {
//     this.client = client;
//   }

//   async processPrompt(prompt) {
//     return await this.client.generateResponse(prompt);
//   }
// }

// export default LLMService;
