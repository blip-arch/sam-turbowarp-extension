// SAM TTS TurboWarp Extension
// Requires sam-js loaded globally

(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("SAM TTS must run unsandboxed.");
    }

    class SamTTSExtension {

        constructor() {
            this.sam = new SamJs();

            // default values (0–255 range for SAM)
            this.pitch = 50;
            this.speed = 72;
            this.mouth = 128;
            this.throat = 128;

            this.currentAudio = null;
        }

        getInfo() {
            return {
                id: 'samtts',
                name: 'SAM TTS',
                blocks: [
                    {
                        opcode: 'speakHello',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Speak hello world!'
                    },
                    {
                        opcode: 'speakText',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Speak [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello world!'
                            }
                        }
                    },
                    {
                        opcode: 'stopSpeech',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Stop speaking'
                    },

                    "--- Voice Settings ---",

                    {
                        opcode: 'setPitch',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set pitch to [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'setSpeed',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set speed to [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'setMouth',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set mouth to [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    },
                    {
                        opcode: 'setThroat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set throat to [VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 50
                            }
                        }
                    }
                ]
            };
        }

        applySettings() {
            this.sam.pitch = this.pitch;
            this.sam.speed = this.speed;
            this.sam.mouth = this.mouth;
            this.sam.throat = this.throat;
        }

        async speakHello() {
            await this.speakText({ TEXT: "hello world!" });
        }

        async speakText(args) {
            this.applySettings();

            // stop previous audio
            this.stopSpeech();

            // speak returns a Promise
            await this.sam.speak(args.TEXT);
        }

        stopSpeech() {
            // sam-js uses WebAudio internally,
            // easiest stop = recreate instance
            this.sam = new SamJs();
            this.applySettings();
        }

        setPitch(args) {
            this.pitch = Number(args.VALUE);
        }

        setSpeed(args) {
            this.speed = Number(args.VALUE);
        }

        setMouth(args) {
            this.mouth = Number(args.VALUE);
        }

        setThroat(args) {
            this.throat = Number(args.VALUE);
        }
    }

    Scratch.extensions.register(new SamTTSExtension());

})(Scratch);
