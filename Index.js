const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = "!";

client.on("ready", () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    // ---------------------------
    // 1) BACKUP COMMAND
    // ---------------------------
    if (command === "backup") {
        const location = args.join(" ");

        if (!location) {
            return message.channel.send(
                "📍 **Please provide a location!** Example: `!backup bank`"
            );
        }

        return message.channel.send(
            `🚨 **Backup Requested!**\n<@${message.author.id}> needs help at **${location}**!\n@everyone respond immediately! 🚓\n\nType \`!accept ${message.author.id}\` if you're coming for help!`
        );
    }

    // ---------------------------
    // 2) ACCEPT COMMAND
    // ---------------------------
    if (command === "accept") {
        const target = args[0];

        if (!target) {
            return message.channel.send(
                "Please mention the user whose backup you’re accepting! Example: `!accept @User`"
            );
        }

        return message.channel.send(
            `🛡️ <@${message.author.id}> accepted backup from ${target} 🚓`
        );
    }
});

client.login(process.env.TOKEN);