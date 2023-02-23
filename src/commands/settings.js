const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    SlashCommandBuilder,
    ComponentType,
    StringSelectMenuBuilder,
    PermissionFlagsBits
} = require("discord.js");
const guildModel = require("../util/Models/guildModel");

function isValid(tz) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        return false;
    }

    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    } catch (ex) {
        return false;
    }
}

function dateType(tz) {
    if (!tz.includes("/")) return false;
    let text = tz.split("/");

    if (text.length === 2) return true
    else return false;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("settings")
        .setDescription("Change settings for Daily Messages and Welcomes")
        .setDMPermission(true)
        .setDescriptionLocalizations({
            de: "TBA",
            "es-ES": "TBA",
        })
        .addStringOption((option) =>
            option
                .setName("choose")
                .setDescription("Enable/disable daily Would You messages.")
                .setRequired(true)
                .addChoices(
                    { name: 'Daily Messages', value: 'dailyMsgs' },
                    { name: 'Welcomes', value: 'welcomes' },
                )
        ),

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @param {guildModel} guildDb
     */
    async execute(interaction, client, guildDb) {
        const { Settings } = require(`../languages/${guildDb.language}.json`);
        if (
            interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)
        ) {
            // <:check:1077962440815411241>
            // <:x_:1077962443013238814>
            switch (interaction.options.getString("choose")) {
                case "dailyMsgs":
                    const dailyMsgs = new EmbedBuilder()
                        .setTitle(Settings.embed.dailyTitle)
                        .setDescription(`${Settings.embed.dailyMsg}: ${guildDb.dailyMsg ? `<:check:1077962440815411241>` : `<:BadCheck:1025495596968198175>`}\n${Settings.embed.dailyChannel}: ${guildDb.dailyChannel ? `<#${guildDb.dailyChannel}>` : `<:BadCheck:1025495596968198175>`}\n${Settings.embed.dailyRole}: ${guildDb.dailyRole ? `<@&${guildDb.dailyRole}>` : `<:BadCheck:1025495596968198175>`}\n${Settings.embed.dailyTimezone}: ${guildDb.dailyTimezone}\n`)
                        .setColor("#0598F6")
                        .setFooter({ text: Settings.embed.footer, iconURL: client.user.avatarURL(), })

                    const dailyButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("dailyMsg")
                                .setLabel(Settings.button.dailyMsg)
                                .setStyle(guildDb.dailyMsg ? "Success" : "Secondary"),
                            new ButtonBuilder()
                                .setCustomId("dailyChannel")
                                .setLabel(Settings.button.dailyChannel)
                                .setStyle(guildDb.dailyChannel ? "Success" : "Secondary"),
                        ), dailyButtons2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("dailyTimezone")
                                    .setLabel(Settings.button.dailyTimezone)
                                    .setStyle("Primary")
                                    .setEmoji("🌍"),
                                new ButtonBuilder()
                                    .setCustomId("dailyRole")
                                    .setLabel(Settings.button.dailyRole)
                                    .setStyle(guildDb.dailyRole ? "Success" : "Secondary"),
                            )

                    interaction.reply({ embeds: [dailyMsgs], components: [dailyButtons, dailyButtons2], ephemeral: true }).catch(() => { })
                    break;

                case "welcomes":
                    const welcomes = new EmbedBuilder()
                        .setTitle(Settings.embed.welcomeTitle)
                        .setDescription(`${Settings.embed.welcome}: ${guildDb.welcome ? `<:check:1077962440815411241>` : `<:BadCheck:1025495596968198175>`}\n${Settings.embed.welcomePing}: ${guildDb.welcomePing ? `<:check:1077962440815411241>` : `<:BadCheck:1025495596968198175>`}\n${Settings.embed.welcomeChannel}: ${guildDb.welcomeChannel ? `<#${guildDb.welcomeChannel}>` : `<:BadCheck:1025495596968198175>`}`)
                        .setColor("#0598F6")
                        .setFooter({ text: Settings.embed.footer, iconURL: client.user.avatarURL(), })

                    const welcomeButtons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId("welcome")
                                .setLabel(Settings.button.welcome)
                                .setStyle(guildDb.welcome ? "Success" : "Secondary"),
                            new ButtonBuilder()
                                .setCustomId("welcomeChannel")
                                .setLabel(Settings.button.welcomeChannel)
                                .setStyle(guildDb.welcomeChannel ? "Success" : "Secondary"),
                        ), welcomeButtons2 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("welcomePing")
                                    .setLabel(Settings.button.welcomePing)
                                    .setStyle(guildDb.welcomePing ? "Success" : "Secondary"),
                            )

                    interaction.reply({ embeds: [welcomes], components: [welcomeButtons, welcomeButtons2], ephemeral: true });
                    break;
            }
        } else {
            const errorembed = new EmbedBuilder()
                .setColor('#F00505')
                .setTitle('Error!')
                .setDescription(Settings.embed.error);
            await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
            }).catch((err) => {
                return;
            });
        }
    },
};
