const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // ---------------------- BACKUP COMMAND ----------------------
    if (command === "backup") {
        const location = args.join(" ");

        if (!location) {
            return message.channel.send(
                "📍 **Please provide a location!** Example: `!backup bank`"
            );
        }

        // Delete user message
        message.delete().catch(() => {});

        return message.channel.send(
            `🚨 **Backup Requested!**
<@${message.author.id}> needs help at **${location}**!
@everyone respond immediately! 🚓

Type \`!accept ${message.author.id}\` if you're coming for help!`
        );
    }

    // ---------------------- ACCEPT COMMAND ----------------------
    if (command === "accept") {
        const user = args[0];

        if (!user) {
            return message.channel.send(
                "Please mention the user whose backup you're accepting! Example: `!accept @User`"
            );
        }

        // Delete user message
        message.delete().catch(() => {});

        return message.channel.send(
            `🛡️ <@${message.author.id}> accepted backup from ${user} 🚓`
        );
    }
});

client.login(process.env.TOKEN);