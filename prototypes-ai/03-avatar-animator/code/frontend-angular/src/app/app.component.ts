import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { PersonService, BiographyResponse } from './person.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'ridley scott'
  length = 'short'
  style = 'neutral'

  biographyChatGPT = ''
  biographyClaude = ''

  audioChatGPT = ''
  audioClaude = ''

  chatgptLoading = false
  claudeLoading = false

  voiceChatGPTLoading = false
  voiceClaudeLoading = false

  chatgptDuration = 0
  claudeDuration = 0
  voiceChatGPTDuration = 0
  voiceClaudeDuration = 0

  private audioPlayer?: HTMLAudioElement

  constructor(private personService: PersonService) {}

  loadBiography(llm: 'chatgpt' | 'claude') {
    const start = performance.now()

    if (llm === 'chatgpt') {
      this.chatgptLoading = true
    } else {
      this.claudeLoading = true
    }

    this.personService
      .postBiography(llm, this.name, this.length, this.style)
      .subscribe((response: BiographyResponse) => {
        const duration = (performance.now() - start) / 1000

        if (llm === 'chatgpt') {
          this.biographyChatGPT = response.data
          this.chatgptDuration = duration
          this.chatgptLoading = false
        } else {
          this.biographyClaude = response.data
          this.claudeDuration = duration
          this.claudeLoading = false
        }
      })
  }

  loadVoice(llm: 'chatgpt' | 'claude') {
    const start = performance.now()

    if (llm === 'chatgpt') {
      this.voiceChatGPTLoading = true
    } else {
      this.voiceClaudeLoading = true
    }

    this.personService
      .postVoice(llm, this.name, this.length, this.style)
      .subscribe((response: BiographyResponse) => {
        const duration = (performance.now() - start) / 1000

        if (llm === 'chatgpt') {
          this.biographyChatGPT = response.data
          this.audioChatGPT = response.audioUrl!
          this.voiceChatGPTDuration = duration
          this.voiceChatGPTLoading = false
        } else {
          this.biographyClaude = response.data
          this.audioClaude = response.audioUrl!
          this.voiceClaudeDuration = duration
          this.voiceClaudeLoading = false
        }
      })
  }

  playAudio(url: string) {
    if (this.audioPlayer) {
      this.audioPlayer.pause()
      this.audioPlayer.currentTime = 0
    }

    this.audioPlayer = new Audio(url)
    this.audioPlayer.play()
  }

  reset(llm: 'chatgpt' | 'claude') {
    if (llm === 'chatgpt') {
      this.biographyChatGPT = ''
      this.audioChatGPT = ''
      this.chatgptDuration = 0
      this.voiceChatGPTDuration = 0
    } else {
      this.biographyClaude = ''
      this.audioClaude = ''
      this.claudeDuration = 0
      this.voiceClaudeDuration = 0
    }
  }
}


// import { Component } from '@angular/core'
// import { FormsModule } from '@angular/forms'
// import { CommonModule } from '@angular/common'
// import { PersonService, BiographyResponse } from './person.service'


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   name = 'ridley scott'
//   length = 'short'
//   style = 'neutral'

//   biographyChatGPT = ''
//   biographyClaude = ''

//   audioChatGPT = ''
//   audioClaude = ''

//   chatgptLoading = false
//   claudeLoading = false

//   private audioPlayer?: HTMLAudioElement

//   constructor(private personService: PersonService) { }

//   loadBiography(llm: 'chatgpt' | 'claude') {
//     if (llm === 'chatgpt') {
//       this.chatgptLoading = true
//     } else {
//       this.claudeLoading = true
//     }

//     this.personService
//       .postBiography(llm, this.name, this.length, this.style)
//       .subscribe((response: BiographyResponse) => {
//         console.log('BIO:', response)
//         if (llm === 'chatgpt') {
//           this.biographyChatGPT = response.data
//         } else {
//           this.biographyClaude = response.data
//         }

//         this.chatgptLoading = false
//         this.claudeLoading = false
//       })
//   }

//   loadVoice(llm: 'chatgpt' | 'claude') {
//     if (llm === 'chatgpt') {
//       this.chatgptLoading = true
//     } else {
//       this.claudeLoading = true
//     }

//     this.personService
//       .postVoice(llm, this.name, this.length, this.style)
//       .subscribe((response: BiographyResponse) => {
//         console.log('VOICE:', response)
//         if (llm === 'chatgpt') {
//           this.biographyChatGPT = response.data;
//           this.audioChatGPT = response.audioUrl!;
//         } else {
//           this.biographyClaude = response.data;
//           this.audioClaude = response.audioUrl!;
//         }

//         this.chatgptLoading = false
//         this.claudeLoading = false
//       })
//   }

//   playAudio(url: string) {
//     url = 'http://localhost:3000/api/audio';
//     console.log('000000000001:' + url);
//     if (this.audioPlayer) {
//       this.audioPlayer.pause()
//       this.audioPlayer.currentTime = 0
//     }

//     this.audioPlayer = new Audio(url)
//     this.audioPlayer.play()
//   }

//   reset(llm: 'chatgpt' | 'claude') {
//     if (llm === 'chatgpt') {
//       this.biographyChatGPT = ''
//       this.audioChatGPT = ''
//     } else {
//       this.biographyClaude = ''
//       this.audioClaude = ''
//     }
//   }
// }
