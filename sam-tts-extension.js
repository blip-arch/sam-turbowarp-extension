(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("SAM TTS must run unsandboxed.");
    }

    class SamTTSExtension {

        constructor() {
            this.sam = null;
            this.pitch = 50;
            this.speed = 72;
            this.mouth = 128;
            this.throat = 128;
        }

        getInfo() {
            return {
                id: 'samtts',
                name: 'SAM TTS',
                blocks: [
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
                                defaultValue: 72
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
                                defaultValue: 128
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
                                defaultValue: 128
                            }
                        }
                    }
                ]
            };
        }

        async loadSAM() {
            if (this.sam) return;

            await new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://unpkg.com/sam-js/dist/sam.js";
                script.onload = resolve;
                document.head.appendChild(script);
            });

            this.sam = new SamJs();
        }

        applySettings() {
            this.sam.pitch = this.pitch;
            this.sam.speed = this.speed;
            this.sam.mouth = this.mouth;
            this.sam.throat = this.throat;
        }

        async speakText(args) {
            await this.loadSAM();
            this.applySettings();
            await this.sam.speak(args.TEXT);
        }

        stopSpeech() {
            if (this.sam) {
                this.sam = new SamJs(); // reset instance
                this.applySettings();
            }
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
