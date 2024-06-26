class PitchShifterProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{
      name: 'pitch',
      defaultValue: 0,
      minValue: -12,
      maxValue: 12
    }];
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const pitch = parameters.pitch[0];

    for (let channel = 0; channel < input.length; ++channel) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; ++i) {
        outputChannel[i] = this.applyPitchShift(inputChannel[i], pitch);
      }
    }

    return true;
  }

  applyPitchShift(sample, pitch) {
    const pitchRatio = Math.pow(2, pitch / 12);
    return sample * pitchRatio;
  }
}

registerProcessor('pitch-shifter-processor', PitchShifterProcessor);