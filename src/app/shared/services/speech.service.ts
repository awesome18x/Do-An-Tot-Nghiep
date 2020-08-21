import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  _context: any;
  constructor(
  ) {
    this._context = null;
  }

  get context() {
    if (!this._context) {
        this._context = this.newAudioContext;
    }
    return this._context;
  }

  get newAudioContext() {
    AudioContext = AudioContext; // || webkitAudioContext || mozAudioContext;
    return new AudioContext();
  }

  async speakTemplate(template, vm) {
    const runTemplate = this.compile(template);
    const strVoice = runTemplate(vm);
    return await this.speak(strVoice);
  }
  async speak(text, options?) {
    const res = await fetch('https://voice.yeu.ai/api/voice/tts?text=' + text);
    const buffer = await res.arrayBuffer();
    const audioBuffer = await this.context.decodeAudioData(buffer);
    return await this.play(audioBuffer);
  }
  /**
   * Play audio buffer
   * @param {any} buffer
   */
  play(buffer) {
      return new Promise((resolve) => {
          const source = this.context.createBufferSource();
          source.buffer = buffer;
          source.connect(this.context.destination);
          source.start();
          source.addEventListener('ended', resolve);
          // return source;
      });
  }
  compile(template) {
      return new Function('vm', 'return `' + template + '`');
  }
}
